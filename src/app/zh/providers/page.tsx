import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProviders, getCategories } from '@/lib/providers';
import Badge from '@/components/ui/Badge';
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
    },
  },
};

export default async function ZhProvidersPage() {
  const [providers, categories] = await Promise.all([
    getAllProviders(),
    getCategories(),
  ]);

  const categoryCounts = categories.map((category) => ({
    ...category,
    providerCount: providers.filter((provider) => provider.categories.includes(category.slug)).length,
  }));

  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-h1 text-text-primary">AI 模型提供商</h1>
          <p className="mx-auto max-w-3xl text-body text-text-secondary">
            浏览完整目录、按分类筛选，并直接进入官方 API Key 申请入口。
          </p>
        </div>

        <Card variant="standard" className="mb-12">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <div className="mb-2 text-caption font-semibold uppercase tracking-wide text-text-tertiary">供应商总数</div>
              <div className="text-h3 text-text-primary">{providers.length}</div>
            </div>
            <div>
              <div className="mb-2 text-caption font-semibold uppercase tracking-wide text-text-tertiary">精选数量</div>
              <div className="text-h3 text-text-primary">{providers.filter((provider) => provider.featured).length}</div>
            </div>
            <div>
              <div className="mb-2 text-caption font-semibold uppercase tracking-wide text-text-tertiary">分类数量</div>
              <div className="text-h3 text-text-primary">{categories.length}</div>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-h2 text-text-primary">全部供应商</h2>
              <p className="text-body text-text-secondary">每张卡片都可直达对应平台的官方 API Key 页面。</p>
            </div>
            <Badge variant="neutral">{providers.length} 个</Badge>
          </div>

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

        <section className="mb-12">
          <h2 className="mb-8 text-h2 text-text-primary">按分类浏览</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryCounts.map((category) => (
              <Card key={category.slug} variant="standard" hover padding="lg">
                <div className="mb-4 flex items-center justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface-green text-lg font-bold text-brand-300">
                    {category.name.zh.charAt(0)}
                  </div>
                  <Badge variant="info">{category.providerCount}</Badge>
                </div>
                <h3 className="mb-2 text-h4 text-text-primary">{category.name.zh}</h3>
                <p className="mb-4 text-body-sm text-text-secondary">查看该分类下的供应商与官方申请入口。</p>
                <Link
                  href={`/zh/#${category.slug}`}
                  className="text-body-sm font-semibold text-brand-300 transition-colors hover:text-brand-400"
                >
                  查看分类
                </Link>
              </Card>
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
