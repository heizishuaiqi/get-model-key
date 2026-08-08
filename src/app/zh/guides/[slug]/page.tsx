import type { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { getPublishedGuides, getGuideBySlug, getClusterSiblings, getCrossClusterGuides, getPillarForGuide } from '@/lib/guides';
import { getProviderBySlug, getSiteConfig } from '@/lib/providers';
import { getGuideMetadata, buildFaqStructuredData } from '@/lib/seo';
import { TOPIC_LABELS } from '@/lib/shared';
import { renderParagraphWithLinks } from '@/lib/inline-links';
import AuthorByline from '@/components/layout/AuthorByline';
import { AdsterraBanner, AdsterraNative } from '@/components/ads/AdsterraAd';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return getGuideMetadata(slug, 'zh');
}

export async function generateStaticParams() {
  const guides = await getPublishedGuides();
  return guides.map((guide) => ({ slug: guide.slug }));
}

export default async function ZhGuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide || guide.status !== 'published') {
    notFound();
  }

  const [siteConfig, crossClusterGuides, relatedProviders, clusterSiblings, pillarGuide] = await Promise.all([
    getSiteConfig(),
    getCrossClusterGuides(guide.slug, 3),
    Promise.all(guide.providerSlugs.map((providerSlug) => getProviderBySlug(providerSlug))),
    getClusterSiblings(guide.slug, 4),
    getPillarForGuide(guide.slug),
  ]);

  const providers = relatedProviders.filter(
    (provider): provider is NonNullable<typeof provider> => Boolean(provider && provider.status === 'active')
  );

  const coverImageUrl = guide.coverImage?.zh ?? siteConfig.socialImage;

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title.zh,
    description: guide.excerpt.zh,
    image: coverImageUrl,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    inLanguage: 'zh-CN',
    mainEntityOfPage: `${siteConfig.domain}/zh/guides/${guide.slug}/`,
    author: siteConfig.author ? {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: `${siteConfig.domain}/zh/about/`,
      description: siteConfig.author.bio.zh,
      jobTitle: siteConfig.author.role.zh,
    } : {
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: siteConfig.domain,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: siteConfig.domain,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.domain}/android-chrome-512x512.png`,
      },
    },
  };

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
        name: '指南',
        item: `${siteConfig.domain}/zh/guides/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title.zh,
        item: `${siteConfig.domain}/zh/guides/${guide.slug}/`,
      },
    ],
  };

  const faqStructuredData = buildFaqStructuredData(guide.faq, 'zh');

  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />
        {faqStructuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
          />
        )}

        <div className="mb-8">
          <Link
            href="/zh/guides/"
            className="inline-flex items-center gap-2 text-body-sm text-brand-300 transition-colors hover:text-brand-400"
          >
            <span aria-hidden="true">{'<'}</span>
            返回指南列表
          </Link>
        </div>

        {/* 支柱页回链 — 垂直层级链接 */}
        {!guide.pillar && pillarGuide && (
          <div className="mb-8 rounded-xl border border-white-06 bg-surface-1 px-5 py-4">
            <span className="text-caption text-text-muted">本文属于： </span>
            <Link
              href={`/zh/guides/${pillarGuide.slug}/`}
              className="text-body-sm font-semibold text-brand-300 transition-colors hover:text-brand-400"
            >
              {pillarGuide.title.zh}
            </Link>
          </div>
        )}

        <article className="mx-auto max-w-4xl">
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="brand">{TOPIC_LABELS.zh[guide.topic]}</Badge>
              <span className="text-caption text-text-muted">{guide.readingMinutes} 分钟阅读</span>
              <span className="text-caption text-text-muted">发布于：{guide.publishedAt}</span>
              <span className="text-caption text-text-muted">更新于：{guide.updatedAt}</span>
            </div>
            <h1 className="mb-4 text-h1 text-text-primary">{guide.title.zh}</h1>
            <p className="mb-5 text-body text-text-secondary">{guide.excerpt.zh}</p>
            <AuthorByline
              author={siteConfig.author}
              lang="zh"
              publishedAt={guide.publishedAt}
              updatedAt={guide.updatedAt}
            />
          </header>

          <div className="space-y-8">
            {guide.sections.map((section, sectionIndex) => (
              <Fragment key={section.id}>
                <Card variant="standard">
                  <h2 className="mb-4 text-h3 text-text-primary">{section.heading.zh}</h2>
                  <div className="space-y-3">
                    {section.paragraphs.zh.map((paragraph, index) => (
                      <p key={`${section.id}-paragraph-${index}`} className="text-body text-text-secondary">
                        {renderParagraphWithLinks(paragraph, 'zh')}
                      </p>
                    ))}
                  </div>
                  {section.bullets?.zh && section.bullets.zh.length > 0 && (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-body-sm text-text-secondary">
                      {section.bullets.zh.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.codeBlocks && section.codeBlocks.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {section.codeBlocks.map((block, i) => (
                        <div key={i}>
                          <div className="flex items-center gap-2 rounded-t-lg border border-b-0 border-white-06 bg-surface-2 px-4 py-2">
                            <span className="text-caption font-mono text-text-muted">{block.language}</span>
                          </div>
                          <pre className="overflow-x-auto rounded-b-lg border border-white-06 bg-[#1a1d1b] p-4 text-body-sm leading-relaxed">
                            <code className="font-mono text-text-secondary">{block.code}</code>
                          </pre>
                          {block.caption?.zh && (
                            <p className="mt-1 text-caption text-text-muted">{block.caption.zh}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
                {sectionIndex === 0 ? <AdsterraNative lang="zh" /> : null}
              </Fragment>
            ))}
          </div>

          <AdsterraBanner size="300x250" lang="zh" className="mt-10" />

          {guide.faq && guide.faq.length > 0 && (
            <section className="mt-10">
              <Card variant="emphasis">
                <h2 className="mb-6 text-h3 text-text-primary">常见问题</h2>
                <div className="space-y-5">
                  {guide.faq.map((item) => (
                    <div key={item.question.zh}>
                      <h3 className="mb-2 text-body font-semibold text-text-primary">{item.question.zh}</h3>
                      <p className="text-body-sm text-text-secondary">{item.answer.zh}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </section>
          )}

          {clusterSiblings.length > 0 && (
            <section className="mt-10">
              <Card variant="emphasis">
                <h2 className="mb-4 text-h3 text-text-primary">
                  {guide.pillar ? '本系列指南' : '本系列相关'}
                </h2>
                <div className="space-y-3">
                  {clusterSiblings.map((item, index) => (
                    <Link
                      key={item.slug}
                      href={`/zh/guides/${item.slug}/`}
                      className="block rounded-lg border border-white-06 bg-surface-1 px-4 py-3 transition-colors hover:bg-surface-2"
                    >
                      <div className="flex items-center gap-2">
                        {item.pillar && (
                          <Badge variant="success" size="sm">支柱页</Badge>
                        )}
                        {/* 多样化锚文本：支柱页用标题，其他用摘要首句 */}
                        <div className="text-body font-semibold text-text-primary">
                          {item.pillar ? item.title.zh : item.excerpt.zh.split('。')[0]}
                        </div>
                      </div>
                      <div className="mt-1 text-body-sm text-text-secondary">
                        {index + 1}. {item.title.zh}
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </section>
          )}

          <section className="mt-10 grid gap-8 lg:grid-cols-2">
            <Card variant="standard">
              <h2 className="mb-4 text-h3 text-text-primary">相关供应商</h2>
              <div className="flex flex-wrap gap-2">
                {providers.length === 0 && (
                  <span className="text-body-sm text-text-tertiary">暂未关联供应商。</span>
                )}
                {providers.map((provider) => (
                  <Link
                    key={provider.slug}
                    href={`/zh/providers/${provider.slug}`}
                    className="inline-flex items-center rounded-full border border-white-06 bg-white-04 px-3 py-1.5 text-body-sm text-text-secondary transition-colors hover:border-white-08 hover:text-text-primary"
                  >
                    {provider.name.zh}
                  </Link>
                ))}
              </div>
            </Card>

            <Card variant="standard">
              <h2 className="mb-4 text-h3 text-text-primary">参考来源</h2>
              <ul className="space-y-3">
                {guide.sources.map((source) => (
                  <li key={source.url} className="text-body-sm text-text-secondary">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-300 transition-colors hover:text-brand-400"
                    >
                      {source.label}
                    </a>
                    <span className="ml-2 text-caption text-text-muted">
                      {source.site} · 核验日期 {source.checkedAt}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          {crossClusterGuides.length > 0 && (
            <section className="mt-10">
              <Card variant="standard">
                <h2 className="mb-4 text-h3 text-text-primary">浏览其他主题</h2>
                <div className="space-y-3">
                  {crossClusterGuides.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/zh/guides/${item.slug}/`}
                      className="block rounded-lg border border-white-06 bg-surface-1 px-4 py-3 transition-colors hover:bg-surface-2"
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant="neutral" size="sm">{TOPIC_LABELS.zh[item.topic]}</Badge>
                        <div className="text-body font-semibold text-text-primary">{item.title.zh}</div>
                      </div>
                      <div className="mt-1 text-body-sm text-text-secondary">{item.excerpt.zh}</div>
                    </Link>
                  ))}
                </div>
              </Card>
            </section>
          )}
        </article>
      </main>
    </div>
  );
}
