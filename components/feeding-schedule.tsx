"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Calendar, Droplets, Leaf, Download, Share2, Clock } from "lucide-react"

interface PlantSpecies {
  scientificName: string
  commonNames: string[]
  difficulty: string
}

interface FeedingScheduleProps {
  species: PlantSpecies
  healthStatus: string
}

interface ScheduleDay {
  date: Date
  type: "water" | "fertilizer" | "flush"
  description: string
  dosage?: string
}

export function FeedingSchedule({ species, healthStatus }: FeedingScheduleProps) {
  const [potSize, setPotSize] = useState<string>("")
  const [growingSeason, setGrowingSeason] = useState<string>("")
  const [growthStage, setGrowthStage] = useState<string>("")
  const [schedule, setSchedule] = useState<ScheduleDay[]>([])
  const [showSchedule, setShowSchedule] = useState(false)

  const generateSchedule = () => {
    const scheduleData: ScheduleDay[] = []
    const startDate = new Date()

    // Generate 4-week schedule based on inputs
    for (let week = 0; week < 4; week++) {
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(startDate)
        currentDate.setDate(startDate.getDate() + week * 7 + day)

        let scheduleItem: ScheduleDay | null = null

        // Water-only days (most days)
        if (day % 2 === 0 || day === 1 || day === 3 || day === 5) {
          scheduleItem = {
            date: currentDate,
            type: "water",
            description: "Regular watering - check soil moisture first",
            dosage:
              potSize === "small"
                ? "1/4 cup"
                : potSize === "medium"
                  ? "1/2 cup"
                  : potSize === "large"
                    ? "3/4 cup"
                    : "1 cup",
          }
        }

        // Fertilizer days (weekly)
        if (day === 0 && growingSeason !== "winter") {
          scheduleItem = {
            date: currentDate,
            type: "fertilizer",
            description: getFertilizerRecommendation(),
            dosage: getFertilizerDosage(),
          }
        }

        // Flush days (bi-weekly)
        if (week % 2 === 0 && day === 6) {
          scheduleItem = {
            date: currentDate,
            type: "flush",
            description: "Flush with plain water to prevent salt buildup",
            dosage: "Until water runs clear from drainage holes",
          }
        }

        if (scheduleItem) {
          scheduleData.push(scheduleItem)
        }
      }
    }

    setSchedule(scheduleData)
    setShowSchedule(true)
  }

  const getFertilizerRecommendation = () => {
    if (species.scientificName.includes("Monstera")) {
      return "Balanced liquid fertilizer (20-20-20) diluted to half strength"
    } else if (species.scientificName.includes("Ficus")) {
      return "High-nitrogen fertilizer (3-1-2 ratio) for foliage growth"
    } else if (species.scientificName.includes("Sansevieria")) {
      return "Low-nitrogen succulent fertilizer (2-10-10)"
    }
    return "Balanced houseplant fertilizer (10-10-10)"
  }

  const getFertilizerDosage = () => {
    switch (potSize) {
      case "small":
        return "1/4 teaspoon per gallon of water"
      case "medium":
        return "1/2 teaspoon per gallon of water"
      case "large":
        return "3/4 teaspoon per gallon of water"
      case "extra-large":
        return "1 teaspoon per gallon of water"
      default:
        return "Follow package instructions"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "water":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "fertilizer":
        return "bg-green-100 text-green-800 border-green-200"
      case "flush":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "water":
        return <Droplets className="h-4 w-4" />
      case "fertilizer":
        return <Leaf className="h-4 w-4" />
      case "flush":
        return <Clock className="h-4 w-4" />
      default:
        return <Droplets className="h-4 w-4" />
    }
  }

  const exportSchedule = () => {
    const scheduleText = schedule
      .map(
        (item) =>
          `${item.date.toLocaleDateString()}: ${item.type.toUpperCase()} - ${item.description} (${item.dosage})`,
      )
      .join("\n")

    const blob = new Blob([scheduleText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${species.commonNames[0]}-feeding-schedule.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (showSchedule) {
    return (
      <Card className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                4-Week Feeding Schedule
              </h3>
              <p className="text-muted-foreground mt-1">Personalized schedule for your {species.commonNames[0]}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={exportSchedule} className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Schedule Parameters */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Schedule Parameters</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Pot Size:</span>
                <span className="ml-2 font-medium capitalize">{potSize.replace("-", " ")}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Season:</span>
                <span className="ml-2 font-medium capitalize">{growingSeason}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Growth Stage:</span>
                <span className="ml-2 font-medium capitalize">{growthStage}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Health:</span>
                <span className="ml-2 font-medium capitalize">{healthStatus}</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                <Droplets className="h-3 w-3 mr-1" />
                Water Only
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Leaf className="h-3 w-3 mr-1" />
                Fertilizer + Water
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                <Clock className="h-3 w-3 mr-1" />
                Flush/Plain Water
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Calendar View */}
          <div className="space-y-4">
            {[0, 1, 2, 3].map((week) => (
              <div key={week} className="space-y-2">
                <h4 className="font-medium text-foreground">Week {week + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
                  {schedule
                    .filter((item) => {
                      const itemWeek = Math.floor(
                        (item.date.getTime() - schedule[0].date.getTime()) / (7 * 24 * 60 * 60 * 1000),
                      )
                      return itemWeek === week
                    })
                    .map((item, index) => (
                      <div key={index} className="p-3 border rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {item.date.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <Badge className={getTypeColor(item.type)} variant="outline">
                            {getTypeIcon(item.type)}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                          {item.dosage && <p className="text-xs font-medium text-primary">{item.dosage}</p>}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Care Tips */}
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Weekly Care Tips</h4>
            <ul className="space-y-1 text-sm text-green-700">
              <li>• Always check soil moisture before watering</li>
              <li>• Water early morning for best absorption</li>
              <li>• Ensure proper drainage to prevent root rot</li>
              <li>• Adjust schedule based on environmental conditions</li>
              <li>• Monitor plant response and adjust as needed</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <Button onClick={() => setShowSchedule(false)} variant="outline">
              Create New Schedule
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Create Feeding Schedule
          </h3>
          <p className="text-muted-foreground mt-1">
            Generate a personalized 4-week care schedule for your {species.commonNames[0]}
          </p>
        </div>

        {/* Auto-filled Information */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium text-foreground mb-3">Plant Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Species:</span>
              <span className="ml-2 font-medium">{species.commonNames[0]}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Health Status:</span>
              <span className="ml-2 font-medium capitalize">{healthStatus}</span>
            </div>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="pot-size">Pot Size</Label>
            <Select value={potSize} onValueChange={setPotSize}>
              <SelectTrigger>
                <SelectValue placeholder="Select pot size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (4-6")</SelectItem>
                <SelectItem value="medium">Medium (6-8")</SelectItem>
                <SelectItem value="large">Large (8-12")</SelectItem>
                <SelectItem value="extra-large">Extra Large (12"+)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="growing-season">Growing Season</Label>
            <Select value={growingSeason} onValueChange={setGrowingSeason}>
              <SelectTrigger>
                <SelectValue placeholder="Select current season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spring">Spring</SelectItem>
                <SelectItem value="summer">Summer</SelectItem>
                <SelectItem value="fall">Fall</SelectItem>
                <SelectItem value="winter">Winter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="growth-stage">Growth Stage</Label>
            <Select value={growthStage} onValueChange={setGrowthStage}>
              <SelectTrigger>
                <SelectValue placeholder="Select growth stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seedling">Seedling</SelectItem>
                <SelectItem value="young">Young</SelectItem>
                <SelectItem value="mature">Mature</SelectItem>
                <SelectItem value="dormant">Dormant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={generateSchedule}
            disabled={!potSize || !growingSeason || !growthStage}
            size="lg"
            className="gap-2"
          >
            <Calendar className="h-4 w-4" />
            Generate Feeding Schedule
          </Button>
        </div>
      </div>
    </Card>
  )
}
