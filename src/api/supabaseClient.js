import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Chybí Supabase env proměnné — zkontroluj .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function recordVisit() {
  if (typeof window !== 'undefined' && sessionStorage.getItem('vd_visit_counted')) return;
  try {
    await supabase.from('page_visits').insert([{}]);
    if (typeof window !== 'undefined') sessionStorage.setItem('vd_visit_counted', '1');
  } catch {}
}

export async function getVisitorStats() {
  const { data, error } = await supabase.rpc('get_visitor_stats');
  if (error) return null;
  return data;
}

// Nahraje soubor do bucketu product-images a vrátí veřejné URL
export async function uploadProductImage(file) {
  const ext = file.name.split('.').pop();
  const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage
    .from('product-images')
    .upload(path, file, { upsert: false, cacheControl: '3600' });
  if (error) throw error;
  const { data } = supabase.storage.from('product-images').getPublicUrl(path);
  return data.publicUrl;
}
