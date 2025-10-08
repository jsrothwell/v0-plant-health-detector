"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Leaf, Calendar, Search, Plus, Trash2, Edit, Eye } from "lucide-react"

interface SavedPlant {
  id: string
  nickname: string
  species: {
    scientificName: string
    commonNames: string[]
    difficulty: string
  }
  healthStatus: string
  dateAdded: string
  lastAnalysis: string
  notes?: string
  image?: string
}

export function MyPlantsCollection() {
  const [savedPlants, setSavedPlants] = useState<SavedPlant[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlant, setSelectedPlant] = useState<SavedPlant | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingPlant, setEditingPlant] = useState<SavedPlant | null>(null)

  // Load saved plants from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("myPlants")
    if (saved) {
      setSavedPlants(JSON.parse(saved))
    }
  }, [])

  // Save plants to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem("myPlants", JSON.stringify(savedPlants))
  }, [savedPlants])

  const filteredPlants = savedPlants.filter(
    (plant) =>
      plant.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.species.commonNames.some((name) => name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      plant.species.scientificName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const deletePlant = (plantId: string) => {
    setSavedPlants((prev) => prev.filter((plant) => plant.id !== plantId))
  }

  const updatePlant = (updatedPlant: SavedPlant) => {
    setSavedPlants((prev) => prev.map((plant) => (plant.id === updatedPlant.id ? updatedPlant : plant)))
    setIsEditDialogOpen(false)
    setEditingPlant(null)
  }

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

  const getHealthColor = (health: string) => {
    switch (health) {
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

  if (savedPlants.length === 0) {
    return (
      <div className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Leaf className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">No Plants Saved Yet</h2>
          <p className="text-muted-foreground mb-6">
            Start analyzing your plants to build your personal plant collection. Each analysis can be saved to track
            your plants' health over time.
          </p>
          <Button asChild>
            <a href="#upload-section">
              <Plus className="h-4 w-4 mr-2" />
              Analyze Your First Plant
            </a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">My Plant Collection</h2>
          <p className="text-muted-foreground mb-6">
            Track and manage your plants' health over time. View analysis history and care schedules.
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your plants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Plants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map((plant) => (
            <Card key={plant.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Plant Image Placeholder */}
                <div className="w-full h-32 bg-muted/30 rounded-lg flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-muted-foreground" />
                </div>

                {/* Plant Info */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{plant.nickname}</h3>
                      <p className="text-sm text-muted-foreground">{plant.species.commonNames[0]}</p>
                      <p className="text-xs text-muted-foreground italic">{plant.species.scientificName}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge className={getDifficultyColor(plant.species.difficulty)} variant="outline">
                        {plant.species.difficulty}
                      </Badge>
                      <Badge className={getHealthColor(plant.healthStatus)} variant="outline">
                        {plant.healthStatus}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Added: {new Date(plant.dateAdded).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Last analysis: {new Date(plant.lastAnalysis).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {plant.notes && (
                    <p className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                      {plant.notes.length > 60 ? `${plant.notes.substring(0, 60)}...` : plant.notes}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedPlant(plant)} className="flex-1 gap-1">
                    <Eye className="h-3 w-3" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingPlant(plant)
                      setIsEditDialogOpen(true)
                    }}
                    className="gap-1"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deletePlant(plant.id)}
                    className="gap-1 text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Edit Plant Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Plant</DialogTitle>
            </DialogHeader>
            {editingPlant && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nickname">Plant Nickname</Label>
                  <Input
                    id="nickname"
                    value={editingPlant.nickname}
                    onChange={(e) => setEditingPlant({ ...editingPlant, nickname: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    value={editingPlant.notes || ""}
                    onChange={(e) => setEditingPlant({ ...editingPlant, notes: e.target.value })}
                    placeholder="Add notes about your plant..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => updatePlant(editingPlant)}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Plant Detail View */}
        {selectedPlant && (
          <Dialog open={!!selectedPlant} onOpenChange={() => setSelectedPlant(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selectedPlant.nickname}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Common Name:</span>
                    <span className="ml-2 font-medium">{selectedPlant.species.commonNames[0]}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Scientific Name:</span>
                    <span className="ml-2 font-medium italic">{selectedPlant.species.scientificName}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Difficulty:</span>
                    <Badge className={getDifficultyColor(selectedPlant.species.difficulty)} variant="outline">
                      {selectedPlant.species.difficulty}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Health Status:</span>
                    <Badge className={getHealthColor(selectedPlant.healthStatus)} variant="outline">
                      {selectedPlant.healthStatus}
                    </Badge>
                  </div>
                </div>
                {selectedPlant.notes && (
                  <div>
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">{selectedPlant.notes}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button onClick={() => setSelectedPlant(null)}>Close</Button>
                  <Button variant="outline">View Full Analysis</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
