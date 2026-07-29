/**
 * Shared utilities and constants used across the application.
 * Extracted to eliminate code duplication between EN/ZH page variants.
 */

/** Supported language codes */
export type Lang = 'en' | 'zh';

/**
 * Normalize a URL path by removing trailing slashes.
 * Returns '/' for empty or root paths.
 */
export function normalizePath(path: string): string {
  if (!path) return '/';
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/** Bilingual labels for provider regions */
export const REGION_LABELS: Record<Lang, Record<string, string>> = {
  en: {
    global: 'Global',
    china: 'China',
    aggregator: 'Aggregator',
    cloud: 'Cloud',
  },
  zh: {
    global: '国际',
    china: '中国',
    aggregator: '聚合平台',
    cloud: '云平台',
  },
};

/** Bilingual labels for guide topics */
export const TOPIC_LABELS: Record<Lang, Record<string, string>> = {
  en: {
    'api-key-setup': 'API Key Setup',
    troubleshooting: 'Troubleshooting',
    comparison: 'Comparison',
    offers: 'Offers',
    basics: 'AI Basics',
  },
  zh: {
    'api-key-setup': 'Key 开通',
    troubleshooting: '问题排查',
    comparison: '选型对比',
    offers: '活动解读',
    basics: 'AI 基础',
  },
};

/**
 * Build the detail page href for a provider in the given language.
 */
export function getProviderDetailHref(slug: string, lang: Lang): string {
  return lang === 'en' ? `/providers/${slug}` : `/zh/providers/${slug}`;
}

/**
 * Build the detail page href for a guide in the given language.
 */
export function getGuideDetailHref(slug: string, lang: Lang): string {
  return lang === 'en' ? `/guides/${slug}` : `/zh/guides/${slug}`;
}
