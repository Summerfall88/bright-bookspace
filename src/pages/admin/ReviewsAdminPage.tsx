import { Link } from 'react-router-dom';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useReviews, useDeleteReview } from '@/hooks/useReviews';
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
    BookOpen
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ReviewsAdminPage() {
    const { reviews, loading } = useReviews({ includeUnpublished: true });
    const deleteReview = useDeleteReview();
    const { toast } = useToast();

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

    if (loading) {
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
                        {reviews.length === 0 ? (
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
                                    {reviews.map((review) => (
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
                                                <div className="flex justify-end gap-2">
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
