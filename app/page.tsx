import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { UploadSection } from "@/components/upload-section"
import { ProcessSection } from "@/components/process-section"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <div id="upload-section">
          <UploadSection />
        </div>
        <div id="process-section">
          <ProcessSection />
        </div>
        <FeaturesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
