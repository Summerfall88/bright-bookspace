import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, type SiteSetting } from '@/lib/supabase';

/**
 * Хук для загрузки настроек сайта
 */
export function useSiteSettings(...keys: string[]) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['settings', ...keys],
        queryFn: async () => {
            let query = supabase.from('site_settings').select('*');

            if (keys.length > 0) {
                query = query.in('key', keys);
            }

            const { data, error } = await query;

            if (error) throw error;

            // Преобразуем массив в объект для удобства
            const settings: Record<string, any> = {};
            data.forEach((setting: SiteSetting) => {
                settings[setting.key] = setting.value;
            });

            return settings;
        },
        staleTime: 10 * 60 * 1000, // 10 минут
    });

    return {
        settings: data || {},
        loading: isLoading,
        error,
        refetch,
    };
}

/**
 * Хук для обновления настроек
 */
export function useUpdateSettings() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            key,
            value,
        }: {
            key: string;
            value: Record<string, any>;
        }) => {
            const { data, error } = await supabase
                .from('site_settings')
                .upsert({
                    key,
                    value,
                    updated_at: new Date().toISOString(),
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            // Инвалидируем весь кэш настроек
            queryClient.invalidateQueries({ queryKey: ['settings'] });
        },
    });
}
