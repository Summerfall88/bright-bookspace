// Этот файл автоматически собирает все рецензии из папки reviews
// Чтобы добавить новую рецензию:
// 1. Создайте новый файл в этой папке (например: moya-novaya-kniga.ts)
// 2. Экспортируйте объект Review по умолчанию
// 3. Добавьте импорт и включите в массив reviews ниже

export type { Review } from "./types";

import { malenkayaZhizn } from "./malenkaya-zhizn";
import { dumayMedlenno13 } from "./dumay-medlenno13";
import { stoLetOdinochestva } from "./sto-let-odinochestva";
import { norvezhskiyLes } from "./norvezhskiy-les";
import { dumayMedlenno } from "./dumay-medlenno";
import { orwell1984 } from "./1984";
import { atlantRaspravilPlechi } from "./atlant-raspravil-plechi";
import { Review } from "./types";

// Массив всех рецензий — добавляйте новые сюда
export const reviews: Review[] = [
  malenkayaZhizn,
  dumayMedlenno13,
  stoLetOdinochestva,
  norvezhskiyLes,
  dumayMedlenno,
  orwell1984,
  atlantRaspravilPlechi,
];

export const getReviewById = (id: string): Review | undefined => {
  return reviews.find(review => review.id === id);
};
