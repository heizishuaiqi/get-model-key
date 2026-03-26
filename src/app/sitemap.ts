import { MetadataRoute } from 'next';
import { getAllProviders, getSiteConfig } from '@/lib/providers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteConfig = await getSiteConfig();
  const providers = await getAllProviders();

  const baseUrl = siteConfig.domain;

  const routes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/providers/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/offers/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy/`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified: new Date(),
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

  const chinesePages = [
    {
      url: `${baseUrl}/zh/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/zh/providers/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/zh/offers/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/zh/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/zh/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/zh/privacy/`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/zh/terms/`,
      lastModified: new Date(),
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

  return [...routes, ...providerPages, ...chinesePages, ...chineseProviderPages];
}
