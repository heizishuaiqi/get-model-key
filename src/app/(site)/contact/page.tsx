import { Metadata } from 'next';
import Card from '@/components/ui/Card';
import PrimaryInverseButton from '@/components/ui/PrimaryInverseButton';
import PillButton from '@/components/ui/PillButton';
import ContactMessageForm from '@/components/forms/ContactMessageForm';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/providers';

export const metadata: Metadata = {
  title: 'Contact Us - Get Model Key',
  description: 'Get in touch with Get Model Key. We welcome feedback, suggestions, and questions about our AI model provider directory.',
  alternates: {
    canonical: '/contact/',
    languages: {
      en: '/contact/',
      zh: '/zh/contact/',
      'x-default': '/contact/',
    },
  },
};

export default async function ContactPage() {
  const siteConfig = await getSiteConfig();

  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        {/* Page header */}
        <div className="mb-12 text-center">
          <div className="mb-6">            <h1 className="text-h1 text-text-primary mb-4">
              Contact Us
            </h1>
            <p className="text-body text-text-secondary max-w-3xl mx-auto">
              Have questions, feedback, or suggestions? We'd love to hear from you.
            </p>
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid gap-8 lg:grid-cols-2 mb-16">
          {/* Contact Form */}
          <Card variant="emphasis" padding="lg">
            <div className="mb-8">
              <h2 className="text-h2 text-text-primary mb-4">Send us a Message</h2>
              <p className="text-body text-text-secondary">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            
            <ContactMessageForm lang="en" contactEmail={siteConfig.contactEmail} />
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Direct Email */}
            <Card variant="standard" padding="lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-12">
                    <svg className="h-6 w-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-h3 text-text-primary mb-3">Email Us Directly</h3>
                  <p className="text-body text-text-secondary mb-4">
                    Prefer to send an email directly? Use the address below.
                  </p>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="inline-flex items-center gap-2 text-h4 text-brand-300 hover:text-brand-400 transition-colors"
                  >
                    {siteConfig.contactEmail}
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </Card>
            
            {/* Common Questions */}
            <Card variant="standard" padding="lg">
              <h3 className="text-h3 text-text-primary mb-6">Common Questions</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-body font-semibold text-text-primary mb-2">
                    How do I suggest a new provider?
                  </h4>
                  <p className="text-body-sm text-text-secondary">
                    Use the contact form and select "Provider Suggestion". Include the provider's name, website, and API key page URL.
                  </p>
                </div>
                <div>
                  <h4 className="text-body font-semibold text-text-primary mb-2">
                    I found incorrect information. How do I report it?
                  </h4>
                  <p className="text-body-sm text-text-secondary">
                    Select "Information Correction" in the form and provide the correct details. We'll verify and update promptly.
                  </p>
                </div>
                <div>
                  <h4 className="text-body font-semibold text-text-primary mb-2">
                    How long does it take to get a response?
                  </h4>
                  <p className="text-body-sm text-text-secondary">
                    We aim to respond within 48 hours for most inquiries. Provider suggestions may take longer as we verify the information.
                  </p>
                </div>
              </div>
            </Card>
            
            {/* Quick Links */}
            <Card variant="standard" padding="lg">
              <h3 className="text-h3 text-text-primary mb-6">Quick Links</h3>
              <div className="space-y-4">
                <Link
                  href="/providers"
                  className="flex items-center justify-between p-3 rounded-lg bg-surface-1 hover:bg-surface-2 transition-colors"
                >
                  <span className="text-body text-text-primary">Browse All Providers</span>
                  <svg className="h-5 w-5 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/about"
                  className="flex items-center justify-between p-3 rounded-lg bg-surface-1 hover:bg-surface-2 transition-colors"
                >
                  <span className="text-body text-text-primary">Learn About Our Mission</span>
                  <svg className="h-5 w-5 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/privacy"
                  className="flex items-center justify-between p-3 rounded-lg bg-surface-1 hover:bg-surface-2 transition-colors"
                >
                  <span className="text-body text-text-primary">Read Privacy Policy</span>
                  <svg className="h-5 w-5 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </Card>
          </div>
        </div>
        
        {/* What We Can Help With */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-text-primary mb-4">What We Can Help With</h2>
            <p className="text-body text-text-secondary max-w-3xl mx-auto">
              Here are the main reasons people reach out to us.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card variant="standard" hover padding="lg" className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-12">
                <svg className="h-6 w-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-h4 text-text-primary mb-2">New Providers</h3>
              <p className="text-body-sm text-text-secondary">
                Suggest AI model providers to add to our directory
              </p>
            </Card>
            <Card variant="standard" hover padding="lg" className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-12">
                <svg className="h-6 w-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-h4 text-text-primary mb-2">Corrections</h3>
              <p className="text-body-sm text-text-secondary">
                Report incorrect information or broken links
              </p>
            </Card>
            <Card variant="standard" hover padding="lg" className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-12">
                <svg className="h-6 w-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-h4 text-text-primary mb-2">Improvements</h3>
              <p className="text-body-sm text-text-secondary">
                Suggest features or improvements to the service
              </p>
            </Card>
            <Card variant="standard" hover padding="lg" className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-12">
                <svg className="h-6 w-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-h4 text-text-primary mb-2">Support</h3>
              <p className="text-body-sm text-text-secondary">
                Get help with using the directory or technical issues
              </p>
            </Card>
          </div>
        </div>
        
        {/* Note About API Keys */}
        <Card variant="emphasis" className="text-center">
          <div className="mb-6">
            <h2 className="text-h2 text-text-primary mb-4">Note About API Keys</h2>
            <p className="text-body text-text-secondary max-w-2xl mx-auto">
              <strong>Important:</strong> Get Model Key is a directory service only. We do not provide API keys, 
              manage API access, or offer technical support for external provider services. 
              For API key issues, please contact the respective provider directly.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryInverseButton href="/providers">
              Browse Providers
            </PrimaryInverseButton>
            <PillButton variant="ghost" size="lg" href="/">
              Back to Home
            </PillButton>
          </div>
        </Card>
      </main>
    </div>
  );
}
