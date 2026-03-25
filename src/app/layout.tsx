import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });
const baseUrl = 'https://www.getmodelkey.com';
const structuredData = [
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

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Get Model Key - Official API Key Directory for AI Model Providers',
  description: 'Find official API key pages for major AI model providers. Browse popular models and go straight to the right official entry.',
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
    languages: {
      en: '/',
      zh: '/zh/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.getmodelkey.com/',
    title: 'Get Model Key - Official API Key Directory for AI Model Providers',
    description: 'Find official API key pages for major AI model providers. Browse popular models and go straight to the right official entry.',
    siteName: 'Get Model Key',
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
    title: 'Get Model Key - Official API Key Directory for AI Model Providers',
    description: 'Find official API key pages for major AI model providers. Browse popular models and go straight to the right official entry.',
    images: ['/android-chrome-512x512.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bg-app text-text-primary`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4GRH9GT3V1"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4GRH9GT3V1');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
