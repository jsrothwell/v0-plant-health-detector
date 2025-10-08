import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GDPRControls } from "@/components/gdpr-controls"

export default function DataRightsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <GDPRControls />
        </div>
      </main>
      <Footer />
    </div>
  )
}
