import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, type SiteSection } from '@/lib/supabase';

/**
 * Хук для загрузки контента секции сайта
 */
export function useContent<T = Record<string, any>>(sectionId: string) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['section', sectionId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('site_sections')
                .select('*')
                .eq('id', sectionId)
                .single();

            if (error) throw error;
            return data as SiteSection;
        },
        staleTime: 5 * 60 * 1000, // 5 минут
    });

    return {
        content: data?.content as T,
        isVisible: data?.is_visible ?? true,
        loading: isLoading,
        error,
        refetch,
        section: data,
    };
}

/**
 * Хук для обновления контента секции
 */
export function useUpdateContent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            sectionId,
            content,
            isVisible,
        }: {
            sectionId: string;
            content: Record<string, any>;
            isVisible?: boolean;
        }) => {
            const updateData: Partial<SiteSection> = {
                content,
                updated_at: new Date().toISOString(),
            };

            if (isVisible !== undefined) {
                updateData.is_visible = isVisible;
            }

            const { data, error } = await supabase
                .from('site_sections')
                .update(updateData)
                .eq('id', sectionId)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: (_, variables) => {
            // Инвалидируем кэш для обновленной секции
            queryClient.invalidateQueries({ queryKey: ['section', variables.sectionId] });
        },
    });
}

/**
 * Хук для получения всех секций (для админки)
 */
export function useAllSections() {
    return useQuery({
        queryKey: ['sections', 'all'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('site_sections')
                .select('*')
                .order('id');

            if (error) throw error;
            return data as SiteSection[];
        },
    });
}
