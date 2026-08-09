import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import PillButton from '@/components/ui/PillButton';
import PrimaryInverseButton from '@/components/ui/PrimaryInverseButton';
import ProviderLogo from '@/components/providers/ProviderLogo';
import ProviderContentSections from '@/components/providers/ProviderContentSections';
import OpenAIFrontierModels from '@/components/providers/OpenAIFrontierModels';
import GoogleGeminiModels from '@/components/providers/GoogleGeminiModels';
import DeepSeekV4Models from '@/components/providers/DeepSeekV4Models';
import ClaudeModelFamily from '@/components/providers/ClaudeModelFamily';
import { getActiveOffers, getAllProviders, getProviderBySlug, getSiteConfig } from '@/lib/providers';
import { getGuidesByProviderSlug } from '@/lib/guides';
import { getProviderMetadata, buildFaqStructuredData } from '@/lib/seo';
import { REGION_LABELS } from '@/lib/shared';
import { AdsterraBanner, AdsterraNative } from '@/components/ads/AdsterraAd';

type Props = {
  params: Promise<{ slug: string }>;
};

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
  const relatedGuides = await getGuidesByProviderSlug(provider.slug);
  const siteConfig = await getSiteConfig();

  const faqStructuredData = buildFaqStructuredData(provider.faq, 'en');

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteConfig.domain}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Providers',
        item: `${siteConfig.domain}/providers/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: provider.name.en,
        item: `${siteConfig.domain}/providers/${provider.slug}/`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        {faqStructuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />
        <div className="mb-8">
          <Link
            href="/providers/"
            className="inline-flex items-center gap-2 text-body-sm text-brand-300 transition-colors hover:text-brand-400"
          >
            <span aria-hidden="true">{'<'}</span>
            Back to Providers
          </Link>
        </div>

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="brand">{REGION_LABELS.en[provider.region]}</Badge>
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
                {provider.officialSiteUrlGlobal ? 'Official Website (China)' : 'Visit Website'}
              </PillButton>
            )}
            {provider.officialSiteUrlGlobal && (
              <PillButton href={provider.officialSiteUrlGlobal} newTab variant="ghost" size="lg" className="w-full">
                {provider.officialSiteUrl ? 'Official Website (Global)' : 'Visit Website'}
              </PillButton>
            )}
            {provider.officialDocsUrl && (
              <PillButton href={provider.officialDocsUrl} newTab variant="neutral" size="lg" className="w-full">
                View Docs
              </PillButton>
            )}
          </div>
        </div>

        <p className="mb-8 rounded-lg border border-white-06 bg-surface-1 px-4 py-3 text-body-sm text-text-tertiary">
          getModelKey links official API key pages only. We do not sell, generate, or broker API keys.
        </p>

        <AdsterraNative lang="en" className="mb-8" />

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <ProviderContentSections
              provider={provider}
              lang="en"
              include={['overview', 'howToGetKey']}
            />

            {provider.slug === 'openai' ? <OpenAIFrontierModels lang="en" compact /> : null}
            {provider.slug === 'google' ? <GoogleGeminiModels lang="en" compact /> : null}
            {provider.slug === 'deepseek' ? <DeepSeekV4Models lang="en" compact /> : null}
            {provider.slug === 'anthropic' ? <ClaudeModelFamily lang="en" compact /> : null}

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

            <ProviderContentSections provider={provider} lang="en" include={['faq']} />

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

            {relatedGuides.length > 0 && (
              <Card variant="standard">
                <h2 className="mb-4 text-h2 text-text-primary">Related Guides</h2>
                <div className="space-y-3">
                  {[...relatedGuides]
                    .sort((a, b) => (b.pillar ? 1 : 0) - (a.pillar ? 1 : 0))
                    .slice(0, 6)
                    .map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}/`}
                      className="block rounded-lg border border-white-06 bg-surface-1 px-4 py-3 transition-colors hover:bg-surface-2"
                    >
                      <div className="flex items-center gap-2">
                        <div className="text-body font-semibold text-text-primary">{guide.title.en}</div>
                        {guide.pillar && <Badge variant="brand" size="sm">Pillar</Badge>}
                      </div>
                      <div className="mt-1 text-body-sm text-text-secondary">{guide.excerpt.en}</div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4">
                  <Link
                    href="/guides/"
                    className="text-body-sm text-brand-300 transition-colors hover:text-brand-400"
                  >
                    View all guides →
                  </Link>
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
                  <div className="text-body text-text-primary">{REGION_LABELS.en[provider.region]}</div>
                </div>
                <div>
                  <div className="mb-1 text-body-sm text-text-tertiary">Status</div>
                  <Badge variant="success">active</Badge>
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
                    {provider.officialSiteUrlGlobal ? 'Official Website (China)' : 'Official Website'}
                  </a>
                )}
                {provider.officialSiteUrlGlobal && (
                  <a
                    href={provider.officialSiteUrlGlobal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-white-06 bg-surface-1 px-4 py-3 text-body text-text-primary transition-colors hover:bg-surface-2"
                  >
                    {provider.officialSiteUrl ? 'Official Website (Global)' : 'Official Website'}
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

            <AdsterraBanner size="160x600" lang="en" className="hidden lg:flex sticky top-24" />
          </div>
        </div>
      </main>
    </div>
  );
}
