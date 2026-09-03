import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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
import OpenAIFrontierModels from '@/components/providers/OpenAIFrontierModels';
import GoogleGeminiModels from '@/components/providers/GoogleGeminiModels';
import DeepSeekV4Models from '@/components/providers/DeepSeekV4Models';
import ClaudeModelFamily from '@/components/providers/ClaudeModelFamily';
import { GuideCtaBlock, GuideTableBlock, GuideTableOfContents } from '@/components/guides/GuideArticleExtras';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return getGuideMetadata(slug, 'en');
}

export async function generateStaticParams() {
  const guides = await getPublishedGuides();
  return guides.map((guide) => ({ slug: guide.slug }));
}

export default async function GuideDetailPage({ params }: Props) {
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

  const coverImageUrl = guide.coverImage?.en
    ? new URL(guide.coverImage.en, siteConfig.domain).toString()
    : siteConfig.socialImage;

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title.en,
    description: guide.excerpt.en,
    image: coverImageUrl,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    inLanguage: 'en',
    mainEntityOfPage: `${siteConfig.domain}/guides/${guide.slug}/`,
    author: siteConfig.author ? {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: `${siteConfig.domain}/about/`,
      description: siteConfig.author.bio.en,
      jobTitle: siteConfig.author.role.en,
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
        name: 'Home',
        item: `${siteConfig.domain}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: `${siteConfig.domain}/guides/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title.en,
        item: `${siteConfig.domain}/guides/${guide.slug}/`,
      },
    ],
  };

  const faqStructuredData = buildFaqStructuredData(guide.faq, 'en');

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
            href="/guides/"
            className="inline-flex items-center gap-2 text-body-sm text-brand-300 transition-colors hover:text-brand-400"
          >
            <span aria-hidden="true">{'<'}</span>
            Back to Guides
          </Link>
        </div>

        {/* Pillar page backlink — vertical hierarchy link */}
        {!guide.pillar && pillarGuide && (
          <div className="mb-8 rounded-xl border border-white-06 bg-surface-1 px-5 py-4">
            <span className="text-caption text-text-muted">This article is part of: </span>
            <Link
              href={`/guides/${pillarGuide.slug}/`}
              className="text-body-sm font-semibold text-brand-300 transition-colors hover:text-brand-400"
            >
              {pillarGuide.title.en}
            </Link>
          </div>
        )}

        <article className="mx-auto max-w-4xl">
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="brand">{TOPIC_LABELS.en[guide.topic]}</Badge>
              <span className="text-caption text-text-muted">{guide.readingMinutes} min read</span>
              <span className="text-caption text-text-muted">Published: {guide.publishedAt}</span>
              <span className="text-caption text-text-muted">Updated: {guide.updatedAt}</span>
            </div>
            <h1 className="mb-4 text-h1 text-text-primary">{guide.title.en}</h1>
            <p className="mb-5 text-body text-text-secondary">{guide.excerpt.en}</p>
            <AuthorByline
              author={siteConfig.author}
              lang="en"
              publishedAt={guide.publishedAt}
              updatedAt={guide.updatedAt}
            />
          </header>

          {guide.primaryCta ? (
            <div className="mb-8">
              <GuideCtaBlock cta={guide.primaryCta} lang="en" />
            </div>
          ) : null}

          {guide.coverImage?.en ? (
            <figure className="mb-8 overflow-hidden rounded-2xl border border-white-06 bg-surface-1">
              <Image
                src={guide.coverImage.en}
                alt={guide.coverImageAlt?.en ?? guide.title.en}
                width={1200}
                height={675}
                sizes="(max-width: 896px) 100vw, 896px"
                className="h-auto w-full"
                priority
              />
            </figure>
          ) : null}

          <GuideTableOfContents sections={guide.sections} lang="en" />

          {guide.slug === 'openai-api-pricing' ? (
            <div className="mb-8">
              <OpenAIFrontierModels lang="en" />
            </div>
          ) : null}
          {guide.slug === 'google-gemini-api-pricing' ? (
            <div className="mb-8">
              <GoogleGeminiModels lang="en" />
            </div>
          ) : null}
          {guide.slug === 'deepseek-v4-models-pricing' ? (
            <div className="mb-8">
              <DeepSeekV4Models lang="en" />
            </div>
          ) : null}
          {guide.slug === 'claude-models-api-pricing' ? (
            <div className="mb-8">
              <ClaudeModelFamily lang="en" />
            </div>
          ) : null}

          <div className="space-y-8">
            {guide.sections.map((section, sectionIndex) => (
              <Fragment key={section.id}>
                <Card variant="standard">
                  <h2 id={section.id} className="scroll-mt-24 mb-4 text-h3 text-text-primary">{section.heading.en}</h2>
                  <div className="space-y-3">
                    {section.paragraphs.en.map((paragraph, index) => (
                      <p key={`${section.id}-paragraph-${index}`} className="text-body text-text-secondary">
                        {renderParagraphWithLinks(paragraph, 'en')}
                      </p>
                    ))}
                  </div>
                  {section.bullets?.en && section.bullets.en.length > 0 && (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-body-sm text-text-secondary">
                      {section.bullets.en.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.table ? <GuideTableBlock table={section.table} lang="en" /> : null}
                  {section.cta ? (
                    <div className="mt-5">
                      <GuideCtaBlock cta={section.cta} lang="en" />
                    </div>
                  ) : null}
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
                          {block.caption?.en && (
                            <p className="mt-1 text-caption text-text-muted">{block.caption.en}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
                {sectionIndex === 0 ? <AdsterraNative lang="en" /> : null}
              </Fragment>
            ))}
          </div>

          <AdsterraBanner size="300x250" lang="en" className="mt-10" />

          {guide.faq && guide.faq.length > 0 && (
            <section className="mt-10">
              <Card variant="emphasis">
                <h2 className="mb-6 text-h3 text-text-primary">FAQ</h2>
                <div className="space-y-5">
                  {guide.faq.map((item) => (
                    <div key={item.question.en}>
                      <h3 className="mb-2 text-body font-semibold text-text-primary">{item.question.en}</h3>
                      <p className="text-body-sm text-text-secondary">{item.answer.en}</p>
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
                  {guide.pillar ? 'In This Guide Series' : 'Related in This Series'}
                </h2>
                <div className="space-y-3">
                  {clusterSiblings.map((item, index) => (
                    <Link
                      key={item.slug}
                      href={`/guides/${item.slug}/`}
                      className="block rounded-lg border border-white-06 bg-surface-1 px-4 py-3 transition-colors hover:bg-surface-2"
                    >
                      <div className="flex items-center gap-2">
                        {item.pillar && (
                          <Badge variant="success" size="sm">Pillar</Badge>
                        )}
                        {/* Diversified anchor text: pillar uses title, others use excerpt snippet */}
                        <div className="text-body font-semibold text-text-primary">
                          {item.pillar ? item.title.en : item.excerpt.en.split('.')[0]}
                        </div>
                      </div>
                      <div className="mt-1 text-body-sm text-text-secondary">
                        {index + 1}. {item.title.en}
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </section>
          )}

          <section className="mt-10 grid gap-8 lg:grid-cols-2">
            <Card variant="standard">
              <h2 className="mb-4 text-h3 text-text-primary">Related Providers</h2>
              <div className="flex flex-wrap gap-2">
                {providers.length === 0 && (
                  <span className="text-body-sm text-text-tertiary">No provider links yet.</span>
                )}
                {providers.map((provider) => (
                  <Link
                    key={provider.slug}
                    href={`/providers/${provider.slug}`}
                    className="inline-flex items-center rounded-full border border-white-06 bg-white-04 px-3 py-1.5 text-body-sm text-text-secondary transition-colors hover:border-white-08 hover:text-text-primary"
                  >
                    {provider.name.en}
                  </Link>
                ))}
              </div>
            </Card>

            <Card variant="standard">
              <h2 className="mb-4 text-h3 text-text-primary">Sources</h2>
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
                      {source.site} · Checked {source.checkedAt}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          {crossClusterGuides.length > 0 && (
            <section className="mt-10">
              <Card variant="standard">
                <h2 className="mb-4 text-h3 text-text-primary">Explore Other Topics</h2>
                <div className="space-y-3">
                  {crossClusterGuides.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/guides/${item.slug}/`}
                      className="block rounded-lg border border-white-06 bg-surface-1 px-4 py-3 transition-colors hover:bg-surface-2"
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant="neutral" size="sm">{TOPIC_LABELS.en[item.topic]}</Badge>
                        <div className="text-body font-semibold text-text-primary">{item.title.en}</div>
                      </div>
                      <div className="mt-1 text-body-sm text-text-secondary">{item.excerpt.en}</div>
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
