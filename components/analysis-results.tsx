"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Calendar,
  Download,
  Share2,
  Lightbulb,
  Shield,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Flag,
  MessageSquare,
  Leaf,
  Activity,
  Heart,
} from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"
import { PlantInfoCard } from "./plant-info-card"
import { FeedingSchedule } from "./feeding-schedule"

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

interface AnalysisResult {
  id: string
  timestamp: string
  filename: string
  result: {
    disease?: string
    name: string
    confidence: number
    severity: "healthy" | "mild" | "moderate" | "severe"
    symptoms: string[]
    treatment: string[] | string
    prevention: string[] | string
    careRecommendations: string[]
    nextCheckup: string
    species: PlantSpecies
  }
}

interface AnalysisResultsProps {
  result: AnalysisResult
  onNewAnalysis: () => void
}

export function AnalysisResults({ result, onNewAnalysis }: AnalysisResultsProps) {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [feedbackType, setFeedbackType] = useState<"accurate" | "inaccurate" | "partially_correct" | null>(null)
  const [userComments, setUserComments] = useState("")
  const [correctDiagnosis, setCorrectDiagnosis] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("health")
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
  const [plantNickname, setPlantNickname] = useState("")
  const [plantNotes, setPlantNotes] = useState("")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const submitFeedback = async (type: "accurate" | "inaccurate" | "partially_correct") => {
    setIsSubmitting(true)
    try {
      const { error } = await supabase.from("feedback").insert({
        scan_id: result.id,
        is_accurate: type === "accurate",
        feedback_type: type,
        user_comments: userComments || null,
        correct_diagnosis: correctDiagnosis || null,
      })

      if (error) {
        console.error("Error submitting feedback:", error)
        return
      }

      setFeedbackSubmitted(true)
      setShowFeedbackForm(false)
      console.log("[v0] Feedback submitted successfully")
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuickFeedback = (type: "accurate" | "inaccurate") => {
    setFeedbackType(type)
    if (type === "accurate") {
      submitFeedback(type)
    } else {
      setShowFeedbackForm(true)
    }
  }

  const saveToMyPlants = () => {
    const savedPlant = {
      id: result.id,
      nickname: plantNickname || result.result.species.commonNames[0],
      species: result.result.species,
      healthStatus: result.result.severity,
      dateAdded: new Date().toISOString(),
      lastAnalysis: result.timestamp,
      notes: plantNotes,
    }

    const existingPlants = JSON.parse(localStorage.getItem("myPlants") || "[]")
    const updatedPlants = [...existingPlants, savedPlant]
    localStorage.setItem("myPlants", JSON.stringify(updatedPlants))

    setIsSaveDialogOpen(false)
    setPlantNickname("")
    setPlantNotes("")
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "mild":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "moderate":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "severe":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-200"
      case "mild":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "moderate":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "severe":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {getSeverityIcon(result.result.severity)}
            <div>
              <h2 className="text-2xl font-bold text-foreground">{result.result.disease || result.result.name}</h2>
              <p className="text-sm text-muted-foreground">Analyzed on {formatDate(result.timestamp)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getSeverityColor(result.result.severity)}>
              {Math.round(result.result.confidence * 100)}% confidence
            </Badge>
            {result.result.confidence < 0.7 && (
              <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                Low Confidence
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={onNewAnalysis} variant="outline">
            Analyze Another Plant
          </Button>
          {/* Save to My Plants button */}
          <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Heart className="h-4 w-4" />
                Save to My Plants
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save to My Plants</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="plant-nickname">Plant Nickname</Label>
                  <Input
                    id="plant-nickname"
                    placeholder={result.result.species.commonNames[0]}
                    value={plantNickname}
                    onChange={(e) => setPlantNickname(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="plant-notes">Notes (optional)</Label>
                  <Textarea
                    id="plant-notes"
                    placeholder="Add any notes about this plant..."
                    value={plantNotes}
                    onChange={(e) => setPlantNotes(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={saveToMyPlants}>Save Plant</Button>
                  <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Share2 className="h-4 w-4" />
            Share Results
          </Button>
        </div>
      </Card>

      {/* Tabbed navigation for different analysis sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="health" className="gap-2">
            <Activity className="h-4 w-4" />
            Health Analysis
          </TabsTrigger>
          <TabsTrigger value="species" className="gap-2">
            <Leaf className="h-4 w-4" />
            Species Info
          </TabsTrigger>
          <TabsTrigger value="schedule" className="gap-2">
            <Calendar className="h-4 w-4" />
            Feeding Schedule
          </TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-6">
          {/* Accuracy feedback section */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Flag className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Is this diagnosis accurate?</h3>
            </div>

            {!feedbackSubmitted && !showFeedbackForm && (
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => handleQuickFeedback("accurate")}
                  variant="outline"
                  size="sm"
                  className="gap-2 text-green-600 border-green-300 hover:bg-green-50"
                  disabled={isSubmitting}
                >
                  <ThumbsUp className="h-4 w-4" />
                  Yes, accurate
                </Button>
                <Button
                  onClick={() => handleQuickFeedback("inaccurate")}
                  variant="outline"
                  size="sm"
                  className="gap-2 text-red-600 border-red-300 hover:bg-red-50"
                  disabled={isSubmitting}
                >
                  <ThumbsDown className="h-4 w-4" />
                  No, incorrect
                </Button>
                <Button
                  onClick={() => {
                    setFeedbackType("partially_correct")
                    setShowFeedbackForm(true)
                  }}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  disabled={isSubmitting}
                >
                  <MessageSquare className="h-4 w-4" />
                  Partially correct
                </Button>
              </div>
            )}

            {showFeedbackForm && (
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="correct-diagnosis">What is the correct diagnosis?</Label>
                    <Input
                      id="correct-diagnosis"
                      placeholder="Enter the correct plant condition"
                      value={correctDiagnosis}
                      onChange={(e) => setCorrectDiagnosis(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="comments">Additional comments (optional)</Label>
                  <Textarea
                    id="comments"
                    placeholder="Tell us more about what was incorrect or what we missed..."
                    value={userComments}
                    onChange={(e) => setUserComments(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => submitFeedback(feedbackType!)} disabled={isSubmitting} size="sm">
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </Button>
                  <Button
                    onClick={() => {
                      setShowFeedbackForm(false)
                      setFeedbackType(null)
                      setUserComments("")
                      setCorrectDiagnosis("")
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {feedbackSubmitted && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Thank you for your feedback! This helps improve our AI accuracy.</span>
              </div>
            )}
          </Card>

          {/* Accuracy disclaimer for low confidence results */}
          {result.result.confidence < 0.7 && (
            <Card className="p-4 border-yellow-200 bg-yellow-50">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">Low Confidence Detection</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    This diagnosis has lower confidence. Consider getting a second opinion from a plant expert or try
                    taking a clearer photo with better lighting.
                  </p>
                </div>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Symptoms */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Observed Symptoms</h3>
              </div>
              <ul className="space-y-2">
                {result.result.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{symptom}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Treatment */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Treatment Plan</h3>
              </div>
              <ul className="space-y-2">
                {Array.isArray(result.result.treatment) ? (
                  result.result.treatment.map((treatment, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{treatment}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{result.result.treatment}</span>
                  </li>
                )}
              </ul>
            </Card>

            {/* Prevention */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Prevention Tips</h3>
              </div>
              <ul className="space-y-2">
                {Array.isArray(result.result.prevention) ? (
                  result.result.prevention.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{result.result.prevention}</span>
                  </li>
                )}
              </ul>
            </Card>

            {/* Care Recommendations */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Care Schedule</h3>
              </div>
              <ul className="space-y-2 mb-4">
                {result.result.careRecommendations?.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{recommendation}</span>
                  </li>
                )) || (
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-muted-foreground">No specific care recommendations available</span>
                  </li>
                )}
              </ul>

              <Separator className="my-4" />

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Next checkup recommended: {formatDate(result.result.nextCheckup)}</span>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="species">
          {/* Species information display using the new PlantInfoCard component */}
          <PlantInfoCard species={result.result.species} />
        </TabsContent>

        <TabsContent value="schedule">
          {/* Feeding schedule creator using the new FeedingSchedule component */}
          <FeedingSchedule species={result.result.species} healthStatus={result.result.severity} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
