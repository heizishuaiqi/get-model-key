import { Metadata } from 'next';
import Card from '@/components/ui/Card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - Get Model Key',
  description: 'Terms of service for Get Model Key. Please read these terms carefully before using our service.',
  alternates: {
    canonical: '/terms/',
    languages: {
      en: '/terms/',
      zh: '/zh/terms/',
    },
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        {/* Page header */}
        <div className="mb-12 text-center">
          <div className="mb-6">            <h1 className="text-h1 text-text-primary mb-4">
              Terms of Service
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
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning-500/10">
                <svg className="h-6 w-6 text-warning-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-h3 text-text-primary mb-3">Important Notice</h2>
              <p className="text-body text-text-secondary">
                Get Model Key is a directory service that links to external websites. 
                We do not provide API keys or AI model services ourselves. 
                Your use of external provider services is subject to their terms and conditions.
              </p>
            </div>
          </div>
        </Card>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Get Model Key ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
            If you do not agree to abide by these terms, please do not use this Service.
          </p>
          
          <h2>2. Description of Service</h2>
          <p>
            Get Model Key provides a directory of AI model providers with direct links to their official API key pages. 
            The Service includes:
          </p>
          <ul>
            <li>Aggregation of AI model provider information</li>
            <li>Organization by categories and regions</li>
            <li>Direct links to official API key pages</li>
            <li>Basic information about providers and their models</li>
          </ul>
          <p>
            <strong>Important:</strong> We do not provide API keys, AI model services, or any form of API access. 
            All services are provided by third-party providers.
          </p>

          <h2>3. User Responsibilities</h2>
          <p>As a user of this Service, you agree to:</p>
          <ul>
            <li>Use the Service only for lawful purposes</li>
            <li>Not attempt to gain unauthorized access to any part of the Service</li>
            <li>Not use the Service to harass, abuse, or harm others</li>
            <li>Respect the intellectual property rights of others</li>
            <li>Verify the accuracy of information before relying on it</li>
          </ul>

          <h2>4. External Links</h2>
          <p>
            Our Service contains links to external websites that are not provided or maintained by us. 
            Please note that:
          </p>
          <ul>
            <li>We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites</li>
            <li>Links to external websites are provided for convenience only</li>
            <li>We do not endorse, approve, or control these external websites</li>
            <li>Your use of external websites is at your own risk and subject to their terms and conditions</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are owned by Get Model Key and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
          <p>
            You may not reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service without express written permission from us.
          </p>

          <h2>6. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Get Model Key makes no representations or warranties of any kind, express or implied, as to the operation of the Service or the information, content, or materials included therein.
          </p>
          <p>
            You expressly agree that your use of the Service is at your sole risk. We do not warrant that:
          </p>
          <ul>
            <li>The Service will be uninterrupted, timely, secure, or error-free</li>
            <li>The results that may be obtained from the use of the Service will be accurate or reliable</li>
            <li>The quality of any products, services, information, or other material obtained through the Service will meet your expectations</li>
          </ul>

          <h2>7. Limitation of Liability</h2>
          <p>
            In no event shall Get Model Key, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul>
            <li>Your access to or use of or inability to access or use the Service</li>
            <li>Any conduct or content of any third party on the Service</li>
            <li>Any content obtained from the Service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>

          <h2>8. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless Get Model Key and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of:
          </p>
          <ul>
            <li>Your use and access of the Service</li>
            <li>Your violation of any term of these Terms</li>
            <li>Your violation of any third-party right, including without limitation any copyright, property, or privacy right</li>
          </ul>

          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
            If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. 
            What constitutes a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the jurisdiction where Get Model Key operates, without regard to its conflict of law provisions.
          </p>

          <h2>11. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <ul>
            <li>Email: <a href="mailto:heizishuaiqi@gmail.com" className="text-brand-300 hover:text-brand-400">heizishuaiqi@gmail.com</a></li>
            <li>Through our <a href="/contact" className="text-brand-300 hover:text-brand-400">contact form</a></li>
          </ul>
        </div>

        {/* Summary Card */}
        <Card variant="standard" className="mt-12">
          <div className="text-center">
            <h3 className="text-h3 text-text-primary mb-4">Terms Summary</h3>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-12">
                  <svg className="h-5 w-5 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-body font-semibold text-text-primary mb-2">Directory Service</h4>
                <p className="text-body-sm text-text-secondary">
                  We provide links to external providers only
                </p>
              </div>
              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-12">
                  <svg className="h-5 w-5 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="text-body font-semibold text-text-primary mb-2">No API Access</h4>
                <p className="text-body-sm text-text-secondary">
                  We do not provide API keys or model services
                </p>
              </div>
              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-12">
                  <svg className="h-5 w-5 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h4 className="text-body font-semibold text-text-primary mb-2">External Terms Apply</h4>
                <p className="text-body-sm text-text-secondary">
                  External sites have their own terms and conditions
                </p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
