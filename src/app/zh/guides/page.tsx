import type { Metadata } from 'next';
import GuideCard from '@/components/guides/GuideCard';
import Card from '@/components/ui/Card';
import { getPublishedGuides } from '@/lib/guides';
import { getGuidesIndexMetadata } from '@/lib/seo';
import { getSiteConfig } from '@/lib/providers';

export async function generateMetadata(): Promise<Metadata> {
  return getGuidesIndexMetadata('zh');
}

export default async function ZhGuidesPage() {
  const [guides, siteConfig] = await Promise.all([
    getPublishedGuides(),
    getSiteConfig(),
  ]);

  const itemListStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI API 指南',
    itemListElement: guides.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: guide.title.zh,
      url: `${siteConfig.domain}/zh/guides/${guide.slug}/`,
      description: guide.excerpt.zh,
    })),
  };

  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListStructuredData) }}
        />

        <div className="mb-12 text-center">
          <h1 className="mb-4 text-h1 text-text-primary">AI API 指南</h1>
          <p className="mx-auto max-w-3xl text-body text-text-secondary">
            聚焦 API Key 开通、常见报错排查和供应商选型，帮助你更快落地可用方案。
          </p>
        </div>

        <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} lang="zh" />
          ))}
        </div>

        <Card variant="emphasis">
          <h2 className="mb-4 text-h3 text-text-primary">内容说明</h2>
          <p className="text-body-sm text-text-secondary">
            我们优先引用官方文档和实操步骤。每篇文章都包含核验时间与来源链接，方便你快速复核关键信息。
          </p>
        </Card>
      </main>
    </div>
  );
}
