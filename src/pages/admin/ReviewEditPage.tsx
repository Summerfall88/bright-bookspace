import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useReview, useUpdateReview, useCreateReview } from '@/hooks/useReviews';
import { ImageUploader } from '@/components/admin/editors/ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Save, Loader2, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Review } from '@/lib/supabase';

export function ReviewEditPage() {
    const { id } = useParams<{ id: string }>();
    const isNew = id === 'new';
    const navigate = useNavigate();
    const { toast } = useToast();

    const { review, loading } = useReview(!isNew ? id || '' : '');
    const updateReview = useUpdateReview();
    const createReview = useCreateReview();

    const [formData, setFormData] = useState<Partial<Review>>({
        title: '',
        author: '',
        rating: 5,
        genre: '',
        excerpt: '',
        cover_color: 'bg-gradient-to-br from-primary/20 to-primary/10',
        cover_image_url: null,
        full_review: '',
        published_date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
        is_published: true,
        position: 0,
    });

    useEffect(() => {
        if (review && !isNew) {
            setFormData(review);
        }
    }, [review, isNew]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isNew) {
                // Генерируем ID из заголовка если это новая запись
                const slug = formData.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || Date.now().toString();
                await createReview.mutateAsync({
                    ...formData as Review,
                    id: slug,
                });
                toast({ title: 'Успешно', description: 'Рецензия создана' });
            } else {
                await updateReview.mutateAsync({
                    ...formData,
                    id: id!,
                });
                toast({ title: 'Успешно', description: 'Рецензия обновлена' });
            }
            navigate('/admin/reviews');
        } catch (error) {
            toast({
                title: 'Ошибка',
                description: 'Не удалось сохранить изменения',
                variant: 'destructive',
            });
        }
    };

    const updateField = (field: keyof Review, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    if (loading && !isNew) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div>
            <AdminHeader
                title={isNew ? 'Новая рецензия' : `Редактирование: ${formData.title}`}
                action={
                    <Button variant="outline" onClick={() => navigate('/admin/reviews')}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Назад
                    </Button>
                }
            />

            <form onSubmit={handleSubmit} className="p-6 grid gap-6 grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Основная информация</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Название книги</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => updateField('title', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="author">Автор</Label>
                                    <Input
                                        id="author"
                                        value={formData.author}
                                        onChange={(e) => updateField('author', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="genre">Жанр</Label>
                                    <Input
                                        id="genre"
                                        value={formData.genre}
                                        onChange={(e) => updateField('genre', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="date">Дата публикации (строкой)</Label>
                                    <Input
                                        id="date"
                                        value={formData.published_date}
                                        onChange={(e) => updateField('published_date', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Краткое описание (для карточки)</Label>
                                <Textarea
                                    id="excerpt"
                                    value={formData.excerpt}
                                    onChange={(e) => updateField('excerpt', e.target.value)}
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="full">Текст рецензии (Markdown)</Label>
                                <Textarea
                                    id="full"
                                    value={formData.full_review}
                                    onChange={(e) => updateField('full_review', e.target.value)}
                                    className="min-h-[300px] font-mono"
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Параметры карточки</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label>Оценка: {formData.rating}</Label>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star
                                                key={s}
                                                className={`w-4 h-4 ${s <= (formData.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <Slider
                                    value={[formData.rating || 5]}
                                    min={1}
                                    max={5}
                                    step={1}
                                    onValueChange={(val) => updateField('rating', val[0])}
                                />
                            </div>

                            <ImageUploader
                                label="Обложка книги"
                                value={formData.cover_image_url || undefined}
                                onChange={(url) => updateField('cover_image_url', url)}
                                path="covers"
                            />

                            <div className="space-y-2">
                                <Label htmlFor="color">Fallback цвет (Tailwind класс)</Label>
                                <Input
                                    id="color"
                                    value={formData.cover_color}
                                    onChange={(e) => updateField('cover_color', e.target.value)}
                                    placeholder="bg-gradient-to-br from-indigo-500 to-purple-500"
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="space-y-0.5">
                                    <Label>Опубликовать</Label>
                                    <p className="text-xs text-muted-foreground">Доступно на сайте</p>
                                </div>
                                <Switch
                                    checked={formData.is_published}
                                    onCheckedChange={(val) => updateField('is_published', val)}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={updateReview.isPending || createReview.isPending}>
                                {updateReview.isPending || createReview.isPending ? (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4 mr-2" />
                                )}
                                Сохранить рецензию
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    );
}
