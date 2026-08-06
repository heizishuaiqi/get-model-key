import type { Metadata } from 'next';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import PrimaryInverseButton from '@/components/ui/PrimaryInverseButton';
import PillButton from '@/components/ui/PillButton';
import { baseUrl } from '@/lib/root-metadata';
import { buildWebPageStructuredData } from '@/lib/seo';
import { getSiteConfig } from '@/lib/providers';

export const metadata: Metadata = {
  title: 'About Get Model Key',
  description: 'Learn about Get Model Key — a hands-on tested directory of AI model API key pages, maintained by developer Heizi with real API integration experience.',
  alternates: {
    canonical: '/about/',
    languages: {
      en: '/about/',
      zh: '/zh/about/',
      'x-default': '/about/',
    },
  },
  openGraph: {
    type: 'article',
    url: `${baseUrl}/about/`,
    title: 'About Get Model Key',
    description: 'Learn about Get Model Key — a hands-on tested directory of AI model API key pages, maintained by developer Heizi with real API integration experience.',
    siteName: 'Get Model Key',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Get Model Key',
    description: 'Learn about Get Model Key — a hands-on tested directory of AI model API key pages, maintained by developer Heizi.',
  },
};

export default async function AboutPage() {
  const siteConfig = await getSiteConfig();
  const author = siteConfig.author;

  const webPageStructuredData = {
    ...buildWebPageStructuredData('About Get Model Key', `${baseUrl}/about/`, 'en'),
    ...(author ? {
      author: {
        '@type': 'Person',
        name: author.name,
        description: author.bio.en,
      },
    } : {}),
  };

  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageStructuredData) }}
        />
        {/* Page header */}
        <div className="mb-12 text-center">
          <div className="mb-6">
            <h1 className="text-h1 text-text-primary mb-4">
              About Get Model Key
            </h1>
            <p className="text-body text-text-secondary max-w-3xl mx-auto">
              A hands-on tested directory of AI model API key pages — every guide is based on real API integration experience.
            </p>
          </div>
        </div>

        {/* Author Section */}
        {author && (
          <div className="mb-16">
            <Card variant="emphasis" padding="lg">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-12">
                    <span className="text-3xl font-bold text-brand-300">{author.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-h2 text-text-primary mb-2">{author.name}</h2>
                  <p className="text-body-sm font-semibold text-brand-300 mb-4">{author.role.en}</p>
                  <p className="text-body text-text-secondary mb-4">{author.bio.en}</p>
                  <div className="flex flex-wrap gap-4 text-body-sm text-text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <svg className="h-4 w-4 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {author.experience.en}
                    </span>
                    {author.social?.github && (
                      <a
                        href={author.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-brand-300 transition-colors hover:text-brand-400"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Why This Site Exists */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-h2 text-text-primary mb-4">Why This Site Exists</h2>
          </div>
          <div className="space-y-4">
            <p className="text-body text-text-secondary">
              When I first started integrating AI models into my projects, I spent hours hunting down
              where each provider hid their API key page. OpenAI has it under "API Keys" in the platform.
              Anthropic buries it in the Console. Google has two different paths depending on whether
              you use AI Studio or Vertex AI. Chinese providers like DeepSeek and Moonshot have their
              own dashboards with different navigation patterns.
            </p>
            <p className="text-body text-text-secondary">
              I built Get Model Key to solve this problem once and for all — a single directory that
              links directly to every provider's official API key page, with guides that walk you through
              the exact steps based on first-hand experience.
            </p>
            <p className="text-body text-text-secondary">
              Every guide here was written after I actually registered an account, generated a real API key,
              and ran test code against the provider's API. If something changes — a dashboard gets updated,
              pricing shifts, a new model drops — I update the guide.
            </p>
          </div>
        </div>

        {/* Editorial Process */}
        {siteConfig.editorialProcess && (
          <div className="mb-16">
            <Card variant="standard" padding="lg">
              <h2 className="text-h2 text-text-primary mb-4">Our Editorial Process</h2>
              <p className="text-body text-text-secondary mb-6">{siteConfig.editorialProcess.en}</p>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-12 text-caption font-bold text-brand-300">1</div>
                  <div>
                    <h3 className="text-body font-semibold text-text-primary mb-1">Register & Test</h3>
                    <p className="text-body-sm text-text-secondary">We sign up with a real account and generate an actual API key</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-12 text-caption font-bold text-brand-300">2</div>
                  <div>
                    <h3 className="text-body font-semibold text-text-primary mb-1">Run Code</h3>
                    <p className="text-body-sm text-text-secondary">We write and execute test requests to verify the API works</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-12 text-caption font-bold text-brand-300">3</div>
                  <div>
                    <h3 className="text-body font-semibold text-text-primary mb-1">Document Everything</h3>
                    <p className="text-body-sm text-text-secondary">We capture screenshots, pricing, error messages, and tips</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-12 text-caption font-bold text-brand-300">4</div>
                  <div>
                    <h3 className="text-body font-semibold text-text-primary mb-1">Re-verify Quarterly</h3>
                    <p className="text-body-sm text-text-secondary">We re-check all guides at least every 3 months</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Mission Section */}
        <div className="mb-16">
          <Card variant="emphasis" padding="lg">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-12">
                  <svg className="h-8 w-8 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
                    <svg className="h-5 w-5 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
                    <svg className="h-5 w-5 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
                    <svg className="h-5 w-5 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
                    <svg className="h-5 w-5 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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

        {/* Contact */}
        <Card variant="emphasis" className="text-center">
          <div className="mb-8">
            <h2 className="text-h2 text-text-primary mb-4">Get in Touch</h2>
            <p className="text-body text-text-secondary max-w-2xl mx-auto">
              Found a broken link? Know a provider we should add? Have a question about API setup?
              Reach out — I read every message.
            </p>
            <p className="mt-4 text-body-sm text-text-muted">
              Email: <a href={`mailto:${siteConfig.contactEmail}`} className="text-brand-300 hover:text-brand-400">{siteConfig.contactEmail}</a>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryInverseButton href="/providers/">
              Browse Providers
            </PrimaryInverseButton>
            <PillButton variant="ghost" size="lg" href="/contact/">
              Contact Us
            </PillButton>
          </div>
        </Card>
      </main>
    </div>
  );
}
