import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Save, Loader2 } from 'lucide-react';

interface ReviewsSectionContent {
    badge: string;
    heading: string;
    description: string;
    cards_count: number;
}

interface ReviewsSectionEditorProps {
    content: ReviewsSectionContent;
    isVisible: boolean;
    onSave: (content: ReviewsSectionContent, isVisible: boolean) => Promise<void>;
    saving: boolean;
}

export function ReviewsSectionEditor({ content, isVisible, onSave, saving }: ReviewsSectionEditorProps) {
    const [formData, setFormData] = useState<ReviewsSectionContent>(content);
    const [visible, setVisible] = useState(isVisible);

    useEffect(() => {
        setFormData(content);
        setVisible(isVisible);
    }, [content, isVisible]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave(formData, visible);
    };

    const updateField = (field: keyof ReviewsSectionContent, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Настройки секции рецензий на главной</CardTitle>
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
                        <Label htmlFor="cards_count">Количество карточек</Label>
                        <Input
                            id="cards_count"
                            type="number"
                            min="1"
                            max="12"
                            value={formData.cards_count}
                            onChange={(e) => updateField('cards_count', parseInt(e.target.value) || 6)}
                        />
                        <p className="text-sm text-muted-foreground">
                            Сколько рецензий показывать на главной странице
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
