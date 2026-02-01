-- Создание типа роли
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Таблица: user_roles (роли пользователей)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Функция проверки роли
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Таблица: profiles (профили пользователей)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Таблица: site_sections (секции сайта)
CREATE TABLE public.site_sections (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  is_visible BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Таблица: navigation_items (элементы навигации)
CREATE TABLE public.navigation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  scroll_to TEXT,
  position INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  location TEXT NOT NULL DEFAULT 'header',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Таблица: site_settings (настройки сайта)
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Таблица: reviews (рецензии)
CREATE TABLE public.reviews (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  genre TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  cover_color TEXT NOT NULL,
  cover_image_url TEXT,
  full_review TEXT NOT NULL,
  published_date TEXT NOT NULL,
  is_published BOOLEAN DEFAULT true,
  position INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Таблица: comments (комментарии)
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id TEXT NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Включение RLS для всех таблиц
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- RLS политики для user_roles
CREATE POLICY "Пользователи видят свои роли" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- RLS политики для profiles
CREATE POLICY "Публичное чтение профилей" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Пользователи могут обновлять свой профиль" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS политики для site_sections
CREATE POLICY "Публичное чтение секций" ON public.site_sections
  FOR SELECT USING (true);

CREATE POLICY "Админы могут редактировать секции" ON public.site_sections
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS политики для navigation_items
CREATE POLICY "Публичное чтение навигации" ON public.navigation_items
  FOR SELECT USING (true);

CREATE POLICY "Админы могут редактировать навигацию" ON public.navigation_items
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS политики для site_settings
CREATE POLICY "Публичное чтение настроек" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Админы могут редактировать настройки" ON public.site_settings
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS политики для reviews
CREATE POLICY "Публичное чтение опубликованных рецензий" ON public.reviews
  FOR SELECT USING (is_published = true);

CREATE POLICY "Админы видят все рецензии" ON public.reviews
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Админы могут редактировать рецензии" ON public.reviews
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS политики для comments
CREATE POLICY "Публичное чтение одобренных комментариев" ON public.comments
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Пользователи могут добавлять комментарии" ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Пользователи могут удалять свои комментарии" ON public.comments
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Админы видят все комментарии" ON public.comments
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Триггер для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.site_sections
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
