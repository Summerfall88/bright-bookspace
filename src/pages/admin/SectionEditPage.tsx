import { useParams, useNavigate } from 'react-router-dom';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useContent, useUpdateContent } from '@/hooks/useContent';
import { HeroEditor } from '@/components/admin/sections/HeroEditor';
import { AboutEditor } from '@/components/admin/sections/AboutEditor';
import { SubscribeEditor } from '@/components/admin/sections/SubscribeEditor';
import { ReviewsSectionEditor } from '@/components/admin/sections/ReviewsSectionEditor';
import { ReviewsPageEditor } from '@/components/admin/sections/ReviewsPageEditor';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const editorComponents: Record<string, React.ComponentType<any>> = {
    hero: HeroEditor,
    about: AboutEditor,
    subscribe: SubscribeEditor,
    reviews_section: ReviewsSectionEditor,
    reviews_page: ReviewsPageEditor,
};

export function SectionEditPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { section, loading } = useContent(id || '');
    const updateContent = useUpdateContent();

    const EditorComponent = id ? editorComponents[id] : null;

    const handleSave = async (content: Record<string, any>, isVisible?: boolean) => {
        if (!id) return;

        try {
            await updateContent.mutateAsync({
                sectionId: id,
                content,
                isVisible,
            });

            toast({
                title: 'Успешно сохранено',
                description: 'Изменения секции были сохранены',
            });
        } catch (error) {
            toast({
                title: 'Ошибка сохранения',
                description: error instanceof Error ? error.message : 'Не удалось сохранить изменения',
                variant: 'destructive',
            });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!section || !EditorComponent) {
        return (
            <div className="p-6">
                <p className="text-center text-muted-foreground">
                    Секция не найдена или редактор не реализован
                </p>
            </div>
        );
    }

    return (
        <div>
            <AdminHeader
                title={section.name}
                description={`Редактирование секции: ${id}`}
                action={
                    <Button variant="outline" onClick={() => navigate('/admin/sections')}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Назад
                    </Button>
                }
            />

            <div className="p-6">
                <EditorComponent
                    content={section.content}
                    isVisible={section.is_visible}
                    onSave={handleSave}
                    saving={updateContent.isPending}
                />
            </div>
        </div>
    );
}
