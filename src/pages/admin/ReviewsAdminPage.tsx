import { Link } from 'react-router-dom';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useReviews, useDeleteReview, useUpdateReviewsOrder } from '@/hooks/useReviews';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Plus,
    Edit,
    Trash2,
    Star,
    Eye,
    EyeOff,
    Loader2,
    BookOpen,
    ArrowUp,
    ArrowDown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

export function ReviewsAdminPage() {
    const { reviews: fetchedReviews, loading } = useReviews({ includeUnpublished: true });
    const deleteReview = useDeleteReview();
    const updateOrder = useUpdateReviewsOrder();
    const { toast } = useToast();
    const [localReviews, setLocalReviews] = useState(fetchedReviews);

    useEffect(() => {
        setLocalReviews(fetchedReviews);
    }, [fetchedReviews]);

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Вы уверены, что хотите удалить рецензию на книгу "${title}"?`)) {
            return;
        }

        try {
            await deleteReview.mutateAsync(id);
            toast({
                title: 'Удалено',
                description: `Рецензия "${title}" успешно удалена`,
            });
        } catch (error) {
            toast({
                title: 'Ошибка',
                description: 'Не удалось удалить рецензию',
                variant: 'destructive',
            });
        }
    };

    const handleMove = async (index: number, direction: 'up' | 'down') => {
        const newReviews = [...localReviews];
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        if (newIndex < 0 || newIndex >= newReviews.length) return;

        // Меняем местами
        const temp = newReviews[index];
        newReviews[index] = newReviews[newIndex];
        newReviews[newIndex] = temp;

        // Обновляем локальное состояние для мгновенного отклика
        setLocalReviews(newReviews);

        // Готовим данные для обновления в БД (новые позиции)
        const orderUpdates = newReviews.map((review, i) => ({
            id: review.id,
            position: i
        }));

        try {
            await updateOrder.mutateAsync(orderUpdates);
        } catch (error) {
            toast({
                title: 'Ошибка',
                description: 'Не удалось сохранить порядок',
                variant: 'destructive',
            });
            // Возвращаем как было при ошибке
            setLocalReviews(fetchedReviews);
        }
    };

    if (loading && localReviews.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div>
            <AdminHeader
                title="Управление рецензиями"
                description="Здесь вы можете добавлять, редактировать и удалять обзоры на книги"
                action={
                    <Button asChild>
                        <Link to="/admin/reviews/new">
                            <Plus className="w-4 h-4 mr-2" />
                            Новая рецензия
                        </Link>
                    </Button>
                }
            />

            <div className="p-6">
                <Card>
                    <CardContent className="p-0">
                        {localReviews.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                                <BookOpen className="w-12 h-12 mb-4 opacity-20" />
                                <p>Рецензий пока нет. Создайте первую!</p>
                                <Button asChild variant="outline" className="mt-4">
                                    <Link to="/admin/reviews/new">Написать обзор</Link>
                                </Button>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Обложка</TableHead>
                                        <TableHead>Название и автор</TableHead>
                                        <TableHead>Жанр</TableHead>
                                        <TableHead>Оценка</TableHead>
                                        <TableHead>Статус</TableHead>
                                        <TableHead className="text-right">Действия</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {localReviews.map((review, index) => (
                                        <TableRow key={review.id}>
                                            <TableCell>
                                                {review.cover_image_url ? (
                                                    <img
                                                        src={review.cover_image_url}
                                                        className="w-12 h-16 object-cover rounded shadow-sm"
                                                        alt={review.title}
                                                    />
                                                ) : (
                                                    <div className={`w-12 h-16 rounded ${review.cover_color} shadow-sm`} />
                                                )}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <div>{review.title}</div>
                                                <div className="text-sm text-muted-foreground font-normal">
                                                    {review.author}
                                                </div>
                                            </TableCell>
                                            <TableCell>{review.genre}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                                                    {review.rating}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {review.is_published ? (
                                                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
                                                        <Eye className="w-3 h-3 mr-1" /> Опубликовано
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary">
                                                        <EyeOff className="w-3 h-3 mr-1" /> Черновик
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    <div className="flex flex-col mr-2">
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="h-6 w-6"
                                                            disabled={index === 0 || updateOrder.isPending}
                                                            onClick={() => handleMove(index, 'up')}
                                                        >
                                                            <ArrowUp className="w-3 h-3" />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="h-6 w-6"
                                                            disabled={index === localReviews.length - 1 || updateOrder.isPending}
                                                            onClick={() => handleMove(index, 'down')}
                                                        >
                                                            <ArrowDown className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                    <Button size="icon" variant="ghost" asChild>
                                                        <Link to={`/admin/reviews/${review.id}`}>
                                                            <Edit className="w-4 h-4 text-muted-foreground" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() => handleDelete(review.id, review.title)}
                                                    >
                                                        <Trash2 className="w-4 h-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
