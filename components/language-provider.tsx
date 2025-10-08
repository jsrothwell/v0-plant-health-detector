"use client"

import type { ReactNode } from "react"
import { LanguageContext, useLanguageState } from "@/hooks/use-language"

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const languageState = useLanguageState()

  return <LanguageContext.Provider value={languageState}>{children}</LanguageContext.Provider>
}
