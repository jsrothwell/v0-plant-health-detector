import { Card } from "@/components/ui/card"
import { Upload, Brain, FileText, Heart } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload Photo",
    description: "Take or upload a clear photo of your plant showing any areas of concern",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our advanced AI analyzes the image for diseases, pests, and health indicators",
  },
  {
    icon: FileText,
    title: "Get Results",
    description: "Receive detailed diagnosis with confidence scores and identified issues",
  },
  {
    icon: Heart,
    title: "Care Plan",
    description: "Get personalized treatment recommendations and ongoing care tips",
  },
]

export function ProcessSection() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Get professional plant health insights in just four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={index} className="relative p-6 text-center">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {index + 1}
                </div>
              </div>

              <div className="mt-4 mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
              </div>

              <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground text-pretty">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
