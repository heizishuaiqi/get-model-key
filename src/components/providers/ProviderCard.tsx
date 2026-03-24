import type { Provider } from '@/types/provider';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import PrimaryInverseButton from '@/components/ui/PrimaryInverseButton';
import PillButton from '@/components/ui/PillButton';

interface ProviderCardProps {
  provider: Provider;
  lang: 'en' | 'zh';
  showSecondaryLink?: boolean;
  variant?: 'standard' | 'top-pick';
}

export default function ProviderCard({
  provider,
  lang,
  showSecondaryLink = true,
  variant = 'standard',
}: ProviderCardProps) {
  const detailHref =
    lang === 'en' ? `/providers/${provider.slug}` : `/zh/providers/${provider.slug}`;
  const detailAriaLabel =
    lang === 'en'
      ? `View details for ${provider.name[lang]}`
      : `\u67e5\u770b ${provider.name[lang]} \u8be6\u60c5`;

  const regionLabels = {
    global: 'Global',
    china: 'China',
    aggregator: 'Aggregator',
    cloud: 'Cloud',
  };

  if (variant === 'top-pick') {
    const getApiKeyText = lang === 'en' ? 'Get API Key' : '\u83b7\u53d6 API Key';

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
        <div className="pointer-events-none relative z-20 flex h-full min-h-[220px] flex-col">
          <div className="mb-5">
            <h3 className="mb-3 text-h4 text-text-primary">{provider.name[lang]}</h3>
            <p className="line-clamp-3 text-body-sm text-text-secondary">{provider.summary[lang]}</p>
          </div>
          <div className="pointer-events-auto relative z-30 mt-auto">
            <a
              href={provider.officialKeyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-inverse w-full"
            >
              {getApiKeyText}
            </a>
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
              <h3 className="mb-2 text-h4 text-text-primary">{provider.name[lang]}</h3>
              <div className="mb-3 flex items-center gap-2">
                <Badge variant="brand">{regionLabels[provider.region]}</Badge>
                {provider.featured && (
                  <Badge variant="success">
                    {lang === 'en' ? 'Featured' : '\u7cbe\u9009'}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <p className="mb-6 text-body-sm text-text-secondary">{provider.summary[lang]}</p>

          <div className="mb-6">
            <h4 className="mb-3 text-caption font-semibold uppercase tracking-wide text-text-tertiary">
              {lang === 'en' ? 'Common Models' : '\u5e38\u7528\u6a21\u578b'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {provider.models[lang].slice(0, 3).map((model) => (
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
                {provider.tags.slice(0, 3).map((tag) => (
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
              {lang === 'en' ? 'Get API Key' : '\u83b7\u53d6 API Key'}
            </PrimaryInverseButton>

            {showSecondaryLink && provider.officialSiteUrl && (
              <PillButton variant="ghost" size="md" href={provider.officialSiteUrl} className="w-full">
                {lang === 'en' ? 'Visit Site' : '\u8bbf\u95ee\u5b98\u7f51'}
              </PillButton>
            )}
          </div>

          {provider.lastVerified && (
            <div className="mt-4 text-caption text-text-muted">
              {lang === 'en' ? 'Last verified:' : '\u6700\u540e\u6821\u9a8c\uff1a'} {provider.lastVerified}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
