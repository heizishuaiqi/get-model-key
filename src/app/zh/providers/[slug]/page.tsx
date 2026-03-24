import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import PillButton from '@/components/ui/PillButton';
import PrimaryInverseButton from '@/components/ui/PrimaryInverseButton';
import { getAllProviders, getProviderBySlug } from '@/lib/providers';
import { getProviderMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

const regionLabels = {
  global: '\u56fd\u9645',
  china: '\u4e2d\u56fd',
  aggregator: '\u805a\u5408\u5e73\u53f0',
  cloud: '\u4e91\u5e73\u53f0',
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return getProviderMetadata(slug, 'zh');
}

export async function generateStaticParams() {
  const providers = await getAllProviders();
  return providers.map((provider) => ({ slug: provider.slug }));
}

export default async function ZhProviderPage({ params }: Props) {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);

  if (!provider || provider.status !== 'active') {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        <div className="mb-8">
          <Link
            href="/zh/providers"
            className="inline-flex items-center gap-2 text-body-sm text-brand-300 transition-colors hover:text-brand-400"
          >
            <span aria-hidden="true">{'<'}</span>
            {'\u8fd4\u56de\u4f9b\u5e94\u5546\u5217\u8868'}
          </Link>
        </div>

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="brand">{regionLabels[provider.region]}</Badge>
              {provider.featured && <Badge variant="success">{'\u7cbe\u9009'}</Badge>}
              {provider.categories.map((category) => (
                <Badge key={category} variant="neutral" size="sm">
                  {category}
                </Badge>
              ))}
            </div>
            <h1 className="mb-4 text-h1 text-text-primary">{provider.name.zh}</h1>
            <p className="text-body text-text-secondary">{provider.summary.zh}</p>
          </div>

          <div className="flex w-full max-w-sm flex-col gap-3">
            <PrimaryInverseButton href={provider.officialKeyUrl} className="w-full">
              {'\u83b7\u53d6 API Key'}
            </PrimaryInverseButton>
            {provider.officialSiteUrl && (
              <PillButton href={provider.officialSiteUrl} variant="ghost" size="lg" className="w-full">
                {'\u8bbf\u95ee\u5b98\u7f51'}
              </PillButton>
            )}
            {provider.officialDocsUrl && (
              <PillButton href={provider.officialDocsUrl} variant="neutral" size="lg" className="w-full">
                {'\u67e5\u770b\u6587\u6863'}
              </PillButton>
            )}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <Card variant="emphasis">
              <h2 className="mb-4 text-h2 text-text-primary">{'\u5e38\u7528\u6a21\u578b'}</h2>
              <div className="flex flex-wrap gap-3">
                {provider.models.zh.map((model) => (
                  <span
                    key={model}
                    className="inline-flex items-center rounded-md border border-brand-300/20 bg-surface-green px-3 py-1.5 text-sm font-medium text-brand-300"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </Card>

            {provider.tags.length > 0 && (
              <Card variant="standard">
                <h2 className="mb-4 text-h2 text-text-primary">{'\u6807\u7b7e'}</h2>
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
              <h2 className="mb-4 text-h3 text-text-primary">{'\u5feb\u901f\u4fe1\u606f'}</h2>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 text-body-sm text-text-tertiary">{'\u533a\u57df'}</div>
                  <div className="text-body text-text-primary">{regionLabels[provider.region]}</div>
                </div>
                <div>
                  <div className="mb-1 text-body-sm text-text-tertiary">{'\u72b6\u6001'}</div>
                  <Badge variant={provider.status === 'active' ? 'success' : 'danger'}>
                    {provider.status}
                  </Badge>
                </div>
                {provider.lastVerified && (
                  <div>
                    <div className="mb-1 text-body-sm text-text-tertiary">{'\u6700\u540e\u6821\u9a8c'}</div>
                    <div className="text-body text-text-primary">{provider.lastVerified}</div>
                  </div>
                )}
              </div>
            </Card>

            <Card variant="standard">
              <h2 className="mb-4 text-h3 text-text-primary">{'\u5b98\u65b9\u94fe\u63a5'}</h2>
              <div className="space-y-3">
                <a
                  href={provider.officialKeyUrl}
                  className="block rounded-lg border border-white-06 bg-surface-1 px-4 py-3 text-body text-text-primary transition-colors hover:bg-surface-2"
                >
                  {'API Key \u9875\u9762'}
                </a>
                {provider.officialSiteUrl && (
                  <a
                    href={provider.officialSiteUrl}
                    className="block rounded-lg border border-white-06 bg-surface-1 px-4 py-3 text-body text-text-primary transition-colors hover:bg-surface-2"
                  >
                    {'\u5b98\u7f51'}
                  </a>
                )}
                {provider.officialDocsUrl && (
                  <a
                    href={provider.officialDocsUrl}
                    className="block rounded-lg border border-white-06 bg-surface-1 px-4 py-3 text-body text-text-primary transition-colors hover:bg-surface-2"
                  >
                    {'\u6587\u6863'}
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
