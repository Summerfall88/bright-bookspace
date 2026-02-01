import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface AdminHeaderProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export function AdminHeader({ title, description, action }: AdminHeaderProps) {
    return (
        <div className="border-b bg-background">
            <div className="flex items-center justify-between px-6 py-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                    {description && (
                        <p className="text-sm text-muted-foreground mt-1">{description}</p>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {action}
                    <Button variant="outline" size="sm" asChild>
                        <Link to="/" target="_blank">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Открыть сайт
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
