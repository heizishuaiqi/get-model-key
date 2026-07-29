import type { Metadata } from 'next';
import { getSiteConfig } from './providers';
import { getGuideBySlug } from './guides';
import type { Lang } from './shared';

/**
 * Generate SEO metadata for the homepage in the given language.
 */
export async function getHomepageMetadata(lang: Lang = 'en'): Promise<Metadata> {
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
      card: 'summary_large_image',
      title: titles[lang],
      description: descriptions[lang],
      images: [siteConfig.socialImage],
    },
  };
}

/**
 * Generate SEO metadata for a provider detail page.
 */
export async function getProviderMetadata(slug: string, lang: Lang = 'en'): Promise<Metadata> {
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
      ? `${provider.name.en} API Key & Models | ${siteConfig.siteName}`
      : `${provider.name.zh} API Key 与模型 | ${siteConfig.siteName}`;

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
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.socialImage],
    },
  };
}

/**
 * Generate SEO metadata for the guides index page.
 */
export async function getGuidesIndexMetadata(lang: Lang = 'en'): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  const url = lang === 'en' ? `${siteConfig.domain}/guides/` : `${siteConfig.domain}/zh/guides/`;

  const titles = {
    en: `AI API Guides | ${siteConfig.siteName}`,
    zh: `AI API 指南 | ${siteConfig.siteName}`,
  };

  const descriptions = {
    en: 'Read practical guides for getting API keys, fixing common API errors, and choosing the right AI model provider.',
    zh: '阅读实用 AI API 指南：快速开通 Key、排查常见错误，并选择合适的模型供应商。',
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: {
      canonical: url,
      languages: {
        en: `${siteConfig.domain}/guides/`,
        zh: `${siteConfig.domain}/zh/guides/`,
        'x-default': `${siteConfig.domain}/guides/`,
      },
    },
    openGraph: {
      type: 'article',
      url,
      title: titles[lang],
      description: descriptions[lang],
      siteName: siteConfig.siteName,
      locale: lang === 'en' ? 'en_US' : 'zh_CN',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang],
      description: descriptions[lang],
      images: [siteConfig.socialImage],
    },
  };
}

/**
 * Generate SEO metadata for a guide detail page.
 */
export async function getGuideMetadata(slug: string, lang: Lang = 'en'): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  const guide = await getGuideBySlug(slug);

  if (!guide || guide.status !== 'published') {
    return {
      title: 'Guide Not Found',
      description: 'The requested guide was not found.',
    };
  }

  const title = guide.seo?.title?.[lang] || guide.title[lang];
  const description = guide.seo?.description?.[lang] || guide.excerpt[lang];
  const coverImage = guide.coverImage?.[lang] ?? siteConfig.socialImage;
  const url =
    lang === 'en'
      ? `${siteConfig.domain}/guides/${slug}/`
      : `${siteConfig.domain}/zh/guides/${slug}/`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteConfig.domain}/guides/${slug}/`,
        zh: `${siteConfig.domain}/zh/guides/${slug}/`,
        'x-default': `${siteConfig.domain}/guides/${slug}/`,
      },
    },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      siteName: siteConfig.siteName,
      locale: lang === 'en' ? 'en_US' : 'zh_CN',
      images: [{ url: coverImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [coverImage],
    },
  };
}

/** FAQ item shape shared by providers and guides. */
interface FaqItem {
  question: Record<Lang, string>;
  answer: Record<Lang, string>;
}

/**
 * Build FAQPage structured data for JSON-LD injection.
 * Returns null when there are no FAQ items, so callers can conditionally render the script tag.
 */
export function buildFaqStructuredData(
  faqItems: FaqItem[] | undefined,
  lang: Lang
): Record<string, unknown> | null {
  if (!faqItems || faqItems.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question[lang],
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer[lang],
      },
    })),
  };
}

/**
 * Build WebPage structured data for static pages (about, contact, privacy, terms).
 */
export function buildWebPageStructuredData(
  title: string,
  url: string,
  lang: Lang
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    url,
    inLanguage: lang === 'en' ? 'en' : 'zh-CN',
    isPartOf: {
      '@type': 'WebSite',
      url: 'https://www.getmodelkey.com',
      name: 'Get Model Key',
    },
  };
}
