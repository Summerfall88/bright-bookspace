import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Save, Loader2 } from 'lucide-react';

interface SubscribeContent {
    heading: string;
    description: string;
    button_text: string;
    success_message: string;
    footer_text: string;
}

interface SubscribeEditorProps {
    content: SubscribeContent;
    isVisible: boolean;
    onSave: (content: SubscribeContent, isVisible: boolean) => Promise<void>;
    saving: boolean;
}

export function SubscribeEditor({ content, isVisible, onSave, saving }: SubscribeEditorProps) {
    const [formData, setFormData] = useState<SubscribeContent>(content);
    const [visible, setVisible] = useState(isVisible);

    useEffect(() => {
        setFormData(content);
        setVisible(isVisible);
    }, [content, isVisible]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave(formData, visible);
    };

    const updateField = (field: keyof SubscribeContent, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Настройки секции подписки</CardTitle>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="visible">Показывать секцию</Label>
                            <Switch id="visible" checked={visible} onCheckedChange={setVisible} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
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
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="button_text">Текст кнопки</Label>
                        <Input
                            id="button_text"
                            value={formData.button_text}
                            onChange={(e) => updateField('button_text', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="success_message">Сообщение об успехе</Label>
                        <Input
                            id="success_message"
                            value={formData.success_message}
                            onChange={(e) => updateField('success_message', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="footer_text">Текст в подвале</Label>
                        <Input
                            id="footer_text"
                            value={formData.footer_text}
                            onChange={(e) => updateField('footer_text', e.target.value)}
                        />
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
