import { Metadata } from 'next';
import { getHomepageMetadata } from '@/lib/seo';
import {
  getAllProviders,
  getCategories,
  getHomepageContent
} from '@/lib/providers';
import HeroSection from '@/components/layout/HeroSection';
import CategorySection from '@/components/providers/CategorySection';

export async function generateMetadata(): Promise<Metadata> {
  return getHomepageMetadata('en');
}

export default async function HomePage() {
  const [providers, categories, homepageContent] = await Promise.all([
    getAllProviders(),
    getCategories(),
    getHomepageContent('en'),
  ]);

  // Sort categories by order
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

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
