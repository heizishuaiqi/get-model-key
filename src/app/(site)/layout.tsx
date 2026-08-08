import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { getRootMetadata, structuredData } from '@/lib/root-metadata';
import { inter } from '@/lib/font';
import '@/styles/globals.css';

export const metadata = getRootMetadata('en');

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bg-app text-text-primary`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4GRH9GT3V1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-brand-300 focus:px-4 focus:py-2 focus:text-bg-app"
        >
          Skip to main content
        </a>
        <div className="min-h-screen flex flex-col">
          <Header lang="en" />
          <main id="main-content" className="flex-1">
            <Breadcrumbs lang="en" />
            {children}
          </main>
          <Footer lang="en" />
        </div>
      </body>
    </html>
  );
}
