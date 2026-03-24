import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProviders, getCategories } from '@/lib/providers';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import ProviderCard from '@/components/providers/ProviderCard';

export const metadata: Metadata = {
  title: 'AI Model Providers - Get Model Key',
  description: 'Browse all AI model providers and jump to official API key pages.',
  alternates: {
    canonical: '/providers/',
    languages: {
      en: '/providers/',
      zh: '/zh/providers/',
    },
  },
};

export default async function ProvidersPage() {
  const [providers, categories] = await Promise.all([
    getAllProviders(),
    getCategories(),
  ]);

  const categoryCounts = categories.map((category) => ({
    ...category,
    providerCount: providers.filter((provider) => provider.categories.includes(category.slug)).length,
  }));

  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        <div className="mb-12 text-center">          <h1 className="mb-4 text-h1 text-text-primary">AI Model Providers</h1>
          <p className="mx-auto max-w-3xl text-body text-text-secondary">
            Browse the full provider directory, compare categories, and open official API key pages.
          </p>
        </div>

        <Card variant="standard" className="mb-12">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <div className="mb-2 text-caption font-semibold uppercase tracking-wide text-text-tertiary">
                Providers
              </div>
              <div className="text-h3 text-text-primary">{providers.length}</div>
            </div>
            <div>
              <div className="mb-2 text-caption font-semibold uppercase tracking-wide text-text-tertiary">
                Featured
              </div>
              <div className="text-h3 text-text-primary">
                {providers.filter((provider) => provider.featured).length}
              </div>
            </div>
            <div>
              <div className="mb-2 text-caption font-semibold uppercase tracking-wide text-text-tertiary">
                Categories
              </div>
              <div className="text-h3 text-text-primary">{categories.length}</div>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-h2 text-text-primary">All Providers</h2>
              <p className="text-body text-text-secondary">
                Every provider card links to its official API key entry point.
              </p>
            </div>
            <Badge variant="neutral">{providers.length} total</Badge>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => (
              <ProviderCard
                key={provider.slug}
                provider={provider}
                lang="en"
                showSecondaryLink={false}
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-8 text-h2 text-text-primary">Browse by Category</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryCounts.map((category) => (
              <Card key={category.slug} variant="standard" hover padding="lg">
                <div className="mb-4 flex items-center justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface-green text-lg font-bold text-brand-300">
                    {category.name.en.charAt(0)}
                  </div>
                  <Badge variant="info">{category.providerCount}</Badge>
                </div>
                <h3 className="mb-2 text-h4 text-text-primary">{category.name.en}</h3>
                <p className="mb-4 text-body-sm text-text-secondary">
                  Explore providers grouped under {category.name.en.toLowerCase()}.
                </p>
                <Link
                  href={`/#${category.slug}`}
                  className="text-body-sm font-semibold text-brand-300 transition-colors hover:text-brand-400"
                >
                  View category
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <Card variant="emphasis" className="text-center">
          <h2 className="mb-4 text-h2 text-text-primary">Need a provider added?</h2>
          <p className="mx-auto mb-6 max-w-2xl text-body text-text-secondary">
            We keep the directory focused and practical. If an important provider is missing, send it over and we can add it.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="btn-primary-inverse">
              Suggest a Provider
            </Link>
            <Link href="/" className="btn-secondary-ghost">
              Back to Home
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}
