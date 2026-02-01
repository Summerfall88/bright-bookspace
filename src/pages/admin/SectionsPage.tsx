import { Link } from 'react-router-dom';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useAllSections } from '@/hooks/useContent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Eye, EyeOff, Loader2 } from 'lucide-react';

export function SectionsPage() {
    const { data: sections, isLoading } = useAllSections();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div>
            <AdminHeader
                title="Секции сайта"
                description="Управление контентом всех секций главной страницы"
            />

            <div className="p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sections?.map((section) => (
                        <Card key={section.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{section.name}</CardTitle>
                                        <CardDescription className="mt-1">
                                            ID: {section.id}
                                        </CardDescription>
                                    </div>
                                    <Badge variant={section.is_visible ? 'default' : 'secondary'}>
                                        {section.is_visible ? (
                                            <>
                                                <Eye className="w-3 h-3 mr-1" />
                                                Видна
                                            </>
                                        ) : (
                                            <>
                                                <EyeOff className="w-3 h-3 mr-1" />
                                                Скрыта
                                            </>
                                        )}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground mb-4">
                                    Обновлено:{' '}
                                    {new Date(section.updated_at).toLocaleString('ru-RU')}
                                </div>
                                <Button asChild className="w-full">
                                    <Link to={`/admin/sections/${section.id}`}>
                                        <Edit className="w-4 h-4 mr-2" />
                                        Редактировать
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
