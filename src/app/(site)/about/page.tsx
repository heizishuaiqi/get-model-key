import { Metadata } from 'next';
import Card from '@/components/ui/Card';
import PrimaryInverseButton from '@/components/ui/PrimaryInverseButton';
import PillButton from '@/components/ui/PillButton';

export const metadata: Metadata = {
  title: 'About Get Model Key',
  description: 'Learn about Get Model Key - helping users find official API key pages for AI model providers.',
  alternates: {
    canonical: '/about/',
    languages: {
      en: '/about/',
      zh: '/zh/about/',
      'x-default': '/about/',
    },
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        {/* Page header */}
        <div className="mb-12 text-center">
          <div className="mb-6">            <h1 className="text-h1 text-text-primary mb-4">
              About Get Model Key
            </h1>
            <p className="text-body text-text-secondary max-w-3xl mx-auto">
              Helping users find official API key pages for major AI model providers.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card variant="emphasis" padding="lg">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-12">
                  <svg className="h-8 w-8 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-h2 text-text-primary mb-4">Our Mission</h2>
                <p className="text-body text-text-secondary">
                  Get Model Key solves a simple but important problem: when users need to configure AI tools, 
                  they often get stuck at the "enter API key" step because they don't know where to find official 
                  API key pages for different model providers.
                </p>
              </div>
            </div>
          </Card>
        </div>
        
        {/* What We Do */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-text-primary mb-4">What We Do</h2>
            <p className="text-body text-text-secondary max-w-3xl mx-auto">
              We make it easy to find and access official API key pages for AI model providers.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card variant="standard" hover padding="lg">
              <div className="text-center">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-12">
                  <span className="text-xl font-bold text-brand-300">1</span>
                </div>
                <h3 className="text-h4 text-text-primary mb-3">Aggregate</h3>
                <p className="text-body-sm text-text-secondary">
                  Major AI model providers in one place
                </p>
              </div>
            </Card>
            <Card variant="standard" hover padding="lg">
              <div className="text-center">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-12">
                  <span className="text-xl font-bold text-brand-300">2</span>
                </div>
                <h3 className="text-h4 text-text-primary mb-3">Organize</h3>
                <p className="text-body-sm text-text-secondary">
                  Providers by category and region
                </p>
              </div>
            </Card>
            <Card variant="standard" hover padding="lg">
              <div className="text-center">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-12">
                  <span className="text-xl font-bold text-brand-300">3</span>
                </div>
                <h3 className="text-h4 text-text-primary mb-3">Link</h3>
                <p className="text-body-sm text-text-secondary">
                  Directly to official API key pages
                </p>
              </div>
            </Card>
            <Card variant="standard" hover padding="lg">
              <div className="text-center">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-12">
                  <span className="text-xl font-bold text-brand-300">4</span>
                </div>
                <h3 className="text-h4 text-text-primary mb-3">Simplify</h3>
                <p className="text-body-sm text-text-secondary">
                  The process of finding and comparing providers
                </p>
              </div>
            </Card>
          </div>
        </div>
        
        {/* What We Don't Do */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-text-primary mb-4">What We Don't Do</h2>
            <p className="text-body text-text-secondary max-w-3xl mx-auto">
              We're transparent about our limitations and scope.
            </p>
          </div>
          <Card variant="standard" padding="lg">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger-500/10">
                    <svg className="h-5 w-5 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-body font-semibold text-text-primary mb-2">
                    No API Sales
                  </h3>
                  <p className="text-body-sm text-text-secondary">
                    We do <strong>not</strong> sell API keys or provide API access
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger-500/10">
                    <svg className="h-5 w-5 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-body font-semibold text-text-primary mb-2">
                    No Platform Replacement
                  </h3>
                  <p className="text-body-sm text-text-secondary">
                    We do <strong>not</strong> replace official provider platforms
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger-500/10">
                    <svg className="h-5 w-5 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-body font-semibold text-text-primary mb-2">
                    No Model Hosting
                  </h3>
                  <p className="text-body-sm text-text-secondary">
                    We do <strong>not</strong> host or run model inference
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger-500/10">
                    <svg className="h-5 w-5 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-body font-semibold text-text-primary mb-2">
                    No Accounts Required
                  </h3>
                  <p className="text-body-sm text-text-secondary">
                    We do <strong>not</strong> require user accounts or logins
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Our Principles */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-text-primary mb-4">Our Principles</h2>
            <p className="text-body text-text-secondary max-w-3xl mx-auto">
              The core values that guide everything we do.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <Card variant="standard" hover padding="lg">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-12">
                <svg className="h-6 w-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-h4 text-text-primary mb-3">Accuracy First</h3>
              <p className="text-body-sm text-text-secondary">
                All links point to official provider pages. We regularly verify that links are up-to-date.
              </p>
            </Card>
            <Card variant="standard" hover padding="lg">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-12">
                <svg className="h-6 w-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h3 className="text-h4 text-text-primary mb-3">Simplicity</h3>
              <p className="text-body-sm text-text-secondary">
                We keep the interface clean and focused on the core task: finding API key pages.
              </p>
            </Card>
            <Card variant="standard" hover padding="lg">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-12">
                <svg className="h-6 w-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-h4 text-text-primary mb-3">Transparency</h3>
              <p className="text-body-sm text-text-secondary">
                We're clear about what we do and don't do. No hidden agendas or misleading information.
              </p>
            </Card>
            <Card variant="standard" hover padding="lg">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-12">
                <svg className="h-6 w-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-h4 text-text-primary mb-3">User-Focused</h3>
              <p className="text-body-sm text-text-secondary">
                Everything is designed to help users complete their task quickly and efficiently.
              </p>
            </Card>
          </div>
        </div>
        
        {/* Call to Action */}
        <Card variant="emphasis" className="text-center">
          <div className="mb-8">
            <h2 className="text-h2 text-text-primary mb-4">Ready to Find Your API Key?</h2>
            <p className="text-body text-text-secondary max-w-2xl mx-auto">
              Browse our collection of AI model providers and go straight to the official pages.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryInverseButton href="/providers">
              Browse Providers
            </PrimaryInverseButton>
            <PillButton variant="ghost" size="lg" href="/contact">
              Contact Us
            </PillButton>
          </div>
        </Card>
      </main>
    </div>
  );
}
