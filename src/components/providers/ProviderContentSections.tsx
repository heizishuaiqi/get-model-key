import type { Provider } from '@/types/provider';
import type { Lang } from '@/lib/shared';
import Card from '@/components/ui/Card';

type SectionKey = 'overview' | 'howToGetKey' | 'faq';

interface ProviderContentSectionsProps {
  provider: Provider;
  lang: Lang;
  include?: SectionKey[];
}

const LABELS = {
  en: {
    overview: 'Overview',
    howToGetKey: 'How to Get an API Key',
    faq: 'FAQ',
  },
  zh: {
    overview: '概述',
    howToGetKey: '如何获取 API Key',
    faq: '常见问题',
  },
} as const;

const DEFAULT_SECTIONS: SectionKey[] = ['overview', 'howToGetKey', 'faq'];

export default function ProviderContentSections({
  provider,
  lang,
  include = DEFAULT_SECTIONS,
}: ProviderContentSectionsProps) {
  const labels = LABELS[lang];
  const overview = provider.overview?.[lang] ?? [];
  const howToGetKey = provider.howToGetKey?.[lang] ?? [];
  const faq = provider.faq ?? [];
  const showOverview = include.includes('overview') && overview.length > 0;
  const showHowToGetKey = include.includes('howToGetKey') && howToGetKey.length > 0;
  const showFaq = include.includes('faq') && faq.length > 0;

  if (!showOverview && !showHowToGetKey && !showFaq) {
    return null;
  }

  return (
    <>
      {showOverview && (
        <Card variant="standard">
          <h2 className="mb-4 text-h2 text-text-primary">{labels.overview}</h2>
          <div className="space-y-3">
            {overview.map((paragraph, index) => (
              <p key={`overview-${index}`} className="text-body text-text-secondary">
                {paragraph}
              </p>
            ))}
          </div>
        </Card>
      )}

      {showHowToGetKey && (
        <Card variant="standard">
          <h2 className="mb-4 text-h2 text-text-primary">{labels.howToGetKey}</h2>
          <ol className="list-decimal space-y-3 pl-5 text-body text-text-secondary">
            {howToGetKey.map((step, index) => (
              <li key={`step-${index}`}>{step}</li>
            ))}
          </ol>
        </Card>
      )}

      {showFaq && (
        <Card variant="emphasis">
          <h2 className="mb-6 text-h2 text-text-primary">{labels.faq}</h2>
          <div className="space-y-5">
            {faq.map((item) => (
              <div key={item.question[lang]}>
                <h3 className="mb-2 text-body font-semibold text-text-primary">
                  {item.question[lang]}
                </h3>
                <p className="text-body-sm text-text-secondary">{item.answer[lang]}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}
