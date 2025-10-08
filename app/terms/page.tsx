import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using PlantCare AI's plant health detection service, you accept and agree to be bound by
              the terms and provision of this agreement. If you do not agree to abide by the above, please do not use
              this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              PlantCare AI provides an AI-powered plant health analysis service that analyzes uploaded plant images to
              identify potential diseases, pests, and health issues, and provides care recommendations. Our service is
              for informational purposes only and should not replace professional horticultural advice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">User Responsibilities</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Acceptable Use</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Use the service only for legitimate plant health analysis purposes</li>
                  <li>Upload only images that you own or have permission to use</li>
                  <li>Provide accurate information when requested</li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Prohibited Activities</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Uploading inappropriate, offensive, or illegal content</li>
                  <li>Attempting to reverse engineer or copy our AI models</li>
                  <li>Using the service for commercial purposes without authorization</li>
                  <li>Interfering with the service's operation or security</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Accuracy and Limitations</h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 dark:text-yellow-200 font-medium">Important Disclaimer</p>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                Our AI analysis is not 100% accurate and should be used as a guide only. Always consult with
                professional horticulturists or plant experts for serious plant health issues.
              </p>
            </div>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Analysis results are estimates based on AI interpretation</li>
              <li>Accuracy may vary depending on image quality and plant conditions</li>
              <li>We do not guarantee the effectiveness of recommended treatments</li>
              <li>Users are responsible for verifying recommendations before application</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Intellectual Property</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Our Content</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All content, features, and functionality of PlantCare AI, including but not limited to text, graphics,
                  logos, and software, are owned by us and protected by copyright and other intellectual property laws.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Your Content</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You retain ownership of images you upload. By using our service, you grant us a limited license to
                  process your images for analysis purposes and to improve our AI models.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Privacy and Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and
              protect your information. By using our service, you consent to the collection and use of information as
              described in our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To the fullest extent permitted by law, PlantCare AI shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Plant damage or loss resulting from following our recommendations</li>
              <li>Loss of data or business interruption</li>
              <li>Any damages arising from use or inability to use the service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Service Availability</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to maintain service availability but do not guarantee uninterrupted access. We reserve the right
              to modify, suspend, or discontinue the service at any time with or without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may terminate or suspend your access to the service immediately, without prior notice, for any reason,
              including breach of these Terms of Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon
              posting. Your continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms shall be governed by and construed in accordance with applicable laws, without regard to
              conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-foreground font-medium">Email: info@lymegrove.com</p>
              <p className="text-muted-foreground">Subject: Terms of Service Inquiry</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
