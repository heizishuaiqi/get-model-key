import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProviders } from '@/lib/providers';
import Card from '@/components/ui/Card';
import ProviderCard from '@/components/providers/ProviderCard';

export const metadata: Metadata = {
  title: 'AI 模型提供商 - Get Model Key',
  description: '浏览全部 AI 模型提供商，并直接跳转到官方 API Key 申请页面。',
  alternates: {
    canonical: '/zh/providers/',
    languages: {
      en: '/providers/',
      zh: '/zh/providers/',
      'x-default': '/providers/',
    },
  },
};

export default async function ZhProvidersPage() {
  const providers = await getAllProviders();

  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-h1 text-text-primary">AI 模型提供商</h1>
        </div>

        <section className="mb-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => (
              <ProviderCard
                key={provider.slug}
                provider={provider}
                lang="zh"
                showSecondaryLink={false}
              />
            ))}
          </div>
        </section>

        <Card variant="emphasis" className="text-center">
          <h2 className="mb-4 text-h2 text-text-primary">需要新增供应商？</h2>
          <p className="mx-auto mb-6 max-w-2xl text-body text-text-secondary">
            如果你发现某个重要平台尚未收录，欢迎告诉我们，我们会持续完善目录。
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/zh/contact" className="btn-primary-inverse">
              提交新增建议
            </Link>
            <Link href="/zh/" className="btn-secondary-ghost">
              返回首页
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}
