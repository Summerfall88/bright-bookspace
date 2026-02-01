import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Save, Loader2 } from 'lucide-react';

interface ReviewsPageContent {
    badge: string;
    heading: string;
    description: string;
    search_placeholder: string;
    empty_message: string;
}

interface ReviewsPageEditorProps {
    content: ReviewsPageContent;
    isVisible: boolean;
    onSave: (content: ReviewsPageContent, isVisible: boolean) => Promise<void>;
    saving: boolean;
}

export function ReviewsPageEditor({ content, isVisible, onSave, saving }: ReviewsPageEditorProps) {
    const [formData, setFormData] = useState<ReviewsPageContent>(content);
    const [visible, setVisible] = useState(isVisible);

    useEffect(() => {
        setFormData(content);
        setVisible(isVisible);
    }, [content, isVisible]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave(formData, visible);
    };

    const updateField = (field: keyof ReviewsPageContent, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Настройки страницы рецензий</CardTitle>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="visible">Показывать секцию</Label>
                            <Switch id="visible" checked={visible} onCheckedChange={setVisible} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="badge">Бейдж</Label>
                        <Input
                            id="badge"
                            value={formData.badge}
                            onChange={(e) => updateField('badge', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="heading">Заголовок</Label>
                        <Input
                            id="heading"
                            value={formData.heading}
                            onChange={(e) => updateField('heading', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Описание</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => updateField('description', e.target.value)}
                            rows={2}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="search_placeholder">Placeholder поиска</Label>
                        <Input
                            id="search_placeholder"
                            value={formData.search_placeholder}
                            onChange={(e) => updateField('search_placeholder', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="empty_message">Сообщение при пустом результате</Label>
                        <Input
                            id="empty_message"
                            value={formData.empty_message}
                            onChange={(e) => updateField('empty_message', e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                            Используйте {'{query}'} для вставки поискового запроса
                        </p>
                    </div>

                    <Button type="submit" disabled={saving} className="w-full">
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Сохранение...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Сохранить изменения
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </form>
    );
}
