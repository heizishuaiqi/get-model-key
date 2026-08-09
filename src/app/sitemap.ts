import { MetadataRoute } from 'next';
import { getAllProviders, getSiteConfig } from '@/lib/providers';
import { getPublishedGuides } from '@/lib/guides';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [siteConfig, providers, guides] = await Promise.all([
    getSiteConfig(),
    getAllProviders(),
    getPublishedGuides(),
  ]);

  const baseUrl = siteConfig.domain;

  /** Fixed dates for static pages — avoids unreliable new Date() in lastmod signals */
  const STATIC_DATE = '2026-08-10';

  const routes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(STATIC_DATE),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/providers/`,
      lastModified: new Date(STATIC_DATE),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/offers/`,
      lastModified: new Date(STATIC_DATE),
      changeFrequency: 'daily' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/guides/`,
      lastModified: new Date(STATIC_DATE),
      changeFrequency: 'daily' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(STATIC_DATE),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(STATIC_DATE),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy/`,
      lastModified: new Date(STATIC_DATE),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified: new Date(STATIC_DATE),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  const providerPages = providers.map((provider) => ({
    url: `${baseUrl}/providers/${provider.slug}/`,
    lastModified: new Date(provider.lastVerified || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const guidePages = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}/`,
    lastModified: new Date(guide.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const chinesePages = [
    {
      url: `${baseUrl}/zh/`,
      lastModified: new Date(STATIC_DATE),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/zh/providers/`,
      lastModified: new Date(STATIC_DATE),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/zh/offers/`,
      lastModified: new Date(STATIC_DATE),
      changeFrequency: 'daily' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/zh/guides/`,
      lastModified: new Date(STATIC_DATE),
      changeFrequency: 'daily' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/zh/about/`,
      lastModified: new Date(STATIC_DATE),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/zh/contact/`,
      lastModified: new Date(STATIC_DATE),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/zh/privacy/`,
      lastModified: new Date(STATIC_DATE),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/zh/terms/`,
      lastModified: new Date(STATIC_DATE),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  const chineseProviderPages = providers.map((provider) => ({
    url: `${baseUrl}/zh/providers/${provider.slug}/`,
    lastModified: new Date(provider.lastVerified || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const chineseGuidePages = guides.map((guide) => ({
    url: `${baseUrl}/zh/guides/${guide.slug}/`,
    lastModified: new Date(guide.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  const pages = [
    ...routes,
    ...providerPages,
    ...guidePages,
    ...chinesePages,
    ...chineseProviderPages,
    ...chineseGuidePages,
  ];

  return pages.map((page) => {
    const pathname = new URL(page.url).pathname;
    const isChinese = pathname === '/zh/' || pathname.startsWith('/zh/');
    const englishPath = isChinese ? pathname.replace(/^\/zh(?=\/)/, '') : pathname;
    const chinesePath = isChinese
      ? pathname
      : pathname === '/'
        ? '/zh/'
        : `/zh${pathname}`;

    return {
      ...page,
      alternates: {
        languages: {
          en: `${baseUrl}${englishPath}`,
          zh: `${baseUrl}${chinesePath}`,
          'x-default': `${baseUrl}${englishPath}`,
        },
      },
    };
  });
}
