import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import PillButton from '@/components/ui/PillButton';
import PrimaryInverseButton from '@/components/ui/PrimaryInverseButton';
import ProviderLogo from '@/components/providers/ProviderLogo';
import ProviderContentSections from '@/components/providers/ProviderContentSections';
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

  const activeOffers = getActiveOffers(provider);
  const relatedGuides = await getGuidesByProviderSlug(provider.slug);
  const siteConfig = await getSiteConfig();

  const faqStructuredData = buildFaqStructuredData(provider.faq, 'zh');

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首页',
        item: `${siteConfig.domain}/zh/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '供应商',
        item: `${siteConfig.domain}/zh/providers/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: provider.name.zh,
        item: `${siteConfig.domain}/zh/providers/${provider.slug}/`,
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
            href="/zh/providers"
            className="inline-flex items-center gap-2 text-body-sm text-brand-300 transition-colors hover:text-brand-400"
          >
            <span aria-hidden="true">{'<'}</span>
            {'返回供应商列表'}
          </Link>
        </div>

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="brand">{REGION_LABELS.zh[provider.region]}</Badge>
              {provider.featured && <Badge variant="success">{'精选'}</Badge>}
              {provider.categories.map((category) => (
                <Badge key={category} variant="neutral" size="sm">
                  {category}
                </Badge>
              ))}
            </div>
            <div className="mb-4 flex items-center gap-3">
              <ProviderLogo provider={provider} lang="zh" size="lg" />
              <h1 className="text-h1 text-text-primary">{provider.name.zh}</h1>
            </div>
            <p className="text-body text-text-secondary">{provider.summary.zh}</p>
          </div>

          <div className="flex w-full max-w-sm flex-col gap-3">
            <PrimaryInverseButton href={provider.officialKeyUrl} newTab className="w-full">
              {'获取 API Key'}
            </PrimaryInverseButton>
            {provider.officialSiteUrl && (
              <PillButton href={provider.officialSiteUrl} newTab variant="ghost" size="lg" className="w-full">
                {provider.officialSiteUrlGlobal ? '官网（中国站）' : '访问官网'}
              </PillButton>
            )}
            {provider.officialSiteUrlGlobal && (
              <PillButton href={provider.officialSiteUrlGlobal} newTab variant="ghost" size="lg" className="w-full">
                {provider.officialSiteUrl ? '官网（国际站）' : '访问官网'}
              </PillButton>
            )}
            {provider.officialDocsUrl && (
              <PillButton href={provider.officialDocsUrl} newTab variant="neutral" size="lg" className="w-full">
                {'查看文档'}
              </PillButton>
            )}
          </div>
        </div>

        <p className="mb-8 rounded-lg border border-white-06 bg-surface-1 px-4 py-3 text-body-sm text-text-tertiary">
          getModelKey 仅链接官方 API Key 页面，不出售、不代开、不中转 API Key。
        </p>

        <AdsterraNative lang="zh" className="mb-8" />

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <ProviderContentSections
              provider={provider}
              lang="zh"
              include={['overview', 'howToGetKey']}
            />

            <Card variant="emphasis">
              <h2 className="mb-4 text-h2 text-text-primary">{'常用模型'}</h2>
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

            {activeOffers.length > 0 && (
              <Card variant="standard">
                <h2 className="mb-4 text-h2 text-text-primary">{'当前福利'}</h2>
                <div className="space-y-4">
                  {activeOffers.map((offer) => (
                    <div key={offer.id} className="rounded-xl border border-white-06 bg-surface-1 p-4">
                      <h3 className="mb-2 text-body font-semibold text-text-primary">
                        {offer.title.zh}
                      </h3>
                      <p className="mb-2 text-body-sm text-text-secondary">{offer.benefit.zh}</p>
                      {offer.notes?.zh && (
                        <p className="mb-2 text-caption text-text-tertiary">{offer.notes.zh}</p>
                      )}
                      <div className="flex flex-wrap gap-3 text-caption text-text-muted">
                        <span>{'核验时间'}: {offer.verifiedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <ProviderContentSections provider={provider} lang="zh" include={['faq']} />

            {provider.tags.length > 0 && (
              <Card variant="standard">
                <h2 className="mb-4 text-h2 text-text-primary">{'标签'}</h2>
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
                <h2 className="mb-4 text-h2 text-text-primary">{'相关指南'}</h2>
                <div className="space-y-3">
                  {[...relatedGuides]
                    .sort((a, b) => (b.pillar ? 1 : 0) - (a.pillar ? 1 : 0))
                    .slice(0, 6)
                    .map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/zh/guides/${guide.slug}`}
                      className="block rounded-lg border border-white-06 bg-surface-1 px-4 py-3 transition-colors hover:bg-surface-2"
                    >
                      <div className="flex items-center gap-2">
                        <div className="text-body font-semibold text-text-primary">{guide.title.zh}</div>
                        {guide.pillar && <Badge variant="brand" size="sm">{'支柱页'}</Badge>}
                      </div>
                      <div className="mt-1 text-body-sm text-text-secondary">{guide.excerpt.zh}</div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4">
                  <Link
                    href="/zh/guides"
                    className="text-body-sm text-brand-300 transition-colors hover:text-brand-400"
                  >
                    {'查看全部指南 →'}
                  </Link>
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-8">
            <Card variant="standard">
              <h2 className="mb-4 text-h3 text-text-primary">{'快速信息'}</h2>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 text-body-sm text-text-tertiary">{'区域'}</div>
                  <div className="text-body text-text-primary">{REGION_LABELS.zh[provider.region]}</div>
                </div>
                <div>
                  <div className="mb-1 text-body-sm text-text-tertiary">状态</div>
                  <Badge variant="success">active</Badge>
                </div>
                {provider.lastVerified && (
                  <div>
                    <div className="mb-1 text-body-sm text-text-tertiary">{'最后校验'}</div>
                    <div className="text-body text-text-primary">{provider.lastVerified}</div>
                  </div>
                )}
              </div>
            </Card>

            <Card variant="standard">
              <h2 className="mb-4 text-h3 text-text-primary">{'官方链接'}</h2>
              <div className="space-y-3">
                <a
                  href={provider.officialKeyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-white-06 bg-surface-1 px-4 py-3 text-body text-text-primary transition-colors hover:bg-surface-2"
                >
                  {'API Key 页面'}
                </a>
                {provider.officialSiteUrl && (
                  <a
                    href={provider.officialSiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-white-06 bg-surface-1 px-4 py-3 text-body text-text-primary transition-colors hover:bg-surface-2"
                  >
                    {provider.officialSiteUrlGlobal ? '官网（中国站）' : '官网'}
                  </a>
                )}
                {provider.officialSiteUrlGlobal && (
                  <a
                    href={provider.officialSiteUrlGlobal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-white-06 bg-surface-1 px-4 py-3 text-body text-text-primary transition-colors hover:bg-surface-2"
                  >
                    {provider.officialSiteUrl ? '官网（国际站）' : '官网'}
                  </a>
                )}
                {provider.officialDocsUrl && (
                  <a
                    href={provider.officialDocsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-white-06 bg-surface-1 px-4 py-3 text-body text-text-primary transition-colors hover:bg-surface-2"
                  >
                    {'文档'}
                  </a>
                )}
              </div>
            </Card>

            <AdsterraBanner size="160x600" lang="zh" className="hidden lg:flex sticky top-24" />
          </div>
        </div>
      </main>
    </div>
  );
}
