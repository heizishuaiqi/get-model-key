import type { Metadata } from 'next';
import { getProvidersWithActiveOffers, getSiteConfig } from '@/lib/providers';
import { buildFaqStructuredData } from '@/lib/seo';
import OffersGrid from '@/components/providers/OffersGrid';
import Card from '@/components/ui/Card';

const OFFERS_FAQ = [
  {
    question: { en: 'Are these offers guaranteed for all users?', zh: '这些福利每个用户都能拿到吗？' },
    answer: { en: 'Not always. Some offers require region eligibility, account age limits, or real-name verification.', zh: '不一定。部分活动会限制地区、账号条件，或要求完成实名后才能领取。' },
  },
  {
    question: { en: 'Why do some offers mention estimated amounts?', zh: '为什么有些福利写的是"约"多少？' },
    answer: { en: 'Providers frequently adjust campaigns. We use practical summaries while linking to the official source for exact terms.', zh: '平台活动经常调整，我们会提供清晰摘要，同时保留官方入口，方便你核对实时条款。' },
  },
  {
    question: { en: 'How often is this page updated?', zh: '这页多久更新一次？' },
    answer: { en: 'We refresh provider offer data regularly. New changes are reflected through each item\'s verification date.', zh: '我们会持续维护福利数据，具体更新可参考每条福利中的核验日期。' },
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  const title = 'API Key Offers - Get Model Key';
  const description = 'Browse providers with signup credits, free token quotas, and trial benefits. Jump directly to official API key pages.';
  const url = `${siteConfig.domain}/offers/`;

  return {
    title,
    description,
    alternates: {
      canonical: '/offers/',
      languages: {
        en: '/offers/',
        zh: '/zh/offers/',
        'x-default': '/offers/',
      },
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: siteConfig.siteName,
      locale: 'en_US',
      images: [{ url: siteConfig.socialImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.socialImage],
    },
  };
}

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

  const faqStructuredData = buildFaqStructuredData(OFFERS_FAQ, 'en');

  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListStructuredData) }}
        />
        {faqStructuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
          />
        )}

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
                the provider&apos;s official API key page.
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
              {OFFERS_FAQ.map((item) => (
                <div key={item.question.en}>
                  <h3 className="mb-2 text-body font-semibold text-text-primary">
                    {item.question.en}
                  </h3>
                  <p className="text-body-sm text-text-secondary">{item.answer.en}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
