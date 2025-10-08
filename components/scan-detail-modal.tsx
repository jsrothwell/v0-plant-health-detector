"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, TrendingUp, AlertTriangle, CheckCircle, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

interface ScanDetailModalProps {
  scan: any
  isOpen: boolean
  onClose: () => void
  onDelete?: (scanId: string) => void
}

export function ScanDetailModal({ scan, isOpen, onClose, onDelete }: ScanDetailModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!scan?.id || !onDelete) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/scans/${scan.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Scan deleted successfully")
        onDelete(scan.id)
        onClose()
      } else {
        toast.error("Failed to delete scan")
      }
    } catch (error) {
      toast.error("Failed to delete scan")
    } finally {
      setIsDeleting(false)
    }
  }

  if (!scan) return null

  const isHealthy = scan.analysis_result?.status === "healthy"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isHealthy ? (
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            )}
            {scan.disease_detected || "Healthy Plant"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="flex justify-center">
            <div className="w-64 h-64 bg-gray-100 rounded-lg overflow-hidden">
              {scan.image_url ? (
                <Image
                  src={scan.image_url || "/placeholder.svg"}
                  alt="Plant scan"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant={isHealthy ? "default" : "destructive"}>{scan.analysis_result?.status || "analyzed"}</Badge>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              {new Date(scan.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <TrendingUp className="h-4 w-4" />
              {scan.confidence_score}% confidence
            </div>
          </div>

          {/* Description */}
          {scan.analysis_result?.description && (
            <div>
              <h3 className="font-semibold mb-2">Analysis</h3>
              <p className="text-gray-700">{scan.analysis_result.description}</p>
            </div>
          )}

          {/* Symptoms */}
          {scan.analysis_result?.symptoms && scan.analysis_result.symptoms.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Symptoms Detected</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {scan.analysis_result.symptoms.map((symptom: string, index: number) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
            </div>
          )}

          <Separator />

          {/* Treatment */}
          {scan.analysis_result?.treatment && (
            <div>
              <h3 className="font-semibold mb-2">Recommended Treatment</h3>
              <p className="text-gray-700">{scan.analysis_result.treatment}</p>
            </div>
          )}

          {/* Prevention */}
          {scan.analysis_result?.prevention && (
            <div>
              <h3 className="font-semibold mb-2">Prevention Tips</h3>
              <p className="text-gray-700">{scan.analysis_result.prevention}</p>
            </div>
          )}

          {/* Care Recommendations */}
          {scan.analysis_result?.careRecommendations && scan.analysis_result.careRecommendations.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">General Care Tips</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {scan.analysis_result.careRecommendations.map((tip: string, index: number) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {onDelete && (
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                {isDeleting ? "Deleting..." : "Delete Scan"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
