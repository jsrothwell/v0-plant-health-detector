import { Card } from "@/components/ui/card"
import { Shield, Clock, BookOpen, TrendingUp, Users, Smartphone } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Disease Detection",
    description: "Identify over 50+ common plant diseases and pest problems with high accuracy",
  },
  {
    icon: Clock,
    title: "Instant Results",
    description: "Get comprehensive health analysis and recommendations in under 30 seconds",
  },
  {
    icon: BookOpen,
    title: "Care Library",
    description: "Access detailed care guides and treatment plans for thousands of plant species",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your plant's recovery and health improvements over time",
  },
  {
    icon: Users,
    title: "Expert Community",
    description: "Connect with plant experts and enthusiasts for additional support",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Works perfectly on all devices - analyze plants anywhere, anytime",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Everything You Need for Plant Care
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Comprehensive tools and insights to keep your plants healthy and thriving
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
