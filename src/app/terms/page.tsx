import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary,#050505)] pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-white uppercase tracking-tight mb-8">
          Terms of Service
        </h1>
        <p className="text-xs text-white/30 uppercase tracking-wider mb-12">
          Last updated: March 30, 2026
        </p>

        <div className="space-y-10 text-white/60 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the AURA website (aura-sneakers.com), you accept and agree
              to be bound by these Terms of Service. If you do not agree to these terms, please
              do not use our site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">2. Products & Pricing</h2>
            <p>
              All product descriptions, images, and pricing are subject to change without notice.
              We reserve the right to modify or discontinue any product at any time. Prices are
              displayed in USD and do not include applicable taxes or shipping costs unless
              otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">3. Orders & Payment</h2>
            <p>
              By placing an order, you represent that you are authorized to use the payment method
              provided. We reserve the right to refuse or cancel any order for any reason,
              including suspected fraud, unauthorized use, or violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">4. Shipping & Delivery</h2>
            <p>
              Shipping times are estimates and not guaranteed. AURA is not responsible for delays
              caused by shipping carriers, customs, weather, or other events outside our control.
              Risk of loss passes to you upon delivery to the carrier.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">5. Returns & Refunds</h2>
            <p>
              We accept returns within 30 days of delivery for unworn items in original packaging.
              Refunds are processed to the original payment method within 5-10 business days of
              receiving the return. Limited edition items are final sale and cannot be returned.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">6. Intellectual Property</h2>
            <p>
              All content on this website, including text, images, logos, product designs, and
              graphics, is the property of AURA and is protected by copyright and trademark laws.
              You may not reproduce, distribute, modify, or create derivative works from any
              content without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">7. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white/50">
              <li>Use automated tools, bots, or scrapers on our website</li>
              <li>Attempt to circumvent security measures or purchase limits</li>
              <li>Purchase products for the purpose of unauthorized resale</li>
              <li>Submit false or misleading information</li>
              <li>Interfere with the operation of the website</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">8. Purchase Limits</h2>
            <p>
              To ensure fair access, we reserve the right to limit purchase quantities per
              customer, per household, or per order. Orders that appear to violate these limits
              may be cancelled without notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">9. Limitation of Liability</h2>
            <p>
              AURA shall not be liable for any indirect, incidental, special, or consequential
              damages arising from your use of the website or purchase of products. Our total
              liability shall not exceed the amount paid for the specific product giving rise
              to the claim.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">10. Dispute Resolution</h2>
            <p>
              Any disputes arising from these terms or your use of the website shall be resolved
              through binding arbitration in accordance with applicable laws. You agree to waive
              your right to a jury trial or to participate in a class action.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">11. Changes to Terms</h2>
            <p>
              We may update these terms at any time. Continued use of the website after changes
              are posted constitutes acceptance of the new terms. We encourage you to review
              this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">12. Contact</h2>
            <p>
              For questions about these terms, contact us at{' '}
              <a href="mailto:legal@aura-sneakers.com" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
                legal@aura-sneakers.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
