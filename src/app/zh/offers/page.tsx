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
  const title = '福利专题 - Get Model Key';
  const description = '整理当前提供新用户额度、免费 Token 或试用福利的模型供应商，并可直接跳转官方 API Key 页面。';
  const url = `${siteConfig.domain}/zh/offers/`;

  return {
    title,
    description,
    alternates: {
      canonical: '/zh/offers/',
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
      locale: 'zh_CN',
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

export default async function ZhOffersPage() {
  const [providers, siteConfig] = await Promise.all([
    getProvidersWithActiveOffers(),
    getSiteConfig(),
  ]);

  const itemListStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '模型供应商福利专题',
    itemListElement: providers.map((provider, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: provider.name.zh,
      url: `${siteConfig.domain}/zh/providers/${provider.slug}/`,
      description: provider.offers?.[0]?.benefit?.zh || provider.summary.zh,
    })),
  };

  const faqStructuredData = buildFaqStructuredData(OFFERS_FAQ, 'zh');

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
          <h1 className="mb-4 text-h1 text-text-primary">福利专题</h1>
          <p className="mx-auto max-w-3xl text-body text-text-secondary">
            汇总当前有新用户额度、免费 Token 或试用权益的模型供应商，帮助你快速直达官方入口。
          </p>
        </div>

        <Card variant="standard" className="mb-10">
          <p className="text-body-sm text-text-secondary">
            活动规则会随时调整，具体资格、额度与有效期请以供应商官方页面的实时说明为准。
          </p>
        </Card>

        <OffersGrid providers={providers} lang="zh" />

        <section className="mt-12 space-y-8">
          <Card variant="standard">
            <h2 className="mb-4 text-h3 text-text-primary">页面说明</h2>
            <div className="space-y-3 text-body-sm text-text-secondary">
              <p>
                本页面仅整理已收录供应商中的当前福利信息，并统一跳转到官方 API Key 页面。
              </p>
              <p>
                活动额度、有效期和参与门槛可能随时变化。我们会标注核验时间，但最终以供应商官方规则为准。
              </p>
            </div>
          </Card>

          <Card variant="standard">
            <h2 className="mb-4 text-h3 text-text-primary">常见问题（FAQ）</h2>
            <div className="space-y-5">
              {OFFERS_FAQ.map((item) => (
                <div key={item.question.zh}>
                  <h3 className="mb-2 text-body font-semibold text-text-primary">
                    {item.question.zh}
                  </h3>
                  <p className="text-body-sm text-text-secondary">{item.answer.zh}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
