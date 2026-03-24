import fs from 'fs/promises';
import path from 'path';
import type { Provider, Category } from '@/types/provider';

const dataDir = path.join(process.cwd(), 'src/data');

export async function getAllProviders(): Promise<Provider[]> {
  const providersDir = path.join(dataDir, 'providers');
  const files = await fs.readdir(providersDir);
  
  const providers = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(providersDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content);
    })
  );
  
  return providers.filter(p => p.status === 'active');
}

export async function getProviderBySlug(slug: string): Promise<Provider | null> {
  const filePath = path.join(dataDir, 'providers', `${slug}.json`);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export async function getProvidersByCategory(categorySlug: string): Promise<Provider[]> {
  const providers = await getAllProviders();
  return providers.filter(p => p.categories.includes(categorySlug));
}

export async function getFeaturedProviders(): Promise<Provider[]> {
  const providers = await getAllProviders();
  return providers.filter(p => p.featured);
}

export async function getCategories(): Promise<Category[]> {
  const filePath = path.join(dataDir, 'categories.json');
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find(c => c.slug === slug) || null;
}

export async function getSiteConfig() {
  const filePath = path.join(dataDir, 'site.json');
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

export async function getHomepageContent(lang: 'en' | 'zh' = 'en') {
  const filePath = path.join(dataDir, 'pages', `home.${lang}.json`);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    // Fallback to English
    const fallbackPath = path.join(dataDir, 'pages', 'home.en.json');
    const content = await fs.readFile(fallbackPath, 'utf-8');
    return JSON.parse(content);
  }
}