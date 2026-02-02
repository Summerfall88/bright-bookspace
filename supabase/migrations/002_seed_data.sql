-- Заполнение site_sections
INSERT INTO public.site_sections (id, name, content) VALUES
('hero', 'Hero Section', '{
  "badge": "Книжный блог",
  "heading": "Christina Evilbook",
  "description": "Путешествия по страницам книг, честные рецензии и литературные открытия для настоящих книголюбов",
  "cta_text": "Читать рецензии",
  "cta_link": "/reviews",
  "background_image": null
}'),

('about', 'Обо мне', '{
  "badge": "Обо мне",
  "heading": "Привет, я Кристина - книжный энтузиаст",
  "paragraph1": "Уже более 8 лет я делюсь своей любовью к литературе. Здесь вы найдёте честные рецензии на современное фэнтази, любовные романы и много другое. Каждая книга - это новое приключение, и я приглашаю вас в это путешествие вместе со мной.",
  "paragraph2": "Моя миссия - помочь вам найти книгу, которая, возможно, изменит ваш взгляд на мир или просто подарит уютный вечер с чашечкой чая.",
  "photo_url": null,
  "stats": [
    {"icon": "BookMarked", "value": "150+", "label": "Прочитанных книг"},
    {"icon": "Coffee", "value": "300+", "label": "Чашек кофе"},
    {"icon": "Heart", "value": "50+", "label": "Рецензий"}
  ]
}'),

('subscribe', 'Подписка', '{
  "heading": "Не пропустите новые рецензии и обзоры",
  "description": "Подпишитесь на рассылку и получайте свежие обзоры книг прямо на почту. Никакого спама - только литература.",
  "button_text": "Подписаться",
  "success_message": "Спасибо за подписку! Скоро напишем.",
  "footer_text": "Присоединяйтесь к моим читателям"
}'),

('reviews_page', 'Страница рецензий', '{
  "badge": "Рецензии",
  "heading": "Все рецензии",
  "description": "Честные отзывы о книгах, которые стоит прочитать — от классики до современных бестселлеров",
  "search_placeholder": "Поиск по названию книги или автору...",
  "empty_message": "По запросу «{query}» ничего не найдено. Попробуйте изменить запрос."
}'),

('reviews_section', 'Секция рецензий на главной', '{
  "badge": "Рецензии",
  "heading": "Последние прочитанные",
  "description": "Честные отзывы о книгах, которые стоит прочитать — от классики до современных бестселлеров",
  "cards_count": 6
}');

-- Заполнение navigation_items
INSERT INTO public.navigation_items (label, href, scroll_to, position, location) VALUES
('Обо мне', '/', 'about', 1, 'header'),
('Рецензии', '/reviews', NULL, 2, 'header'),
('Подписка', '/', 'subscribe', 3, 'header');

-- Заполнение site_settings
INSERT INTO public.site_settings (key, value) VALUES
('branding', '{
  "site_name": "EvilBook",
  "logo_text": "EvilBook",
  "copyright": "© 2026 Evilbook. Все права защищены.",
  "logo_icon_url": null
}'),
('social_links', '{
  "instagram": "https://www.instagram.com/christinaevil/",
  "instagram_icon_url": null,
  "telegram": "https://t.me/christinaevilbook",
  "telegram_icon_url": null,
  "youtube": "https://www.youtube.com/@evilbook",
  "youtube_icon_url": null,
  "tiktok": null,
  "tiktok_icon_url": null,
  "vk": null,
  "vk_icon_url": null
}'),
('meta', '{
  "title": "EvilBook - Книжный блог",
  "description": "Честные рецензии на книги от Кристины",
  "og_image": null
}');
