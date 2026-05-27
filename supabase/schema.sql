-- VÁHY-DYCHL v2 — Supabase Schema
-- Spusť v: Supabase → SQL Editor → New Query

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  category_id   TEXT NOT NULL CHECK (category_id IN ('A','B','C','D','E','F','G','H','I','J','K','L')),
  description   TEXT,      -- HTML obsah z ReactQuill editoru
  price         TEXT,
  certified     BOOLEAN NOT NULL DEFAULT false,
  inquiry_only  BOOLEAN NOT NULL DEFAULT false,
  active        BOOLEAN NOT NULL DEFAULT true,
  image_url     TEXT,
  variants_json TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.inquiries (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  phone      TEXT,
  email      TEXT NOT NULL,
  message    TEXT NOT NULL,
  product    TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Drop old policies safely
DROP POLICY IF EXISTS "Public read active products"    ON public.products;
DROP POLICY IF EXISTS "Authenticated full access"      ON public.products;
DROP POLICY IF EXISTS "Admin full access"              ON public.products;
DROP POLICY IF EXISTS "Public can insert inquiries"    ON public.inquiries;
DROP POLICY IF EXISTS "Authenticated read inquiries"   ON public.inquiries;
DROP POLICY IF EXISTS "Admin read inquiries"           ON public.inquiries;
DROP POLICY IF EXISTS "Authenticated delete inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admin delete inquiries"         ON public.inquiries;

CREATE POLICY "Public read active products"
  ON public.products FOR SELECT TO anon USING (active = true);

-- Only m.dytrich@seznam.cz has write access to products
CREATE POLICY "Admin full access"
  ON public.products FOR ALL TO authenticated
  USING  (auth.email() = 'm.dytrich@seznam.cz')
  WITH CHECK (auth.email() = 'm.dytrich@seznam.cz');

CREATE POLICY "Public can insert inquiries"
  ON public.inquiries FOR INSERT WITH CHECK (true);

-- Only m.dytrich@seznam.cz can read and delete inquiries
CREATE POLICY "Admin read inquiries"
  ON public.inquiries FOR SELECT TO authenticated
  USING (auth.email() = 'm.dytrich@seznam.cz');

CREATE POLICY "Admin delete inquiries"
  ON public.inquiries FOR DELETE TO authenticated
  USING (auth.email() = 'm.dytrich@seznam.cz');

-- Storage bucket policies (spusť PO vytvoření bucketu 'product-images')
DROP POLICY IF EXISTS "Public read product-images"          ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload product-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete product-images" ON storage.objects;

CREATE POLICY "Public read product-images"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'product-images');

CREATE POLICY "Admin upload product-images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-images' AND auth.email() = 'm.dytrich@seznam.cz');

CREATE POLICY "Admin delete product-images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'product-images' AND auth.email() = 'm.dytrich@seznam.cz');

CREATE INDEX IF NOT EXISTS idx_products_active_cat ON public.products(active, category_id);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at DESC);
