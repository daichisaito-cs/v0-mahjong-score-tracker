"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  fallbackPath: string
  label?: string
  variant?: "ghost" | "outline"
  size?: "icon" | "sm" | "default"
}

export function BackButton({ fallbackPath, label, variant = "ghost", size }: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
      return
    }
    router.push(fallbackPath)
  }

  if (label) {
    return (
      <Button type="button" variant={variant} size={size ?? "sm"} className="gap-1.5 bg-transparent" onClick={handleBack}>
        <ArrowLeft className="w-4 h-4" />
        {label}
      </Button>
    )
  }

  return (
    <Button type="button" variant={variant} size={size ?? "icon"} onClick={handleBack}>
      <ArrowLeft className="h-5 w-5" />
    </Button>
  )
}
