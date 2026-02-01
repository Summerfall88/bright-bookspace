import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ImageUploader } from '@/components/admin/editors/ImageUploader';
import { Save, Loader2 } from 'lucide-react';

interface HeroContent {
    badge: string;
    heading: string;
    description: string;
    cta_text: string;
    cta_link: string;
    background_image?: string | null;
}

interface HeroEditorProps {
    content: HeroContent;
    isVisible: boolean;
    onSave: (content: HeroContent, isVisible: boolean) => Promise<void>;
    saving: boolean;
}

export function HeroEditor({ content, isVisible, onSave, saving }: HeroEditorProps) {
    const [formData, setFormData] = useState<HeroContent>(content);
    const [visible, setVisible] = useState(isVisible);

    useEffect(() => {
        setFormData(content);
        setVisible(isVisible);
    }, [content, isVisible]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave(formData, visible);
    };

    const updateField = (field: keyof HeroContent, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Настройки Hero секции</CardTitle>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="visible">Показывать секцию</Label>
                            <Switch
                                id="visible"
                                checked={visible}
                                onCheckedChange={setVisible}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="badge">Бейдж (подзаголовок)</Label>
                        <Input
                            id="badge"
                            value={formData.badge}
                            onChange={(e) => updateField('badge', e.target.value)}
                            placeholder="Книжный блог"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="heading">Заголовок</Label>
                        <Input
                            id="heading"
                            value={formData.heading}
                            onChange={(e) => updateField('heading', e.target.value)}
                            placeholder="Christina Evilbook"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Описание</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => updateField('description', e.target.value)}
                            placeholder="Путешествия по страницам книг..."
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="cta_text">Текст кнопки</Label>
                            <Input
                                id="cta_text"
                                value={formData.cta_text}
                                onChange={(e) => updateField('cta_text', e.target.value)}
                                placeholder="Читать рецензии"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cta_link">Ссылка кнопки</Label>
                            <Input
                                id="cta_link"
                                value={formData.cta_link}
                                onChange={(e) => updateField('cta_link', e.target.value)}
                                placeholder="/reviews"
                            />
                        </div>
                    </div>

                    <ImageUploader
                        label="Фоновое изображение"
                        value={formData.background_image || undefined}
                        onChange={(url) => updateField('background_image', url)}
                        path="hero"
                    />

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
