import { useEffect, useState } from 'react';
import { supabase, type AppRole } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

/**
 * Хук для проверки роли администратора
 */
export function useAdminAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Проверяем текущую сессию
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                checkAdminRole(session.user.id);
            } else {
                setLoading(false);
            }
        });

        // Подписываемся на изменения авторизации
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                checkAdminRole(session.user.id);
            } else {
                setIsAdmin(false);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const checkAdminRole = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', userId)
                .eq('role', 'admin')
                .single();

            setIsAdmin(!error && !!data);
        } catch (error) {
            setIsAdmin(false);
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return data;
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    return {
        user,
        isAdmin,
        loading,
        signIn,
        signOut,
    };
}

/**
 * Хук для проверки конкретной роли
 */
export function useUserRole(role: AppRole) {
    const [hasRole, setHasRole] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkRole = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                setHasRole(false);
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', user.id)
                .eq('role', role)
                .single();

            setHasRole(!error && !!data);
            setLoading(false);
        };

        checkRole();
    }, [role]);

    return { hasRole, loading };
}
