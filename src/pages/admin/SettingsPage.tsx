import { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useSiteSettings, useUpdateSettings } from '@/hooks/useSiteSettings';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Instagram, Send, Youtube, Globe } from 'lucide-react';

export function SettingsPage() {
    const { settings, loading } = useSiteSettings('branding', 'social_links');
    const updateSettings = useUpdateSettings();
    const { toast } = useToast();

    const [branding, setBranding] = useState({
        site_name: '',
        logo_text: '',
        copyright: '',
        logo_icon_url: '',
    });

    const [socialLinks, setSocialLinks] = useState({
        instagram: '',
        instagram_icon_url: '',
        telegram: '',
        telegram_icon_url: '',
        youtube: '',
        youtube_icon_url: '',
        tiktok: '',
        tiktok_icon_url: '',
        vk: '',
        vk_icon_url: '',
    });

    useEffect(() => {
        if (settings.branding) {
            setBranding({
                site_name: '',
                logo_text: '',
                copyright: '',
                logo_icon_url: '',
                ...settings.branding
            });
        }
        if (settings.social_links) {
            setSocialLinks({
                instagram: '',
                instagram_icon_url: '',
                telegram: '',
                telegram_icon_url: '',
                youtube: '',
                youtube_icon_url: '',
                tiktok: '',
                tiktok_icon_url: '',
                vk: '',
                vk_icon_url: '',
                ...settings.social_links
            });
        }
    }, [settings]);

    const handleSaveBranding = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateSettings.mutateAsync({
                key: 'branding',
                value: branding,
            });
            toast({ title: 'Сохранено', description: 'Настройки брендинга обновлены' });
        } catch (error) {
            toast({
                title: 'Ошибка',
                description: 'Не удалось сохранить настройки',
                variant: 'destructive'
            });
        }
    };

    const handleSaveSocial = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateSettings.mutateAsync({
                key: 'social_links',
                value: socialLinks,
            });
            toast({ title: 'Сохранено', description: 'Ссылки на соцсети обновлены' });
        } catch (error) {
            toast({
                title: 'Ошибка',
                description: 'Не удалось сохранить настройки',
                variant: 'destructive'
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

    return (
        <div>
            <AdminHeader
                title="Настройки сайта"
                description="Управление общими настройками, брендингом и социальными сетями"
            />

            <div className="p-6 space-y-6">
                {/* Branding Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Брендинг</CardTitle>
                        <CardDescription>Основные визуальные настройки сайта</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSaveBranding} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="site_name">Название сайта</Label>
                                    <Input
                                        id="site_name"
                                        value={branding.site_name}
                                        onChange={(e) => setBranding({ ...branding, site_name: e.target.value })}
                                        placeholder="EvilBook"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="logo_text">Текст в логотипе</Label>
                                    <Input
                                        id="logo_text"
                                        value={branding.logo_text}
                                        onChange={(e) => setBranding({ ...branding, logo_text: e.target.value })}
                                        placeholder="EvilBook"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="logo_icon_url">URL Иконки логотипа</Label>
                                    <Input
                                        id="logo_icon_url"
                                        value={branding.logo_icon_url}
                                        onChange={(e) => setBranding({ ...branding, logo_icon_url: e.target.value })}
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="copyright">Текст копирайта (в подвале)</Label>
                                <Input
                                    id="copyright"
                                    value={branding.copyright}
                                    onChange={(e) => setBranding({ ...branding, copyright: e.target.value })}
                                    placeholder="© 2024 Evilbook. Все права защищены."
                                />
                            </div>
                            <Button type="submit" disabled={updateSettings.isPending}>
                                {updateSettings.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                Сохранить брендинг
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Social Links */}
                <Card>
                    <CardHeader>
                        <CardTitle>Социальные сети</CardTitle>
                        <CardDescription>Ссылки на ваши профили в социальных сетях</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSaveSocial} className="space-y-4">
                            <div className="space-y-4">
                                <div className="space-y-2 border-b pb-4 last:border-0 last:pb-0">
                                    <Label htmlFor="instagram" className="flex items-center gap-2 mb-2">
                                        <Instagram className="w-4 h-4 text-pink-500" /> Instagram
                                    </Label>
                                    <div className="grid gap-2">
                                        <Input
                                            id="instagram"
                                            value={socialLinks.instagram}
                                            onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                                            placeholder="Ссылка на профиль"
                                        />
                                        <Input
                                            value={socialLinks.instagram_icon_url || ''}
                                            onChange={(e) => setSocialLinks({ ...socialLinks, instagram_icon_url: e.target.value })}
                                            placeholder="URL своей иконки (необязательно)"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 border-b pb-4 last:border-0 last:pb-0">
                                    <Label htmlFor="telegram" className="flex items-center gap-2 mb-2">
                                        <Send className="w-4 h-4 text-blue-400" /> Telegram
                                    </Label>
                                    <div className="grid gap-2">
                                        <Input
                                            id="telegram"
                                            value={socialLinks.telegram}
                                            onChange={(e) => setSocialLinks({ ...socialLinks, telegram: e.target.value })}
                                            placeholder="Ссылка на профиль"
                                        />
                                        <Input
                                            value={socialLinks.telegram_icon_url || ''}
                                            onChange={(e) => setSocialLinks({ ...socialLinks, telegram_icon_url: e.target.value })}
                                            placeholder="URL своей иконки (необязательно)"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 border-b pb-4 last:border-0 last:pb-0">
                                    <Label htmlFor="youtube" className="flex items-center gap-2 mb-2">
                                        <Youtube className="w-4 h-4 text-red-500" /> YouTube
                                    </Label>
                                    <div className="grid gap-2">
                                        <Input
                                            id="youtube"
                                            value={socialLinks.youtube}
                                            onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                                            placeholder="Ссылка на профиль"
                                        />
                                        <Input
                                            value={socialLinks.youtube_icon_url || ''}
                                            onChange={(e) => setSocialLinks({ ...socialLinks, youtube_icon_url: e.target.value })}
                                            placeholder="URL своей иконки (необязательно)"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 border-b pb-4 last:border-0 last:pb-0">
                                    <Label htmlFor="tiktok" className="flex items-center gap-2 mb-2">
                                        <Globe className="w-4 h-4 text-foreground" /> TikTok
                                    </Label>
                                    <div className="grid gap-2">
                                        <Input
                                            id="tiktok"
                                            value={socialLinks.tiktok}
                                            onChange={(e) => setSocialLinks({ ...socialLinks, tiktok: e.target.value })}
                                            placeholder="Ссылка на профиль"
                                        />
                                        <Input
                                            value={socialLinks.tiktok_icon_url || ''}
                                            onChange={(e) => setSocialLinks({ ...socialLinks, tiktok_icon_url: e.target.value })}
                                            placeholder="URL своей иконки (необязательно)"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 border-b pb-4 last:border-0 last:pb-0">
                                    <Label htmlFor="vk" className="flex items-center gap-2 mb-2">
                                        <Globe className="w-4 h-4 text-blue-600" /> ВКонтакте (VK)
                                    </Label>
                                    <div className="grid gap-2">
                                        <Input
                                            id="vk"
                                            value={socialLinks.vk}
                                            onChange={(e) => setSocialLinks({ ...socialLinks, vk: e.target.value })}
                                            placeholder="Ссылка на профиль"
                                        />
                                        <Input
                                            value={socialLinks.vk_icon_url || ''}
                                            onChange={(e) => setSocialLinks({ ...socialLinks, vk_icon_url: e.target.value })}
                                            placeholder="URL своей иконки (необязательно)"
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button type="submit" disabled={updateSettings.isPending} className="mt-4">
                                {updateSettings.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                Сохранить ссылки
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
