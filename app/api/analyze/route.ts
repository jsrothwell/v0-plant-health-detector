import { type NextRequest, NextResponse } from "next/server"

// Mock plant diseases and conditions for demonstration
const mockDiseases = [
  {
    name: "Leaf Spot Disease",
    confidence: 0.85,
    severity: "moderate",
    symptoms: ["Brown spots on leaves", "Yellowing around spots", "Leaf drop"],
    treatment: [
      "Remove affected leaves immediately",
      "Improve air circulation around plant",
      "Apply fungicide spray every 7-10 days",
      "Avoid watering leaves directly",
    ],
    prevention: ["Water at soil level only", "Ensure good drainage", "Maintain proper spacing between plants"],
  },
  {
    name: "Nutrient Deficiency (Nitrogen)",
    confidence: 0.72,
    severity: "mild",
    symptoms: ["Yellowing of older leaves", "Stunted growth", "Pale green coloration"],
    treatment: [
      "Apply balanced liquid fertilizer",
      "Increase feeding frequency during growing season",
      "Check soil pH levels",
      "Consider slow-release fertilizer",
    ],
    prevention: ["Regular feeding schedule", "Use quality potting mix", "Monitor plant growth regularly"],
  },
]

const mockHealthyResults = {
  name: "Healthy Plant",
  confidence: 0.92,
  severity: "healthy",
  symptoms: ["Vibrant green leaves", "Strong stem structure", "Active growth"],
  treatment: ["Continue current care routine", "Monitor for any changes", "Maintain consistent watering schedule"],
  prevention: [
    "Regular inspection for early problem detection",
    "Maintain optimal light conditions",
    "Keep consistent care schedule",
  ],
}

// Mock plant species data for identification
const mockPlantSpecies = [
  {
    scientificName: "Monstera deliciosa",
    commonNames: ["Swiss Cheese Plant", "Split-leaf Philodendron"],
    family: "Araceae",
    origin: "Central America",
    difficulty: "Beginner",
    lightRequirements: "Bright, indirect light",
    humidity: "40-60%",
    temperature: "65-80°F (18-27°C)",
    matureSize: "6-10 feet indoors",
    growthRate: "Fast",
    toxicity: "Toxic to pets and children",
    commonIssues: [
      "Root rot from overwatering",
      "Brown leaf tips from low humidity",
      "Yellowing leaves from overwatering",
    ],
    seasonalCare: {
      spring: "Increase watering and begin fertilizing",
      summer: "Regular watering and monthly fertilizing",
      fall: "Reduce watering frequency",
      winter: "Water sparingly, no fertilizer",
    },
  },
  {
    scientificName: "Ficus lyrata",
    commonNames: ["Fiddle Leaf Fig"],
    family: "Moraceae",
    origin: "Western Africa",
    difficulty: "Intermediate",
    lightRequirements: "Bright, indirect light",
    humidity: "30-50%",
    temperature: "60-75°F (15-24°C)",
    matureSize: "6-10 feet indoors",
    growthRate: "Moderate",
    toxicity: "Mildly toxic to pets",
    commonIssues: ["Brown spots from overwatering", "Leaf drop from stress", "Insect infestations"],
    seasonalCare: {
      spring: "Resume regular watering and fertilizing",
      summer: "Weekly watering, bi-weekly fertilizing",
      fall: "Reduce watering frequency",
      winter: "Water only when soil is dry",
    },
  },
  {
    scientificName: "Sansevieria trifasciata",
    commonNames: ["Snake Plant", "Mother-in-Law's Tongue"],
    family: "Asparagaceae",
    origin: "West Africa",
    difficulty: "Beginner",
    lightRequirements: "Low to bright, indirect light",
    humidity: "30-50%",
    temperature: "60-80°F (15-27°C)",
    matureSize: "2-4 feet",
    growthRate: "Slow",
    toxicity: "Mildly toxic to pets",
    commonIssues: ["Root rot from overwatering", "Soft leaves from overwatering"],
    seasonalCare: {
      spring: "Water every 2-3 weeks",
      summer: "Water every 2-3 weeks",
      fall: "Water monthly",
      winter: "Water every 6-8 weeks",
    },
  },
]

export async function POST(request: NextRequest) {
  try {
    // const supabase = await createClient()
    // const {
    //   data: { user },
    //   error: authError,
    // } = await supabase.auth.getUser()
    // if (authError || !user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const formData = await request.formData()
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const identifiedSpecies = mockPlantSpecies[Math.floor(Math.random() * mockPlantSpecies.length)]

    // Mock analysis - in real implementation, this would call Hugging Face API
    const isHealthy = Math.random() > 0.4
    const result = isHealthy ? mockHealthyResults : mockDiseases[Math.floor(Math.random() * mockDiseases.length)]

    const analysisResult = {
      status: isHealthy ? "healthy" : "diseased",
      disease: result.name,
      confidence: result.confidence,
      severity: result.severity,
      symptoms: result.symptoms,
      treatment: result.treatment,
      prevention: result.prevention,
      description: isHealthy
        ? "Your plant appears to be in excellent health with vibrant foliage and strong structure."
        : `Detected ${result.name} with ${result.severity} severity. Immediate attention recommended.`,
      careRecommendations: [
        "Monitor plant daily for changes",
        "Maintain consistent watering schedule",
        "Ensure adequate light exposure",
        "Check soil moisture regularly",
      ],
      nextCheckup: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      species: {
        scientificName: identifiedSpecies.scientificName,
        commonNames: identifiedSpecies.commonNames,
        family: identifiedSpecies.family,
        origin: identifiedSpecies.origin,
        difficulty: identifiedSpecies.difficulty,
        lightRequirements: identifiedSpecies.lightRequirements,
        humidity: identifiedSpecies.humidity,
        temperature: identifiedSpecies.temperature,
        matureSize: identifiedSpecies.matureSize,
        growthRate: identifiedSpecies.growthRate,
        toxicity: identifiedSpecies.toxicity,
        commonIssues: identifiedSpecies.commonIssues,
        seasonalCare: identifiedSpecies.seasonalCare,
      },
    }

    // const { data: scanData, error: scanError } = await supabase
    //   .from("plant_scans")
    //   .insert({
    //     user_id: user.id,
    //     image_url: base64Image,
    //     analysis_result: analysisResult,
    //     confidence_score: Math.round(result.confidence * 100),
    //     disease_detected: isHealthy ? null : result.name,
    //   })
    //   .select()
    //   .single()

    // if (scanError) {
    //   console.error("Database error:", scanError)
    //   return NextResponse.json({ error: "Failed to save analysis" }, { status: 500 })
    // }

    return NextResponse.json({
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      filename: file.name,
      result: analysisResult,
      scanId: Math.random().toString(36).substr(2, 9),
    })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
