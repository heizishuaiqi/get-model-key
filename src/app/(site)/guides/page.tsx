import type { Metadata } from 'next';
import GuideCard from '@/components/guides/GuideCard';
import Card from '@/components/ui/Card';
import { getPublishedGuides } from '@/lib/guides';
import { getGuidesIndexMetadata } from '@/lib/seo';
import { getSiteConfig } from '@/lib/providers';

export async function generateMetadata(): Promise<Metadata> {
  return getGuidesIndexMetadata('en');
}

export default async function GuidesPage() {
  const [guides, siteConfig] = await Promise.all([
    getPublishedGuides(),
    getSiteConfig(),
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

        <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} lang="en" />
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
