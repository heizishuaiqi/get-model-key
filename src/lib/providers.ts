import fs from 'fs/promises';
import path from 'path';
import type { Provider, Category, ProviderOffer, SiteConfig } from '@/types/provider';
import type { Lang } from './shared';

const dataDir = path.join(process.cwd(), 'src/data');

/** Homepage content loaded from `src/data/pages/home.<lang>.json`. */
export interface HomepageContent {
  hero: { title: string; subtitle: string };
  search?: { placeholder: string };
  sections?: string[];
}

function isOfferExpired(offer: ProviderOffer, now: Date): boolean {
  if (!offer.expiresAt) return false;
  return new Date(`${offer.expiresAt}T23:59:59.999Z`) < now;
}

/** Filter a provider's offers to only active, non-expired ones. */
export function getActiveOffers(provider: Provider, now: Date = new Date()): ProviderOffer[] {
  return (provider.offers ?? []).filter(
    (offer) => offer.status === 'active' && !isOfferExpired(offer, now)
  );
}

/** Read all active providers from the data directory. */
export async function getAllProviders(): Promise<Provider[]> {
  const providersDir = path.join(dataDir, 'providers');
  const files = await fs.readdir(providersDir);

  const providers = await Promise.all(
    files
      .filter((file) => file.endsWith('.json'))
      .map(async (file) => {
        const filePath = path.join(providersDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content) as Provider;
      })
  );

  return providers.filter((p) => p.status === 'active');
}

/** Fetch a single provider by its slug, or null if not found. */
export async function getProviderBySlug(slug: string): Promise<Provider | null> {
  const filePath = path.join(dataDir, 'providers', `${slug}.json`);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as Provider;
  } catch {
    return null;
  }
}

/** Get all providers that belong to a given category slug. */
export async function getProvidersByCategory(categorySlug: string): Promise<Provider[]> {
  const providers = await getAllProviders();
  return providers.filter(p => p.categories.includes(categorySlug));
}

/** Get all providers marked as featured. */
export async function getFeaturedProviders(): Promise<Provider[]> {
  const providers = await getAllProviders();
  return providers.filter(p => p.featured);
}

/** Get all providers that have at least one active, non-expired offer. */
export async function getProvidersWithActiveOffers(now: Date = new Date()): Promise<Provider[]> {
  const providers = await getAllProviders();
  const providersWithOffers: Provider[] = [];

  providers.forEach((provider) => {
    const activeOffers = getActiveOffers(provider, now);
    if (activeOffers.length > 0) {
      providersWithOffers.push({
        ...provider,
        offers: activeOffers,
      });
    }
  });

  return providersWithOffers.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    const aDate = a.offers?.[0]?.verifiedAt || '';
    const bDate = b.offers?.[0]?.verifiedAt || '';
    return bDate.localeCompare(aDate);
  });
}

/** Read all provider categories from `categories.json`. */
export async function getCategories(): Promise<Category[]> {
  const filePath = path.join(dataDir, 'categories.json');
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content) as Category[];
}

/** Find a category by its slug, or null if not found. */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find(c => c.slug === slug) || null;
}

/** Default site configuration used when `site.json` cannot be read. */
const DEFAULT_SITE_CONFIG: SiteConfig = {
  siteName: 'Get Model Key',
  alternateSiteName: [],
  domain: 'https://www.getmodelkey.com',
  defaultLocale: 'en',
  supportedLocales: ['en', 'zh'],
  contactEmail: 'heizishuaiqi@gmail.com',
  socialImage: '/android-chrome-512x512.png',
  favicon: '/favicon.ico',
};

/** Read the global site configuration from `site.json`, with a safe fallback. */
export async function getSiteConfig(): Promise<SiteConfig> {
  const filePath = path.join(dataDir, 'site.json');
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as SiteConfig;
  } catch {
    return DEFAULT_SITE_CONFIG;
  }
}

/** Default homepage content used when the JSON file is missing or invalid. */
const DEFAULT_HOMEPAGE_CONTENT: HomepageContent = {
  hero: { title: '', subtitle: '' },
  sections: [],
};

/** Read homepage content for the given language, falling back to English then defaults. */
export async function getHomepageContent(lang: Lang = 'en'): Promise<HomepageContent> {
  const filePath = path.join(dataDir, 'pages', `home.${lang}.json`);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as HomepageContent;
  } catch {
    // Fallback to English
    const fallbackPath = path.join(dataDir, 'pages', 'home.en.json');
    try {
      const content = await fs.readFile(fallbackPath, 'utf-8');
      return JSON.parse(content) as HomepageContent;
    } catch {
      return DEFAULT_HOMEPAGE_CONTENT;
    }
  }
}
