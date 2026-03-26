import { Metadata } from 'next';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Privacy Policy - Get Model Key',
  description: 'Privacy policy for Get Model Key. Learn how we handle your data and protect your privacy.',
  alternates: {
    canonical: '/privacy/',
    languages: {
      en: '/privacy/',
      zh: '/zh/privacy/',
      'x-default': '/privacy/',
    },
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        {/* Page header */}
        <div className="mb-12 text-center">
          <div className="mb-6">            <h1 className="text-h1 text-text-primary mb-4">
              Privacy Policy
            </h1>
            <p className="text-body text-text-secondary max-w-3xl mx-auto">
              Last updated: March 24, 2026
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <Card variant="emphasis" className="mb-12">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-info-500/10">
                <svg className="h-6 w-6 text-info-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-h3 text-text-primary mb-3">Important Notice</h2>
              <p className="text-body text-text-secondary">
                Get Model Key is a directory service that links to external websites. 
                We do not collect personal data from users, but external sites may have their own privacy policies.
              </p>
            </div>
          </div>
        </Card>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            <strong>Minimal Data Collection:</strong> Get Model Key is designed to be privacy-focused. 
            We do not require user accounts, and we minimize data collection to what's necessary for website operation.
          </p>
          
          <h3>1.1 Technical Data</h3>
          <p>We may collect anonymous technical data for analytics and improvement purposes:</p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring website</li>
            <li>Pages visited and time spent</li>
            <li>General location (country-level, not precise)</li>
          </ul>
          
          <h3>1.2 No Personal Data</h3>
          <p>We do not collect:</p>
          <ul>
            <li>Names, email addresses, or contact information</li>
            <li>Payment information (we don't process payments)</li>
            <li>Social media profiles or identifiers</li>
            <li>Any data that can identify individual users</li>
          </ul>

          <h2>2. How We Use Information</h2>
          <p>The limited data we collect is used for:</p>
          <ul>
            <li>Website analytics and performance monitoring</li>
            <li>Improving user experience</li>
            <li>Identifying and fixing technical issues</li>
            <li>Understanding which providers are most popular</li>
          </ul>

          <h2>3. Third-Party Services</h2>
          <h3>3.1 External Links</h3>
          <p>
            Our site contains links to external websites (AI model providers). 
            When you click on these links, you will be subject to the privacy policies of those external sites.
          </p>
          
          <h3>3.2 Analytics</h3>
          <p>
            We may use privacy-focused analytics services that respect user privacy 
            and do not use cookies or track individual users.
          </p>

          <h2>4. Data Security</h2>
          <p>
            While we collect minimal data, we implement appropriate security measures to protect 
            what little data we do handle. However, no internet transmission is 100% secure.
          </p>

          <h2>5. Your Rights</h2>
          <p>As we collect minimal data, you have the right to:</p>
          <ul>
            <li>Use our service anonymously</li>
            <li>Not provide any personal information</li>
            <li>Use privacy tools (VPNs, private browsing) with our service</li>
          </ul>

          <h2>6. Children's Privacy</h2>
          <p>
            Our service is not directed to children under 13. We do not knowingly collect 
            any personal information from children under 13.
          </p>

          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify users of any 
            material changes by updating the "Last updated" date at the top of this page.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have questions about this privacy policy, please contact us through our 
            <a href="/contact"> contact page</a>.
          </p>
        </div>

        {/* Summary Card */}
        <Card variant="standard" className="mt-12">
          <div className="text-center">
            <h3 className="text-h3 text-text-primary mb-4">Privacy Summary</h3>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-12">
                  <svg className="h-5 w-5 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="text-body font-semibold text-text-primary mb-2">No Accounts</h4>
                <p className="text-body-sm text-text-secondary">
                  No registration or login required
                </p>
              </div>
              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-12">
                  <svg className="h-5 w-5 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-body font-semibold text-text-primary mb-2">Minimal Data</h4>
                <p className="text-body-sm text-text-secondary">
                  Only anonymous technical data
                </p>
              </div>
              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-12">
                  <svg className="h-5 w-5 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h4 className="text-body font-semibold text-text-primary mb-2">External Links</h4>
                <p className="text-body-sm text-text-secondary">
                  External sites have their own policies
                </p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
