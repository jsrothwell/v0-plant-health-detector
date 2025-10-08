"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, Camera, ImageIcon, X, Loader2, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AnalysisResults } from "./analysis-results"

interface AnalysisResult {
  id: string
  timestamp: string
  filename: string
  result: {
    name: string
    confidence: number
    severity: "healthy" | "mild" | "moderate" | "severe"
    symptoms: string[]
    treatment: string[]
    prevention: string[]
  }
  careRecommendations: string[]
  nextCheckup: string
}

export function UploadSection() {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const { toast } = useToast()

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }, [])

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      })
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB.",
        variant: "destructive",
      })
      return
    }

    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setAnalysisResult(null) // Clear previous results
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    setAnalysisResult(null)
  }

  const analyzeImage = async () => {
    console.log("[v0] analyzeImage called, selectedFile:", selectedFile)
    if (!selectedFile) return

    setIsAnalyzing(true)
    console.log("[v0] Starting analysis...")

    try {
      const formData = new FormData()
      formData.append("image", selectedFile)
      console.log("[v0] FormData created, making API call...")

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      console.log("[v0] API response status:", response.status)
      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const result = await response.json()
      console.log("[v0] Analysis result:", result)
      setAnalysisResult(result)

      toast({
        title: "Analysis Complete!",
        description: `Your plant has been analyzed: ${result.result.name}`,
      })
    } catch (error) {
      console.error("[v0] Analysis error:", error)
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your plant. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
      console.log("[v0] Analysis finished")
    }
  }

  const startNewAnalysis = () => {
    setSelectedFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    setAnalysisResult(null)
  }

  if (analysisResult) {
    return (
      <section id="upload" className="py-20 bg-muted/30">
        <div className="container">
          <AnalysisResults result={analysisResult} onNewAnalysis={startNewAnalysis} />
        </div>
      </section>
    )
  }

  return (
    <section id="upload" className="py-20 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Upload Your Plant Photo
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Take a clear photo of your plant and let our AI analyze its health in seconds
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card className="p-8">
            {!selectedFile ? (
              <div
                className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                  dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Upload className="h-8 w-8 text-primary" />
                </div>

                <h3 className="mb-2 text-xl font-semibold text-foreground">Drop your plant photo here</h3>
                <p className="mb-6 text-muted-foreground">or click to browse from your device</p>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button asChild>
                    <label className="cursor-pointer gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Choose File
                      <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
                    </label>
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Camera className="h-4 w-4" />
                    Take Photo
                  </Button>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">Supports JPG, PNG, WebP up to 10MB</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative">
                  <img
                    src={previewUrl! || "/placeholder.svg"}
                    alt="Plant preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={removeFile}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>

                  <Button onClick={analyzeImage} disabled={isAnalyzing} size="lg" className="gap-2">
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing Plant...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Analyze Plant Health
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
