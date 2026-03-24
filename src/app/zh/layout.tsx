import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function ZhLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header lang="zh" />
      <main className="flex-1">
        <Breadcrumbs lang="zh" />
        {children}
      </main>
      <Footer lang="zh" />
    </div>
  );
}
