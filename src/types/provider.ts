export interface Provider {
  slug: string;
  status: 'active' | 'hidden' | 'draft';
  categories: string[];
  region: 'global' | 'china' | 'aggregator' | 'cloud';
  featured: boolean;
  officialKeyUrl: string;
  officialSiteUrl?: string;
  officialDocsUrl?: string;
  name: Record<'en' | 'zh', string>;
  summary: Record<'en' | 'zh', string>;
  models: Record<'en' | 'zh', string[]>;
  tags: string[];
  searchAliases: string[];
  lastVerified?: string;
  seo?: {
    title: Record<'en' | 'zh', string>;
    description: Record<'en' | 'zh', string>;
  };
}

export interface Category {
  slug: string;
  name: Record<'en' | 'zh', string>;
  order: number;
}

export interface SiteConfig {
  siteName: string;
  alternateSiteName: string[];
  domain: string;
  defaultLocale: 'en' | 'zh';
  supportedLocales: ('en' | 'zh')[];
  contactEmail: string;
  socialImage: string;
  favicon: string;
}