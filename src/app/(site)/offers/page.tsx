import type { Metadata } from 'next';
import { getProvidersWithActiveOffers, getSiteConfig } from '@/lib/providers';
import OffersGrid from '@/components/providers/OffersGrid';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'API Key Offers - Get Model Key',
  description:
    'Browse providers with signup credits, free token quotas, and trial benefits. Jump directly to official API key pages.',
  alternates: {
    canonical: '/offers/',
    languages: {
      en: '/offers/',
      zh: '/zh/offers/',
      'x-default': '/offers/',
    },
  },
};

export default async function OffersPage() {
  const [providers, siteConfig] = await Promise.all([
    getProvidersWithActiveOffers(),
    getSiteConfig(),
  ]);

  const itemListStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Provider Offers and Free Credits',
    itemListElement: providers.map((provider, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: provider.name.en,
      url: `${siteConfig.domain}/providers/${provider.slug}/`,
      description: provider.offers?.[0]?.benefit?.en || provider.summary.en,
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
          <h1 className="mb-4 text-h1 text-text-primary">Provider Offers & Free Credits</h1>
          <p className="mx-auto max-w-3xl text-body text-text-secondary">
            A curated list of providers currently offering signup credits, token gifts, or free
            trial quotas.
          </p>
        </div>

        <Card variant="standard" className="mb-10">
          <p className="text-body-sm text-text-secondary">
            Offer terms can change at any time. Always confirm eligibility, amount, and validity
            on the provider&apos;s official page before use.
          </p>
        </Card>

        <OffersGrid providers={providers} lang="en" />

        <section className="mt-12 space-y-8">
          <Card variant="standard">
            <h2 className="mb-4 text-h3 text-text-primary">How We Curate This Page</h2>
            <div className="space-y-3 text-body-sm text-text-secondary">
              <p>
                We only list offers tied to providers already in our directory. Each item points to
                the provider&apos;s official API key or activity page.
              </p>
              <p>
                Offer values can change quickly. We record verification dates, but final eligibility,
                quota amounts, and validity windows always follow the provider&apos;s official terms.
              </p>
            </div>
          </Card>

          <Card variant="standard">
            <h2 className="mb-4 text-h3 text-text-primary">FAQ</h2>
            <div className="space-y-5">
              <div>
                <h3 className="mb-2 text-body font-semibold text-text-primary">
                  Are these offers guaranteed for all users?
                </h3>
                <p className="text-body-sm text-text-secondary">
                  Not always. Some offers require region eligibility, account age limits, or
                  real-name verification.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-body font-semibold text-text-primary">
                  Why do some offers mention estimated amounts?
                </h3>
                <p className="text-body-sm text-text-secondary">
                  Providers frequently adjust campaigns. We use practical summaries while linking to
                  the official source for exact terms.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-body font-semibold text-text-primary">
                  How often is this page updated?
                </h3>
                <p className="text-body-sm text-text-secondary">
                  We refresh provider offer data regularly. New changes are reflected through each
                  item&apos;s verification date.
                </p>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
