import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import PillButton from '@/components/ui/PillButton';
import PrimaryInverseButton from '@/components/ui/PrimaryInverseButton';
import ProviderLogo from '@/components/providers/ProviderLogo';
import { getActiveOffers, getAllProviders, getProviderBySlug } from '@/lib/providers';
import { getProviderMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

const regionLabels = {
  global: 'Global',
  china: 'China',
  aggregator: 'Aggregator',
  cloud: 'Cloud',
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return getProviderMetadata(slug, 'en');
}

export async function generateStaticParams() {
  const providers = await getAllProviders();
  return providers.map((provider) => ({ slug: provider.slug }));
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);

  if (!provider || provider.status !== 'active') {
    notFound();
  }

  const activeOffers = getActiveOffers(provider);

  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        <div className="mb-8">
          <Link
            href="/providers"
            className="inline-flex items-center gap-2 text-body-sm text-brand-300 transition-colors hover:text-brand-400"
          >
            <span aria-hidden="true">{'<'}</span>
            Back to Providers
          </Link>
</div>

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="brand">{regionLabels[provider.region]}</Badge>
              {provider.featured && <Badge variant="success">Featured</Badge>}
              {provider.categories.map((category) => (
                <Badge key={category} variant="neutral" size="sm">
                  {category}
                </Badge>
              ))}
            </div>
            <div className="mb-4 flex items-center gap-3">
              <ProviderLogo provider={provider} lang="en" size="lg" />
              <h1 className="text-h1 text-text-primary">{provider.name.en}</h1>
            </div>
            <p className="text-body text-text-secondary">{provider.summary.en}</p>
          </div>

          <div className="flex w-full max-w-sm flex-col gap-3">
            <PrimaryInverseButton href={provider.officialKeyUrl} newTab className="w-full">
              Get API Key
            </PrimaryInverseButton>
            {provider.officialSiteUrl && (
              <PillButton href={provider.officialSiteUrl} newTab variant="ghost" size="lg" className="w-full">
                Visit Website
              </PillButton>
            )}
            {provider.officialDocsUrl && (
              <PillButton href={provider.officialDocsUrl} newTab variant="neutral" size="lg" className="w-full">
                View Docs
              </PillButton>
            )}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <Card variant="emphasis">
              <h2 className="mb-4 text-h2 text-text-primary">Common Models</h2>
              <div className="flex flex-wrap gap-3">
                {provider.models.en.map((model) => (
                  <span
                    key={model}
                    className="inline-flex items-center rounded-md border border-brand-300/20 bg-surface-green px-3 py-1.5 text-sm font-medium text-brand-300"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </Card>

            {activeOffers.length > 0 && (
              <Card variant="standard">
                <h2 className="mb-4 text-h2 text-text-primary">Current Offers</h2>
                <div className="space-y-4">
                  {activeOffers.map((offer) => (
                    <div key={offer.id} className="rounded-xl border border-white-06 bg-surface-1 p-4">
                      <h3 className="mb-2 text-body font-semibold text-text-primary">
                        {offer.title.en}
                      </h3>
                      <p className="mb-2 text-body-sm text-text-secondary">{offer.benefit.en}</p>
                      {offer.notes?.en && (
                        <p className="mb-2 text-caption text-text-tertiary">{offer.notes.en}</p>
                      )}
                      <div className="flex flex-wrap gap-3 text-caption text-text-muted">
                        <span>Verified: {offer.verifiedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {provider.tags.length > 0 && (
              <Card variant="standard">
                <h2 className="mb-4 text-h2 text-text-primary">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {provider.tags.map((tag) => (
                    <Badge key={tag} variant="neutral">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-8">
            <Card variant="standard">
              <h2 className="mb-4 text-h3 text-text-primary">Quick Info</h2>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 text-body-sm text-text-tertiary">Region</div>
                  <div className="text-body text-text-primary">{regionLabels[provider.region]}</div>
                </div>
                <div>
                  <div className="mb-1 text-body-sm text-text-tertiary">Status</div>
                  <Badge variant={provider.status === 'active' ? 'success' : 'danger'}>
                    {provider.status}
                  </Badge>
                </div>
                {provider.lastVerified && (
                  <div>
                    <div className="mb-1 text-body-sm text-text-tertiary">Last Verified</div>
                    <div className="text-body text-text-primary">{provider.lastVerified}</div>
                  </div>
                )}
              </div>
            </Card>

            <Card variant="standard">
              <h2 className="mb-4 text-h3 text-text-primary">Official Links</h2>
              <div className="space-y-3">
                <a
                  href={provider.officialKeyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-white-06 bg-surface-1 px-4 py-3 text-body text-text-primary transition-colors hover:bg-surface-2"
                >
                  API Key Page
                </a>
                {provider.officialSiteUrl && (
                  <a
                    href={provider.officialSiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-white-06 bg-surface-1 px-4 py-3 text-body text-text-primary transition-colors hover:bg-surface-2"
                  >
                    Official Website
                  </a>
                )}
                {provider.officialDocsUrl && (
                  <a
                    href={provider.officialDocsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-white-06 bg-surface-1 px-4 py-3 text-body text-text-primary transition-colors hover:bg-surface-2"
                  >
                    Documentation
                  </a>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
