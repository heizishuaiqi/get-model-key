import type { Metadata } from 'next';
import Link from 'next/link';
import GuideCard from '@/components/guides/GuideCard';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { getPublishedGuides, getGuidesGroupedByCluster, CLUSTER_LABELS } from '@/lib/guides';
import { getGuidesIndexMetadata } from '@/lib/seo';
import { getSiteConfig } from '@/lib/providers';

export async function generateMetadata(): Promise<Metadata> {
  return getGuidesIndexMetadata('zh');
}

export default async function ZhGuidesPage() {
  const [guides, siteConfig, clusterGroups] = await Promise.all([
    getPublishedGuides(),
    getSiteConfig(),
    getGuidesGroupedByCluster(),
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

        {/* 按集群分组 — 支柱页 + 集群文章 */}
        <div className="mb-12 space-y-12">
          {clusterGroups.map(({ cluster, pillar, articles }) => (
            <section key={cluster}>
              <div className="mb-6 flex items-center gap-3">
                <h2 className="text-h2 text-text-primary">
                  {CLUSTER_LABELS[cluster]?.zh ?? cluster}
                </h2>
                <span className="text-caption text-text-muted">
                  {articles.length + (pillar ? 1 : 0)} 篇指南
                </span>
              </div>

              {/* 支柱页 — 优先展示 */}
              {pillar && (
                <div className="mb-4">
                  <Card variant="emphasis" hover className="group relative overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
                    <Link
                      href={`/zh/guides/${pillar.slug}/`}
                      aria-label={`阅读支柱指南：${pillar.title.zh}`}
                      className="absolute inset-0 z-10 rounded-2xl"
                    />
                    <div className="pointer-events-none relative z-20 flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="success">支柱指南</Badge>
                        <span className="text-caption text-text-muted">
                          {pillar.readingMinutes} 分钟阅读
                        </span>
                      </div>
                      <h3 className="text-h3 text-text-primary">{pillar.title.zh}</h3>
                      <p className="text-body-sm text-text-secondary">{pillar.excerpt.zh}</p>
                    </div>
                  </Card>
                </div>
              )}

              {/* 集群文章 */}
              {articles.length > 0 && (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {articles.map((guide) => (
                    <GuideCard key={guide.slug} guide={guide} lang="zh" />
                  ))}
                </div>
              )}
            </section>
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
