"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { type Language, type Translation, getTranslation } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: Translation
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export function useLanguageState() {
  const [language, setLanguageState] = useState<Language>("en")
  const [t, setTranslation] = useState<Translation>(getTranslation("en"))

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("preferred-language") as Language
    if (savedLanguage && ["en", "es", "fr", "de", "it", "pt"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
      setTranslation(getTranslation(savedLanguage))
    } else {
      // Detect browser language
      const browserLanguage = navigator.language.split("-")[0] as Language
      if (["en", "es", "fr", "de", "it", "pt"].includes(browserLanguage)) {
        setLanguageState(browserLanguage)
        setTranslation(getTranslation(browserLanguage))
      }
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    setTranslation(getTranslation(newLanguage))
    localStorage.setItem("preferred-language", newLanguage)

    // Update document language
    document.documentElement.lang = newLanguage
  }

  return { language, setLanguage, t }
}

export { LanguageContext }
