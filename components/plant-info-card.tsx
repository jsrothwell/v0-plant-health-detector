"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Leaf, Sun, TrendingUp, AlertTriangle, Globe, Calendar, Shield } from "lucide-react"

interface PlantSpecies {
  scientificName: string
  commonNames: string[]
  family: string
  origin: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  lightRequirements: string
  humidity: string
  temperature: string
  matureSize: string
  growthRate: string
  toxicity: string
  commonIssues: string[]
  seasonalCare: {
    spring: string
    summer: string
    fall: string
    winter: string
  }
}

interface PlantInfoCardProps {
  species: PlantSpecies
}

export function PlantInfoCard({ species }: PlantInfoCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCurrentSeason = () => {
    const month = new Date().getMonth()
    if (month >= 2 && month <= 4) return "spring"
    if (month >= 5 && month <= 7) return "summer"
    if (month >= 8 && month <= 10) return "fall"
    return "winter"
  }

  const currentSeason = getCurrentSeason()

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-foreground">{species.scientificName}</h3>
              <p className="text-lg text-muted-foreground italic">{species.commonNames.join(", ")}</p>
            </div>
            <Badge className={getDifficultyColor(species.difficulty)}>{species.difficulty}</Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Leaf className="h-4 w-4" />
              <span>{species.family}</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span>{species.origin}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Care Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Sun className="h-4 w-4 text-primary" />
              Growing Conditions
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Light:</span>
                <span className="font-medium">{species.lightRequirements}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Humidity:</span>
                <span className="font-medium">{species.humidity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Temperature:</span>
                <span className="font-medium">{species.temperature}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Growth Information
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mature Size:</span>
                <span className="font-medium">{species.matureSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Growth Rate:</span>
                <span className="font-medium">{species.growthRate}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Toxicity Warning */}
        {species.toxicity.toLowerCase().includes("toxic") && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-800">Safety Warning</h4>
                <p className="text-sm text-red-700 mt-1">{species.toxicity}</p>
              </div>
            </div>
          </div>
        )}

        {/* Common Issues */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Common Issues & Prevention
          </h4>
          <ul className="space-y-2">
            {species.commonIssues.map((issue, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">{issue}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* Seasonal Care */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Seasonal Care Guide
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(species.seasonalCare).map(([season, care]) => (
              <div
                key={season}
                className={`p-3 rounded-lg border ${
                  season === currentSeason ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-border"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium capitalize text-foreground">{season}</span>
                  {season === currentSeason && (
                    <Badge variant="outline" className="text-xs">
                      Current
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{care}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
