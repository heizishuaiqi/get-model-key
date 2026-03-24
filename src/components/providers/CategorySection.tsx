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
