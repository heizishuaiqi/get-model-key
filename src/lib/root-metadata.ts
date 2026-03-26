import type { Metadata } from 'next';

export const baseUrl = 'https://www.getmodelkey.com';

export const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Get Model Key',
    url: baseUrl,
    logo: `${baseUrl}/android-chrome-512x512.png`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Get Model Key',
    url: baseUrl,
    inLanguage: ['en', 'zh-CN'],
  },
];

export function getRootMetadata(lang: 'en' | 'zh'): Metadata {
  const titles = {
    en: 'Get Model Key - Official API Key Directory for AI Model Providers',
    zh: 'Get Model Key - AI 模型提供商官方 API Key 目录',
  } as const;

  const descriptions = {
    en: 'Find official API key pages for major AI model providers. Browse popular models and go straight to the right official entry.',
    zh: '查找主流 AI 模型提供商的官方 API Key 页面，浏览常用模型，并直接进入正确的官方入口。',
  } as const;

  const canonical = lang === 'en' ? '/' : '/zh/';
  const openGraphUrl = `${baseUrl}${canonical}`;

  return {
    metadataBase: new URL(baseUrl),
    title: titles[lang],
    description: descriptions[lang],
    applicationName: 'Get Model Key',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
        { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      shortcut: ['/favicon.ico'],
    },
    manifest: '/site.webmanifest',
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical,
      languages: {
        en: '/',
        zh: '/zh/',
        'x-default': '/',
      },
    },
    openGraph: {
      type: 'website',
      url: openGraphUrl,
      title: titles[lang],
      description: descriptions[lang],
      siteName: 'Get Model Key',
      locale: lang === 'en' ? 'en_US' : 'zh_CN',
      images: [
        {
          url: '/android-chrome-512x512.png',
          width: 512,
          height: 512,
          alt: 'Get Model Key logo',
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: titles[lang],
      description: descriptions[lang],
      images: ['/android-chrome-512x512.png'],
    },
  };
}
