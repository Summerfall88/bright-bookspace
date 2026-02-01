import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, type Review } from '@/lib/supabase';

/**
 * Хук для загрузки всех опубликованных рецензий
 */
export function useReviews(options?: { includeUnpublished?: boolean }) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['reviews', options?.includeUnpublished ? 'all' : 'published'],
        queryFn: async () => {
            let query = supabase
                .from('reviews')
                .select('*')
                .order('position')
                .order('created_at', { ascending: false });

            if (!options?.includeUnpublished) {
                query = query.eq('is_published', true);
            }

            const { data, error } = await query;

            if (error) throw error;
            return data as Review[];
        },
        staleTime: 2 * 60 * 1000, // 2 минуты
    });

    return {
        reviews: data || [],
        loading: isLoading,
        error,
        refetch,
    };
}

/**
 * Хук для загрузки одной рецензии по ID
 */
export function useReview(id: string) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['review', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return data as Review;
        },
        enabled: !!id,
    });

    return {
        review: data,
        loading: isLoading,
        error,
        refetch,
    };
}

/**
 * Хук для создания рецензии
 */
export function useCreateReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (review: Omit<Review, 'created_at' | 'updated_at'>) => {
            const { data, error } = await supabase
                .from('reviews')
                .insert(review)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
        },
    });
}

/**
 * Хук для обновления рецензии
 */
export function useUpdateReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            ...updates
        }: Partial<Review> & { id: string }) => {
            const { data, error } = await supabase
                .from('reviews')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
            queryClient.invalidateQueries({ queryKey: ['review', data.id] });
        },
    });
}

/**
 * Хук для удаления рецензии
 */
export function useDeleteReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('reviews')
                .delete()
                .eq('id', id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
        },
    });
}
