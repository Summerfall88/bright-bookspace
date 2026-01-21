// Этот файл АВТОМАТИЧЕСКИ собирает все рецензии из папки reviews
// Чтобы добавить новую рецензию:
// 1. Создайте новый файл в этой папке (например: moya-novaya-kniga.ts)
// 2. Экспортируйте объект Review как именованный экспорт (export const myReview = {...})
// 3. Всё! Файл автоматически подхватится — ничего больше менять не нужно!

import { Review } from "./types";
export type { Review } from "./types";

// Автоматический импорт всех файлов рецензий (кроме index.ts и types.ts)
const reviewModules = import.meta.glob<{ [key: string]: Review }>(
  ['./*.ts', '!./index.ts', '!./types.ts'],
  { eager: true }
);

// Собираем все рецензии из модулей
export const reviews: Review[] = Object.values(reviewModules).flatMap((module) => {
  // Находим все экспорты, которые являются объектами Review
  return Object.values(module).filter(
    (exported): exported is Review =>
      typeof exported === 'object' &&
      exported !== null &&
      'id' in exported &&
      'title' in exported &&
      'author' in exported &&
      'rating' in exported
  );
});

export const getReviewById = (id: string): Review | undefined => {
  return reviews.find(review => review.id === id);
};
