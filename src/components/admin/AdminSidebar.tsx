import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    FileText,
    BookOpen,
    MessageSquare,
    Navigation,
    Image,
    Settings,
    LogOut,
} from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const menuItems = [
    {
        title: 'Главная',
        href: '/admin',
        icon: LayoutDashboard,
    },
    {
        title: 'Секции сайта',
        href: '/admin/sections',
        icon: FileText,
    },
    {
        title: 'Рецензии',
        href: '/admin/reviews',
        icon: BookOpen,
    },
    {
        title: 'Комментарии',
        href: '/admin/comments',
        icon: MessageSquare,
    },
    {
        title: 'Навигация',
        href: '/admin/navigation',
        icon: Navigation,
    },
    {
        title: 'Медиа',
        href: '/admin/media',
        icon: Image,
    },
    {
        title: 'Настройки',
        href: '/admin/settings',
        icon: Settings,
    },
];

export function AdminSidebar() {
    const location = useLocation();
    const { signOut, user } = useAdminAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <div className="flex flex-col h-full border-r bg-muted/40">
            <div className="p-6 border-b">
                <Link to="/admin" className="flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    <span className="font-bold text-lg">EvilBook Admin</span>
                </Link>
            </div>

            <ScrollArea className="flex-1 px-3 py-4">
                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>
            </ScrollArea>

            <div className="p-4 border-t">
                <div className="flex items-center gap-3 mb-3 px-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">
                            {user?.email?.[0].toUpperCase()}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user?.email}</p>
                        <p className="text-xs text-muted-foreground">Администратор</p>
                    </div>
                </div>
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleSignOut}
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Выйти
                </Button>
            </div>
        </div>
    );
}
