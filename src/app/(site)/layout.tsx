import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header lang="en" />
      <main className="flex-1">
        <Breadcrumbs lang="en" />
        {children}
      </main>
      <Footer lang="en" />
    </div>
  );
}
