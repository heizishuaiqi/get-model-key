import type { Provider } from '@/types/provider';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import PrimaryInverseButton from '@/components/ui/PrimaryInverseButton';
import PillButton from '@/components/ui/PillButton';
import ProviderLogo from '@/components/providers/ProviderLogo';
import { REGION_LABELS, getProviderDetailHref, type Lang } from '@/lib/shared';

const MAX_VISIBLE_MODELS = 3;
const MAX_VISIBLE_TAGS = 3;
const TOP_PICK_CARD_MIN_HEIGHT = '220px';

interface ProviderCardProps {
  provider: Provider;
  lang: Lang;
  showSecondaryLink?: boolean;
  variant?: 'standard' | 'top-pick';
}

export default function ProviderCard({
  provider,
  lang,
  showSecondaryLink = true,
  variant = 'standard',
}: ProviderCardProps) {
  const detailHref = getProviderDetailHref(provider.slug, lang);
  const detailAriaLabel =
    lang === 'en'
      ? `View details for ${provider.name[lang]}`
      : `查看 ${provider.name[lang]} 详情`;

  const regionLabels = REGION_LABELS[lang];
  const getApiKeyText = lang === 'en' ? 'Get API Key' : '获取 API Key';
  const visitSiteText = lang === 'en' ? 'Visit Site' : '访问官网';
  const featuredText = lang === 'en' ? 'Featured' : '精选';
  const modelsLabel = lang === 'en' ? 'Common Models' : '常用模型';
  const lastVerifiedLabel = lang === 'en' ? 'Last verified:' : '最后校验：';

  // Safely resolve secondary site URL without non-null assertion
  const secondarySiteUrl = provider.officialSiteUrl || provider.officialSiteUrlGlobal || undefined;

  if (variant === 'top-pick') {
    return (
      <Card
        variant="featured"
        hover
        padding="md"
        className="group relative overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
      >
        <Link
          href={detailHref}
          aria-label={detailAriaLabel}
          className="absolute inset-0 z-10 rounded-2xl"
        />
        <div className="pointer-events-none relative z-20 flex h-full flex-col" style={{ minHeight: TOP_PICK_CARD_MIN_HEIGHT }}>
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-3">
              <ProviderLogo provider={provider} lang={lang} size="sm" />
              <h3 className="text-h4 text-text-primary">{provider.name[lang]}</h3>
            </div>
            <p className="line-clamp-3 text-body-sm text-text-secondary">{provider.summary[lang]}</p>
          </div>
          <div className="pointer-events-auto relative z-30 mt-auto">
            <PrimaryInverseButton href={provider.officialKeyUrl} newTab className="w-full">
              {getApiKeyText}
            </PrimaryInverseButton>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      variant="standard"
      hover
      padding="lg"
      className="group relative overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
    >
      <Link
        href={detailHref}
        aria-label={detailAriaLabel}
        className="absolute inset-0 z-10 rounded-2xl"
      />
      <div className="pointer-events-none relative z-20 flex h-full flex-col">
        <div className="flex-1">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <ProviderLogo provider={provider} lang={lang} size="sm" />
                <h2 className="text-h4 text-text-primary">{provider.name[lang]}</h2>
              </div>
              <div className="mb-3 flex items-center gap-2">
                <Badge variant="brand">{regionLabels[provider.region]}</Badge>
                {provider.featured && (
                  <Badge variant="success">{featuredText}</Badge>
                )}
              </div>
            </div>
          </div>

          <p className="mb-6 text-body-sm text-text-secondary">{provider.summary[lang]}</p>

          <div className="mb-6">
            <h4 className="mb-3 text-caption font-semibold uppercase tracking-wide text-text-tertiary">
              {modelsLabel}
            </h4>
            <div className="flex flex-wrap gap-2">
              {provider.models[lang].slice(0, MAX_VISIBLE_MODELS).map((model) => (
                <span
                  key={model}
                  className="inline-flex items-center rounded-md border border-white-04 bg-surface-green px-3 py-1.5 text-xs font-medium text-text-secondary"
                >
                  {model}
                </span>
              ))}
            </div>
          </div>

          {provider.tags.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {provider.tags.slice(0, MAX_VISIBLE_TAGS).map((tag) => (
                  <Badge key={tag} variant="neutral" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pointer-events-auto relative z-30 mt-auto">
          <div className="flex flex-col gap-3">
            <PrimaryInverseButton href={provider.officialKeyUrl} newTab className="w-full">
              {getApiKeyText}
            </PrimaryInverseButton>

            {showSecondaryLink && secondarySiteUrl && (
              <PillButton
                variant="ghost"
                size="md"
                href={secondarySiteUrl}
                newTab
                className="w-full"
              >
                {visitSiteText}
              </PillButton>
            )}
          </div>

          {provider.lastVerified && (
            <div className="mt-4 text-caption text-text-muted">
              {lastVerifiedLabel} {provider.lastVerified}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
