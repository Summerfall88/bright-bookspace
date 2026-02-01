import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface UploadProgress {
    progress: number;
    uploading: boolean;
    error: string | null;
}

/**
 * Хук для загрузки изображений в Supabase Storage
 */
export function useImageUpload() {
    const [uploadState, setUploadState] = useState<UploadProgress>({
        progress: 0,
        uploading: false,
        error: null,
    });

    const uploadImage = async (
        file: File,
        path: string,
        bucket: string = 'media'
    ): Promise<string | null> => {
        try {
            setUploadState({ progress: 0, uploading: true, error: null });

            // Генерируем уникальное имя файла
            const fileExt = file.name.split('.').pop();
            const fileName = `${path}/${Date.now()}.${fileExt}`;

            // Загружаем файл
            const { data, error } = await supabase.storage
                .from(bucket)
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (error) throw error;

            // Получаем публичный URL
            const { data: urlData } = supabase.storage
                .from(bucket)
                .getPublicUrl(data.path);

            setUploadState({ progress: 100, uploading: false, error: null });
            return urlData.publicUrl;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Upload failed';
            setUploadState({ progress: 0, uploading: false, error: errorMessage });
            return null;
        }
    };

    const deleteImage = async (
        url: string,
        bucket: string = 'media'
    ): Promise<boolean> => {
        try {
            // Извлекаем путь из URL
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/');
            const filePath = pathParts.slice(pathParts.indexOf(bucket) + 1).join('/');

            const { error } = await supabase.storage
                .from(bucket)
                .remove([filePath]);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Failed to delete image:', error);
            return false;
        }
    };

    return {
        uploadImage,
        deleteImage,
        ...uploadState,
    };
}
