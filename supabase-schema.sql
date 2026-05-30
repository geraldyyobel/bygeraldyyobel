-- Supabase Schema Migration

-- Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  year TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  story TEXT,
  "demoUrl" TEXT,
  gallery JSONB,
  tags TEXT,
  location TEXT,
  role TEXT,
  "originalColor" BOOLEAN DEFAULT false,
  "isVisible" BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  icon TEXT NOT NULL,
  name TEXT NOT NULL,
  tech TEXT NOT NULL,
  duration TEXT NOT NULL,
  description TEXT NOT NULL,
  "isVisible" BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Experiences Table
CREATE TABLE IF NOT EXISTS public.experiences (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  years TEXT NOT NULL,
  "desc" TEXT,
  "logoUrl" TEXT,
  "isVisible" BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- FAQs Table
CREATE TABLE IF NOT EXISTS public.faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  "isVisible" BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Social Links Table
CREATE TABLE IF NOT EXISTS public.social_links (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  "isEnabled" BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Singleton Config Tables
-- Hero Content
CREATE TABLE IF NOT EXISTS public.hero_content (
  id INTEGER PRIMARY KEY DEFAULT 1,
  "topLabel" TEXT NOT NULL,
  headline TEXT NOT NULL,
  "companyName" TEXT NOT NULL,
  "freelanceMonth" TEXT NOT NULL,
  "bannerText" TEXT
);

-- About Content
CREATE TABLE IF NOT EXISTS public.about_content (
  id INTEGER PRIMARY KEY DEFAULT 1,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "bioPara" TEXT NOT NULL,
  "philosophyLabel" TEXT NOT NULL,
  "philosophyText" TEXT NOT NULL,
  "xLink" TEXT NOT NULL,
  "xLinkLabel" TEXT NOT NULL
);

-- Contact Content
CREATE TABLE IF NOT EXISTS public.contact_content (
  id INTEGER PRIMARY KEY DEFAULT 1,
  label TEXT NOT NULL,
  heading TEXT NOT NULL,
  subtext TEXT NOT NULL,
  email TEXT NOT NULL,
  "emailLabel" TEXT NOT NULL
);

-- Section Visibility
CREATE TABLE IF NOT EXISTS public.section_visibility (
  id INTEGER PRIMARY KEY DEFAULT 1,
  work BOOLEAN DEFAULT true NOT NULL,
  services BOOLEAN DEFAULT true NOT NULL,
  experience BOOLEAN DEFAULT true NOT NULL,
  faq BOOLEAN DEFAULT true NOT NULL,
  about BOOLEAN DEFAULT true NOT NULL,
  contact BOOLEAN DEFAULT true NOT NULL
);

-- Site Config
CREATE TABLE IF NOT EXISTS public.site_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  "faviconUrl" TEXT NOT NULL
);

-- Set up Row Level Security (RLS)
-- For public read access, but restricted write access (we will use anon key for reads, but can use it for writes since it's a personal portfolio for now without auth setup, or you can require authenticated roles)
-- For simplicity, let's allow all operations for now, you can lock it down later.
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.section_visibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read access" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access" ON public.hero_content FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access" ON public.about_content FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access" ON public.contact_content FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access" ON public.section_visibility FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access" ON public.site_config FOR SELECT USING (true);

-- Allow all operations (Insert/Update/Delete) for now to let AdminPanel work seamlessly without complex Auth setup initially.
CREATE POLICY "Allow anonymous all" ON public.projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anonymous all" ON public.services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anonymous all" ON public.experiences FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anonymous all" ON public.faqs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anonymous all" ON public.social_links FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anonymous all" ON public.hero_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anonymous all" ON public.about_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anonymous all" ON public.contact_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anonymous all" ON public.section_visibility FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anonymous all" ON public.site_config FOR ALL USING (true) WITH CHECK (true);
