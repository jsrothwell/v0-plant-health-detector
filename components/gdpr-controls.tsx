"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Trash2, Shield, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function GDPRControls() {
  const [email, setEmail] = useState("")
  const [deleteReason, setDeleteReason] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleDataRequest = async (type: "export" | "delete") => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to proceed.",
        variant: "destructive",
      })
      return
    }

    if (type === "delete" && !deleteReason.trim()) {
      toast({
        title: "Reason required",
        description: "Please provide a reason for data deletion.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/gdpr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          email,
          reason: type === "delete" ? deleteReason : undefined,
        }),
      })

      if (response.ok) {
        toast({
          title: type === "export" ? "Data export requested" : "Data deletion requested",
          description: `We'll process your request and contact you at ${email} within 30 days.`,
        })
        setEmail("")
        setDeleteReason("")
      } else {
        throw new Error("Request failed")
      }
    } catch (error) {
      toast({
        title: "Request failed",
        description: "Please try again or contact us directly at info@lymegrove.com",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Your Data Rights</h2>
        <p className="text-muted-foreground">Exercise your GDPR rights to control your personal data</p>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Under GDPR, you have the right to access, rectify, erase, restrict, port, and object to the processing of your
          personal data. We'll respond to your request within 30 days.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Data Export */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              Export Your Data
            </CardTitle>
            <CardDescription>Download a copy of all personal data we have about you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="export-email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="export-email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button onClick={() => handleDataRequest("export")} disabled={isLoading} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Request Data Export
            </Button>
            <p className="text-xs text-muted-foreground">We'll email you a secure download link within 30 days</p>
          </CardContent>
        </Card>

        {/* Data Deletion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              Delete Your Data
            </CardTitle>
            <CardDescription>Request permanent deletion of your personal data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="delete-email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="delete-email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="delete-reason" className="text-sm font-medium">
                Reason for Deletion
              </label>
              <Textarea
                id="delete-reason"
                placeholder="Please tell us why you want to delete your data..."
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                rows={3}
              />
            </div>
            <Button
              onClick={() => handleDataRequest("delete")}
              disabled={isLoading}
              variant="destructive"
              className="w-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Request Data Deletion
            </Button>
            <p className="text-xs text-muted-foreground">
              This action cannot be undone. We'll confirm via email before proceeding.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contact for Other Rights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Other Data Rights
          </CardTitle>
          <CardDescription>Need to rectify, restrict, or object to data processing?</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            For other GDPR rights including data rectification, processing restrictions, or objections, please contact
            our Data Protection Officer directly.
          </p>
          <Button variant="outline" asChild>
            <a href="mailto:info@lymegrove.com?subject=GDPR Data Rights Request">
              <Mail className="h-4 w-4 mr-2" />
              Contact Data Protection Officer
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
