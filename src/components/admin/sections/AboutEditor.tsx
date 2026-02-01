import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ImageUploader } from '@/components/admin/editors/ImageUploader';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';

interface Stat {
    icon: string;
    value: string;
    label: string;
}

interface AboutContent {
    badge: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    photo_url?: string | null;
    stats: Stat[];
}

interface AboutEditorProps {
    content: AboutContent;
    isVisible: boolean;
    onSave: (content: AboutContent, isVisible: boolean) => Promise<void>;
    saving: boolean;
}

export function AboutEditor({ content, isVisible, onSave, saving }: AboutEditorProps) {
    const [formData, setFormData] = useState<AboutContent>(content);
    const [visible, setVisible] = useState(isVisible);

    useEffect(() => {
        setFormData(content);
        setVisible(isVisible);
    }, [content, isVisible]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave(formData, visible);
    };

    const updateField = (field: keyof AboutContent, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const updateStat = (index: number, field: keyof Stat, value: string) => {
        const newStats = [...formData.stats];
        newStats[index] = { ...newStats[index], [field]: value };
        updateField('stats', newStats);
    };

    const addStat = () => {
        updateField('stats', [
            ...formData.stats,
            { icon: 'Star', value: '0', label: 'Новая статистика' },
        ]);
    };

    const removeStat = (index: number) => {
        updateField('stats', formData.stats.filter((_, i) => i !== index));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Настройки секции "Обо мне"</CardTitle>
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
                        <Label htmlFor="badge">Бейдж</Label>
                        <Input
                            id="badge"
                            value={formData.badge}
                            onChange={(e) => updateField('badge', e.target.value)}
                            placeholder="Обо мне"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="heading">Заголовок</Label>
                        <Input
                            id="heading"
                            value={formData.heading}
                            onChange={(e) => updateField('heading', e.target.value)}
                            placeholder="Привет, я Кристина..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="paragraph1">Первый параграф</Label>
                        <Textarea
                            id="paragraph1"
                            value={formData.paragraph1}
                            onChange={(e) => updateField('paragraph1', e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="paragraph2">Второй параграф</Label>
                        <Textarea
                            id="paragraph2"
                            value={formData.paragraph2}
                            onChange={(e) => updateField('paragraph2', e.target.value)}
                            rows={3}
                        />
                    </div>

                    <ImageUploader
                        label="Фотография"
                        value={formData.photo_url || undefined}
                        onChange={(url) => updateField('photo_url', url)}
                        path="about"
                    />

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Статистика</Label>
                            <Button type="button" size="sm" onClick={addStat}>
                                <Plus className="w-4 h-4 mr-2" />
                                Добавить
                            </Button>
                        </div>

                        {formData.stats.map((stat, index) => (
                            <Card key={index}>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label>Иконка (Lucide)</Label>
                                            <Input
                                                value={stat.icon}
                                                onChange={(e) => updateStat(index, 'icon', e.target.value)}
                                                placeholder="BookMarked"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Значение</Label>
                                            <Input
                                                value={stat.value}
                                                onChange={(e) => updateStat(index, 'value', e.target.value)}
                                                placeholder="150+"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Подпись</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    value={stat.label}
                                                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                                                    placeholder="Прочитанных книг"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => removeStat(index)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
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
