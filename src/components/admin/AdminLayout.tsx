import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';

export function AdminLayout() {
    return (
        <div className="flex h-screen overflow-hidden">
            <aside className="w-64 flex-shrink-0">
                <AdminSidebar />
            </aside>
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
