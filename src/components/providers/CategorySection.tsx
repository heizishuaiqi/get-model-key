import type { Provider, Category } from '@/types/provider';
import ProviderCard from './ProviderCard';

interface CategorySectionProps {
  category: Category;
  providers: Provider[];
  lang: 'en' | 'zh';
}

export default function CategorySection({ category, providers, lang }: CategorySectionProps) {
  if (providers.length === 0) return null;
  const useUnifiedProviderCardStyle = ['global', 'china', 'aggregator', 'cloud'].includes(category.slug);

  return (
    <section className="py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h2 className="mb-4 text-h2 text-text-primary">{category.name[lang]}</h2>
          <p className="text-body text-text-secondary">
            {lang === 'en'
              ? `Browse ${providers.length} ${providers.length === 1 ? 'provider' : 'providers'} in this category`
              : `\u6d4f\u89c8\u6b64\u5206\u7c7b\u4e2d\u7684 ${providers.length} \u4e2a\u4f9b\u5e94\u5546`}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {providers.map((provider) => (
            <ProviderCard
              key={provider.slug}
              provider={provider}
              lang={lang}
              variant={useUnifiedProviderCardStyle ? 'top-pick' : 'standard'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
