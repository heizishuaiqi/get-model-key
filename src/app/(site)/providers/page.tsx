import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProviders } from '@/lib/providers';
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
      'x-default': '/providers/',
    },
  },
};

export default async function ProvidersPage() {
  const providers = await getAllProviders();

  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-h1 text-text-primary">AI Model Providers</h1>
        </div>
        <section className="mb-12">
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
