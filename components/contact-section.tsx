"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/use-language"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [captcha, setCaptcha] = useState({ question: "", answer: 0 })
  const [captchaInput, setCaptchaInput] = useState("")
  const { toast } = useToast()
  const { t } = useLanguage()

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    const operations = ["+", "-", "×"]
    const operation = operations[Math.floor(Math.random() * operations.length)]

    let answer = 0
    let question = ""

    switch (operation) {
      case "+":
        answer = num1 + num2
        question = `${num1} + ${num2}`
        break
      case "-":
        answer = Math.max(num1, num2) - Math.min(num1, num2)
        question = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`
        break
      case "×":
        answer = num1 * num2
        question = `${num1} × ${num2}`
        break
    }

    setCaptcha({ question, answer })
    setCaptchaInput("")
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Number.parseInt(captchaInput) !== captcha.answer) {
      toast({
        title: "Captcha verification failed",
        description: "Please solve the math problem correctly to verify you're human.",
        variant: "destructive",
      })
      generateCaptcha()
      return
    }

    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 24 hours.",
        })
        e.currentTarget.reset()
        generateCaptcha()
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or use the contact form.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact-section" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t.contact.title}</h2>
            <p className="text-muted-foreground text-lg">{t.contact.description}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t.contact.sendMessage}</CardTitle>
              <CardDescription>{t.contact.formDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {t.contact.name} *
                    </label>
                    <Input id="name" name="name" required placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {t.contact.email} *
                    </label>
                    <Input id="email" name="email" type="email" required placeholder="your.email@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    {t.contact.subject} *
                  </label>
                  <Input id="subject" name="subject" required placeholder="What's this about?" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t.contact.message} *
                  </label>
                  <Textarea id="message" name="message" required rows={5} placeholder={t.contact.messagePlaceholder} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="captcha" className="text-sm font-medium">
                    Security Verification *
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                      <span className="font-mono text-lg">{captcha.question} = ?</span>
                      <Button type="button" variant="ghost" size="sm" onClick={generateCaptcha} className="h-6 w-6 p-0">
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </div>
                    <Input
                      id="captcha"
                      type="number"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      required
                      placeholder="Answer"
                      className="w-24"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Please solve the math problem to verify you're human</p>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    t.contact.sending
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {t.contact.sendButton}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
