"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Camera, Sparkles } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function HeroSection() {
  const { t } = useLanguage()

  const scrollToUpload = () => {
    document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToProcess = () => {
    document.getElementById("process-section")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 py-20 md:py-32">
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20">
            <Sparkles className="h-4 w-4" />
            {t.hero.badge}
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl text-balance">
            {t.hero.title.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {t.hero.title.split(" ").slice(-2).join(" ")}
            </span>
          </h1>

          <p className="mb-8 text-lg text-foreground/80 sm:text-xl text-pretty max-w-2xl mx-auto">{t.hero.subtitle}</p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-2" onClick={scrollToUpload}>
              <Camera className="h-5 w-5" />
              {t.hero.analyzeButton}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToProcess}>
              {t.hero.learnButton}
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-card border">
            <img
              src="/healthy-green-monstera-plant-in-pot.jpg"
              alt="Healthy plant example"
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                ✓ Healthy
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-card border">
            <img
              src="/plant-with-yellow-leaves-disease-symptoms.jpg"
              alt="Plant with issues"
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <div className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-600">
                ⚠ Needs Care
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-card border">
            <img
              src="/thriving-indoor-garden-with-multiple-healthy-plant.jpg"
              alt="Thriving plants"
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                ✓ Thriving
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
