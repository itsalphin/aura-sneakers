import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary,#050505)] pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-white uppercase tracking-tight mb-8">
          Privacy Policy
        </h1>
        <p className="text-xs text-white/30 uppercase tracking-wider mb-12">
          Last updated: March 30, 2026
        </p>

        <div className="space-y-10 text-white/60 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-3">1. Information We Collect</h2>
            <p>
              When you visit AURA, we collect information you provide directly, such as your name,
              email address, shipping address, and payment information when making a purchase. We
              also automatically collect certain data including your IP address, browser type,
              device information, and browsing behavior through cookies and similar technologies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white/50">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Respond to customer service requests</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website and product offerings</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">3. Payment Processing</h2>
            <p>
              We use Stripe to process payments. Your payment card details are sent directly to
              Stripe and are never stored on our servers. Stripe is PCI DSS Level 1 certified,
              the highest level of certification available.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">4. Cookies</h2>
            <p>
              We use essential cookies to operate the site (cart, session) and optional analytics
              cookies to understand how visitors interact with our site. You can manage your cookie
              preferences through the consent banner shown on your first visit.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">5. Third-Party Services</h2>
            <p>We share data with the following third parties:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white/50">
              <li>Stripe — payment processing</li>
              <li>Shipping carriers — order fulfillment</li>
              <li>Analytics providers — site usage analysis</li>
            </ul>
            <p className="mt-2">We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">6. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white/50">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Request data portability</li>
              <li>Object to processing of your data</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:privacy@aura-sneakers.com" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
                privacy@aura-sneakers.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">7. GDPR (European Users)</h2>
            <p>
              If you are located in the European Economic Area, we process your data under the
              legal bases of contract performance (for orders), legitimate interest (for fraud
              prevention and site improvement), and consent (for marketing). You have the right
              to lodge a complaint with your local data protection authority.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">8. CCPA (California Residents)</h2>
            <p>
              California residents have the right to know what personal information is collected,
              request deletion, and opt out of the sale of personal information. We do not sell
              personal information. To exercise your rights, contact us at the email above.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">9. Data Retention</h2>
            <p>
              We retain your personal data for as long as necessary to fulfill the purposes for
              which it was collected, including legal, accounting, or reporting requirements.
              Order data is retained for 7 years for tax compliance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">10. Security</h2>
            <p>
              We implement industry-standard security measures including HTTPS encryption, secure
              payment processing, rate limiting, and access controls to protect your data. However,
              no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">11. Contact</h2>
            <p>
              For questions about this privacy policy, contact us at{' '}
              <a href="mailto:privacy@aura-sneakers.com" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
                privacy@aura-sneakers.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
