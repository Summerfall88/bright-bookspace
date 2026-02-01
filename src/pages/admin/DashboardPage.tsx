import { AdminHeader } from '@/components/admin/AdminHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAllSections } from '@/hooks/useContent';
import { useReviews } from '@/hooks/useReviews';
import { BookOpen, FileText, MessageSquare, Eye } from 'lucide-react';

export function DashboardPage() {
    const { data: sections } = useAllSections();
    const { reviews } = useReviews({ includeUnpublished: true });

    const stats = [
        {
            title: 'Секции сайта',
            value: sections?.length || 0,
            icon: FileText,
            description: 'Активных секций',
        },
        {
            title: 'Рецензии',
            value: reviews.length,
            icon: BookOpen,
            description: 'Всего рецензий',
        },
        {
            title: 'Опубликовано',
            value: reviews.filter((r) => r.is_published).length,
            icon: Eye,
            description: 'Видимых рецензий',
        },
        {
            title: 'Комментарии',
            value: 0,
            icon: MessageSquare,
            description: 'Всего комментариев',
        },
    ];

    return (
        <div>
            <AdminHeader
                title="Панель управления"
                description="Обзор статистики и быстрый доступ к основным функциям"
            />

            <div className="p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={stat.title}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.title}
                                    </CardTitle>
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {stat.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Добро пожаловать в админ-панель!</CardTitle>
                            <CardDescription>
                                Здесь вы можете управлять всем контентом сайта EvilBook
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p>• Редактируйте секции сайта в разделе "Секции сайта"</p>
                                <p>• Управляйте рецензиями в разделе "Рецензии"</p>
                                <p>• Модерируйте комментарии в разделе "Комментарии"</p>
                                <p>• Настраивайте навигацию и внешний вид в соответствующих разделах</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
