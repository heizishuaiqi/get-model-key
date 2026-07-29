import type { Metadata } from 'next';
import Link from 'next/link';
import { getHomepageMetadata } from '@/lib/seo';
import {
  getAllProviders,
  getCategories,
  getHomepageContent
} from '@/lib/providers';
import { getPillarGuides } from '@/lib/guides';
import HeroSection from '@/components/layout/HeroSection';
import CategorySection from '@/components/providers/CategorySection';
import Card from '@/components/ui/Card';

export async function generateMetadata(): Promise<Metadata> {
  return getHomepageMetadata('en');
}

export default async function HomePage() {
  const [providers, categories, homepageContent, pillarGuides] = await Promise.all([
    getAllProviders(),
    getCategories(),
    getHomepageContent('en'),
    getPillarGuides(),
  ]);

  const sectionOrder = new Map<string, number>();
  for (const [index, slug] of (homepageContent.sections ?? []).entries()) {
    if (typeof slug === 'string') {
      sectionOrder.set(slug, index);
    }
  }
  const sortedCategories = [...categories].sort((a, b) => {
    const orderA = sectionOrder.get(a.slug) ?? Number.MAX_SAFE_INTEGER + a.order;
    const orderB = sectionOrder.get(b.slug) ?? Number.MAX_SAFE_INTEGER + b.order;
    return orderA - orderB;
  });

  return (
    <>
      {/* Hero Section */}
      <HeroSection 
        title={homepageContent.hero.title}
        subtitle={homepageContent.hero.subtitle}
      />
      
      {/* Category Sections */}
      {sortedCategories.map((category) => {
        if (category.slug === 'top-picks') return null; // Already shown above
        
        const categoryProviders = providers.filter(p => 
          p.categories.includes(category.slug)
        );
        
        if (categoryProviders.length === 0) return null;
        
        return (
          <CategorySection
            key={category.slug}
            category={category}
            providers={categoryProviders}
            lang="en"
          />
        );
      })}
      
      {/* Guide Hub — pillar page entry points for SEO internal linking */}
      {pillarGuides.length > 0 && (
        <section className="py-16">
          <div className="container-custom">
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-h2 text-text-primary">API Key Guides</h2>
              <p className="mx-auto max-w-2xl text-body text-text-secondary">
                Step-by-step tutorials for every major AI model provider. Start with a complete guide or jump to a specific topic.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pillarGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}/`}
                  className="group block rounded-xl border border-white-06 bg-surface-1 p-5 transition-colors hover:bg-surface-2"
                >
                  <div className="mb-2 text-body font-semibold text-text-primary group-hover:text-brand-300">
                    {guide.title.en}
                  </div>
                  <div className="text-body-sm text-text-secondary line-clamp-2">{guide.excerpt.en}</div>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/guides/"
                className="inline-flex items-center gap-2 text-body-sm font-semibold text-brand-300 transition-colors hover:text-brand-400"
              >
                Browse all guides
                <span aria-hidden="true">{'→'}</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section - Elevated Container */}
      <section className="py-20">
        <div className="container-custom">
          {/* Elevated Container with Title, Description and Stats */}
          <div className="relative rounded-3xl border border-white-08 bg-bg-elevated/80 backdrop-blur-xl p-8 md:p-12 lg:p-16"
               style={{
                 boxShadow: '0 18px 40px rgba(0,0,0,0.48)'
               }}>
            
            {/* Content */}
            <div className="text-center">
              {/* Title and Description INSIDE the container */}
              <div className="mb-12">
                <h2 className="text-h2 text-text-primary mb-4">
                  Your Gateway to AI Models
                </h2>
                <p className="text-body text-text-secondary max-w-3xl mx-auto">
                  We help you find the right AI model provider for your needs, 
                  with direct links to official API key pages.
                </p>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-h1 text-text-primary mb-2">
                    {providers.length}
                  </div>
                  <div className="text-caption font-semibold text-text-tertiary uppercase tracking-wide">
                    Providers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-h1 text-text-primary mb-2">
                    {categories.length}
                  </div>
                  <div className="text-caption font-semibold text-text-tertiary uppercase tracking-wide">
                    Categories
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-h1 text-text-primary mb-2">
                    {providers.reduce((acc, p) => acc + p.models.en.length, 0)}
                  </div>
                  <div className="text-caption font-semibold text-text-tertiary uppercase tracking-wide">
                    Models
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-h1 text-text-primary mb-2">
                    100%
                  </div>
                  <div className="text-caption font-semibold text-text-tertiary uppercase tracking-wide">
                    Official Links
                  </div>
                </div>
              </div>
            </div>
            
            {/* Subtle corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24">
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-brand-300/10 to-teal-500/10 blur-xl"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-24 h-24">
              <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-gradient-to-tr from-brand-300/10 to-teal-500/10 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
