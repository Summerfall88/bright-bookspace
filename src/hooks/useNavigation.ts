import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, type NavigationItem } from '@/lib/supabase';

/**
 * Хук для загрузки элементов навигации
 */
export function useNavigation(location: 'header' | 'footer' = 'header') {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['navigation', location],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('navigation_items')
                .select('*')
                .eq('location', location)
                .eq('is_visible', true)
                .order('position');

            if (error) throw error;
            return data as NavigationItem[];
        },
        staleTime: 5 * 60 * 1000, // 5 минут
    });

    return {
        items: data || [],
        loading: isLoading,
        error,
        refetch,
    };
}

/**
 * Хук для получения всех элементов навигации (для админки)
 */
export function useAllNavigation() {
    return useQuery({
        queryKey: ['navigation', 'all'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('navigation_items')
                .select('*')
                .order('location')
                .order('position');

            if (error) throw error;
            return data as NavigationItem[];
        },
    });
}

/**
 * Хук для обновления элемента навигации
 */
export function useUpdateNavigation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (item: Partial<NavigationItem> & { id: string }) => {
            const { data, error } = await supabase
                .from('navigation_items')
                .update(item)
                .eq('id', item.id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['navigation'] });
        },
    });
}

/**
 * Хук для создания элемента навигации
 */
export function useCreateNavigation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (item: Omit<NavigationItem, 'id' | 'created_at'>) => {
            const { data, error } = await supabase
                .from('navigation_items')
                .insert(item)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['navigation'] });
        },
    });
}

/**
 * Хук для удаления элемента навигации
 */
export function useDeleteNavigation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('navigation_items')
                .delete()
                .eq('id', id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['navigation'] });
        },
    });
}
