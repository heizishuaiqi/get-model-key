import type { Metadata } from 'next';
import { getSiteConfig } from './providers';

export async function getHomepageMetadata(lang: 'en' | 'zh' = 'en'): Promise<Metadata> {
  const siteConfig = await getSiteConfig();

  const titles = {
    en: 'Get Model Key - Official API Key Directory for AI Model Providers',
    zh: 'Get Model Key - AI 模型提供商官方 API Key 目录',
  };

  const descriptions = {
    en: 'Find official API key pages for major AI model providers. Browse popular models and go straight to the right official entry.',
    zh: '查找主流 AI 模型提供商的官方 API Key 页面，浏览常用模型，并直接进入正确的官方入口。',
  };

  const canonical = lang === 'en' ? `${siteConfig.domain}/` : `${siteConfig.domain}/zh/`;

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: {
      canonical,
      languages: {
        en: `${siteConfig.domain}/`,
        zh: `${siteConfig.domain}/zh/`,
        'x-default': `${siteConfig.domain}/`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: titles[lang],
      description: descriptions[lang],
      siteName: siteConfig.siteName,
      locale: lang === 'en' ? 'en_US' : 'zh_CN',
    },
    twitter: {
      card: 'summary',
      title: titles[lang],
      description: descriptions[lang],
      images: [siteConfig.socialImage],
    },
  };
}

export async function getProviderMetadata(slug: string, lang: 'en' | 'zh' = 'en'): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  const { getProviderBySlug } = await import('./providers');
  const provider = await getProviderBySlug(slug);

  if (!provider) {
    return {
      title: 'Provider Not Found',
      description: 'The requested provider was not found.',
    };
  }

  const defaultTitle =
    lang === 'en'
      ? `${provider.name.en} API Key - Official Access, Models & Quick Overview | ${siteConfig.siteName}`
      : `${provider.name.zh} API Key - 官方入口、常用模型与快速说明 | ${siteConfig.siteName}`;

  const defaultDescription =
    lang === 'en'
      ? `Find the official ${provider.name.en} API key page, browse common models, and see what ${provider.name.en} is best for.`
      : `查找 ${provider.name.zh} 的官方 API Key 页面，浏览常用模型，并快速了解它适合的使用场景。`;

  const title = provider.seo?.title?.[lang] || defaultTitle;
  const description = provider.seo?.description?.[lang] || defaultDescription;

  const url =
    lang === 'en'
      ? `${siteConfig.domain}/providers/${slug}/`
      : `${siteConfig.domain}/zh/providers/${slug}/`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteConfig.domain}/providers/${slug}/`,
        zh: `${siteConfig.domain}/zh/providers/${slug}/`,
        'x-default': `${siteConfig.domain}/providers/${slug}/`,
      },
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: siteConfig.siteName,
      locale: lang === 'en' ? 'en_US' : 'zh_CN',
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [siteConfig.socialImage],
    },
  };
}
