import { Inter } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { getRootMetadata, structuredData } from '@/lib/root-metadata';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = getRootMetadata('zh');

export default function ZhLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
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
        <div className="min-h-screen flex flex-col">
          <Header lang="zh" />
          <main className="flex-1">
            <Breadcrumbs lang="zh" />
            {children}
          </main>
          <Footer lang="zh" />
        </div>
      </body>
    </html>
  );
}
