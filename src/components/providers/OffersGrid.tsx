import Link from 'next/link';
import type { Provider } from '@/types/provider';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import PrimaryInverseButton from '@/components/ui/PrimaryInverseButton';
import ProviderLogo from '@/components/providers/ProviderLogo';
import { REGION_LABELS, getProviderDetailHref, type Lang } from '@/lib/shared';

interface OffersGridProps {
  providers: Provider[];
  lang: Lang;
}

const COPY = {
  en: {
    offerTag: 'Offer',
    featuredTag: 'Featured',
    getKey: 'Get API Key',
    verifiedAt: 'Verified',
    noData: 'No active offers yet.',
    detailAria: (name: string) => `View details for ${name}`,
  },
  zh: {
    offerTag: '福利',
    featuredTag: '精选',
    getKey: '获取 API Key',
    verifiedAt: '核验时间',
    noData: '当前暂无可展示福利。',
    detailAria: (name: string) => `查看 ${name} 详情`,
  },
} as const;

export default function OffersGrid({ providers, lang }: OffersGridProps) {
  const text = COPY[lang];
  const regionLabels = REGION_LABELS[lang];

  if (providers.length === 0) {
    return (
      <Card variant="standard" className="text-center">
        <p className="text-body text-text-secondary">{text.noData}</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {providers.map((provider) => {
        const detailHref = getProviderDetailHref(provider.slug, lang);
        const detailAriaLabel = text.detailAria(provider.name[lang]);

        return (
          <Card
            key={provider.slug}
            variant="emphasis"
            hover
            className="group relative h-full overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
          >
            <Link
              href={detailHref}
              aria-label={detailAriaLabel}
              className="absolute inset-0 z-10 rounded-2xl"
            />

            <div className="pointer-events-none relative z-20 flex h-full flex-col">
              <div className="mb-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge variant="brand">{regionLabels[provider.region]}</Badge>
                  <Badge variant="neutral">{text.offerTag}</Badge>
                  {provider.featured && (
                    <Badge variant="success">{text.featuredTag}</Badge>
                  )}
                </div>
                <div className="mb-2 flex items-center gap-3">
                  <ProviderLogo provider={provider} lang={lang} size="md" />
                  <h2 className="text-h3 text-text-primary">{provider.name[lang]}</h2>
                </div>
                <p className="text-body-sm text-text-secondary">{provider.summary[lang]}</p>
              </div>

              <div className="mb-6 space-y-4">
                {(provider.offers ?? []).map((offer) => (
                  <div key={offer.id} className="rounded-xl border border-white-06 bg-surface-1 p-4">
                    <h4 className="mb-2 text-body font-semibold text-text-primary">
                      {offer.title[lang]}
                    </h4>
                    <p className="mb-2 text-body-sm text-text-secondary">{offer.benefit[lang]}</p>
                    {offer.notes?.[lang] && (
                      <p className="text-caption text-text-tertiary">{offer.notes[lang]}</p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-3 text-caption text-text-muted">
                      <span>
                        {text.verifiedAt}: {offer.verifiedAt}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pointer-events-auto relative z-30 mt-auto flex flex-col gap-3">
                <PrimaryInverseButton href={provider.officialKeyUrl} newTab className="w-full">
                  {text.getKey}
                </PrimaryInverseButton>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
