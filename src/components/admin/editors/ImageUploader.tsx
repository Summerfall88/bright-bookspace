import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useImageUpload } from '@/hooks/useImageUpload';
import { Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
    value?: string;
    onChange: (url: string | null) => void;
    label?: string;
    path: string;
    className?: string;
}

export function ImageUploader({
    value,
    onChange,
    label = 'Изображение',
    path,
    className,
}: ImageUploaderProps) {
    const [preview, setPreview] = useState<string | undefined>(value);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { uploadImage, deleteImage, uploading, progress, error } = useImageUpload();

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Показываем превью
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Загружаем файл
        const url = await uploadImage(file, path);
        if (url) {
            onChange(url);
        }
    };

    const handleRemove = async () => {
        if (value) {
            await deleteImage(value);
        }
        setPreview(undefined);
        onChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={cn('space-y-2', className)}>
            <Label>{label}</Label>

            {preview ? (
                <div className="relative group">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleRemove}
                            disabled={uploading}
                        >
                            <X className="w-4 h-4 mr-2" />
                            Удалить
                        </Button>
                    </div>
                    {uploading && (
                        <div className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center">
                            <div className="text-white text-center">
                                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                                <p className="text-sm">{progress}%</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                        Нажмите для выбора изображения
                    </p>
                    <p className="text-xs text-muted-foreground">
                        PNG, JPG, WEBP до 5MB
                    </p>
                </div>
            )}

            <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
            />

            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
        </div>
    );
}
