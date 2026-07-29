import type { Metadata } from 'next';
import Link from 'next/link';
import GuideCard from '@/components/guides/GuideCard';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { getPublishedGuides, getGuidesGroupedByCluster, CLUSTER_LABELS } from '@/lib/guides';
import { getGuidesIndexMetadata } from '@/lib/seo';
import { getSiteConfig } from '@/lib/providers';

export async function generateMetadata(): Promise<Metadata> {
  return getGuidesIndexMetadata('en');
}

export default async function GuidesPage() {
  const [guides, siteConfig, clusterGroups] = await Promise.all([
    getPublishedGuides(),
    getSiteConfig(),
    getGuidesGroupedByCluster(),
  ]);

  const itemListStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI API Guides',
    itemListElement: guides.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: guide.title.en,
      url: `${siteConfig.domain}/guides/${guide.slug}/`,
      description: guide.excerpt.en,
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
          <h1 className="mb-4 text-h1 text-text-primary">AI API Guides</h1>
          <p className="mx-auto max-w-3xl text-body text-text-secondary">
            Step-by-step articles for API key setup, troubleshooting common errors, and provider
            selection decisions.
          </p>
        </div>

        {/* Guides grouped by cluster — pillar + cluster articles */}
        <div className="mb-12 space-y-12">
          {clusterGroups.map(({ cluster, pillar, articles }) => (
            <section key={cluster}>
              <div className="mb-6 flex items-center gap-3">
                <h2 className="text-h2 text-text-primary">
                  {CLUSTER_LABELS[cluster]?.en ?? cluster}
                </h2>
                <span className="text-caption text-text-muted">
                  {articles.length + (pillar ? 1 : 0)} {articles.length + (pillar ? 1 : 0) === 1 ? 'guide' : 'guides'}
                </span>
              </div>

              {/* Pillar page — displayed prominently first */}
              {pillar && (
                <div className="mb-4">
                  <Card variant="emphasis" hover className="group relative overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
                    <Link
                      href={`/guides/${pillar.slug}/`}
                      aria-label={`Read pillar guide: ${pillar.title.en}`}
                      className="absolute inset-0 z-10 rounded-2xl"
                    />
                    <div className="pointer-events-none relative z-20 flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="success">Pillar Guide</Badge>
                        <span className="text-caption text-text-muted">
                          {pillar.readingMinutes} min read
                        </span>
                      </div>
                      <h3 className="text-h3 text-text-primary">{pillar.title.en}</h3>
                      <p className="text-body-sm text-text-secondary">{pillar.excerpt.en}</p>
                    </div>
                  </Card>
                </div>
              )}

              {/* Cluster articles */}
              {articles.length > 0 && (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {articles.map((guide) => (
                    <GuideCard key={guide.slug} guide={guide} lang="en" />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <Card variant="emphasis">
          <h2 className="mb-4 text-h3 text-text-primary">Editorial Policy</h2>
          <p className="text-body-sm text-text-secondary">
            We prioritize official documentation and practical implementation details. Every guide
            includes a checked date and source links so you can verify technical details quickly.
          </p>
        </Card>
      </main>
    </div>
  );
}
