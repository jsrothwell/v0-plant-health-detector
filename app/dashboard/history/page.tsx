"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Leaf, Calendar, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ScanDetailModal } from "@/components/scan-detail-modal"
import { useEffect, useState } from "react"

export default function HistoryPage() {
  const [scans, setScans] = useState<any[]>([])
  const [selectedScan, setSelectedScan] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchScans()
  }, [])

  const fetchScans = async () => {
    try {
      const response = await fetch("/api/scans")
      if (response.ok) {
        const data = await response.json()
        setScans(data.scans || [])
      }
    } catch (error) {
      console.error("Failed to fetch scans:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleScanClick = (scan: any) => {
    setSelectedScan(scan)
    setIsModalOpen(true)
  }

  const handleDeleteScan = (scanId: string) => {
    setScans(scans.filter((scan) => scan.id !== scanId))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your scan history...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Scan History</h1>
          <p className="text-gray-600">Review all your plant health analyses and track improvements over time</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-2xl font-bold">{scans.length || 0}</p>
                  <p className="text-sm text-gray-600">Total Scans</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-2xl font-bold text-emerald-600">
                    {scans.filter((scan) => scan.analysis_result?.status === "healthy").length || 0}
                  </p>
                  <p className="text-sm text-gray-600">Healthy</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-2xl font-bold text-amber-600">
                    {scans.filter((scan) => scan.analysis_result?.status === "diseased").length || 0}
                  </p>
                  <p className="text-sm text-gray-600">Issues Found</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {scans.length > 0
                      ? Math.round(scans.reduce((acc, scan) => acc + (scan.confidence_score || 0), 0) / scans.length)
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-gray-600">Avg Confidence</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scan History List */}
        {scans.length > 0 ? (
          <div className="space-y-4">
            {scans.map((scan) => (
              <Card
                key={scan.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleScanClick(scan)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                        {scan.image_url ? (
                          <Image
                            src={scan.image_url || "/placeholder.svg"}
                            alt="Plant scan"
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Leaf className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{scan.disease_detected || "Healthy Plant"}</h3>
                            <Badge variant={scan.analysis_result?.status === "healthy" ? "default" : "destructive"}>
                              {scan.analysis_result?.status || "analyzed"}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(scan.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              {scan.confidence_score}% confidence
                            </div>
                          </div>

                          {scan.analysis_result?.description && (
                            <p className="text-gray-700 text-sm">{scan.analysis_result.description}</p>
                          )}

                          {scan.analysis_result?.treatment && (
                            <div className="mt-3">
                              <h4 className="font-medium text-sm text-gray-900 mb-1">Recommended Treatment:</h4>
                              <p className="text-sm text-gray-600">{scan.analysis_result.treatment}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex-shrink-0">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center ${
                              scan.analysis_result?.status === "healthy" ? "bg-emerald-100" : "bg-amber-100"
                            }`}
                          >
                            {scan.analysis_result?.status === "healthy" ? (
                              <CheckCircle className="h-8 w-8 text-emerald-600" />
                            ) : (
                              <AlertTriangle className="h-8 w-8 text-amber-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Leaf className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No scans yet</h3>
              <p className="text-gray-600 mb-6">Start analyzing your plants to see your history here</p>
              <Button asChild>
                <Link href="/#upload">Take Your First Scan</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Scan Detail Modal */}
        <ScanDetailModal
          scan={selectedScan}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDelete={handleDeleteScan}
        />
      </div>
    </div>
  )
}
