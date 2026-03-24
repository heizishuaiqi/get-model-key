import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://getmodelkey.com'),
  title: 'Get Model Key - Official API Key Directory for AI Model Providers',
  description: 'Find official API key pages for major AI model providers. Browse popular models and go straight to the right official entry.',
  applicationName: 'Get Model Key',
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
    url: 'https://getmodelkey.com/',
    title: 'Get Model Key - Official API Key Directory for AI Model Providers',
    description: 'Find official API key pages for major AI model providers. Browse popular models and go straight to the right official entry.',
    siteName: 'Get Model Key',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Model Key - Official API Key Directory for AI Model Providers',
    description: 'Find official API key pages for major AI model providers. Browse popular models and go straight to the right official entry.',
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
        {children}
      </body>
    </html>
  );
}
