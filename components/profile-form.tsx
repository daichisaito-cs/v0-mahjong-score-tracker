"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

interface ProfileFormProps {
  initialData: {
    displayName: string
    email: string
  }
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [displayName, setDisplayName] = useState(initialData.displayName)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const supabase = createClient()

    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) {
      setMessage({ type: "error", text: "ログインが必要です" })
      setIsLoading(false)
      return
    }

    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName, updated_at: new Date().toISOString() })
      .eq("id", userData.user.id)

    if (error) {
      setMessage({ type: "error", text: "更新に失敗しました" })
    } else {
      setMessage({ type: "success", text: "プロフィールを更新しました" })
      router.refresh()
    }

    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>プロフィール編集</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="displayName">表示名</Label>
            <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" value={initialData.email} disabled className="bg-muted" />
            <p className="text-xs text-muted-foreground">メールアドレスは変更できません</p>
          </div>
          {message && (
            <p className={`text-sm ${message.type === "success" ? "text-chart-1" : "text-destructive"}`}>
              {message.text}
            </p>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "更新中..." : "更新する"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
