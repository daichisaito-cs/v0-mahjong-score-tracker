"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/brand-logo"

export default function SignUpCompleteClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isSettingSession, setIsSettingSession] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const hashParams = typeof window !== "undefined" ? new URLSearchParams(window.location.hash.slice(1)) : null
    const accessToken = searchParams.get("access_token") || hashParams?.get("access_token")
    const refreshToken = searchParams.get("refresh_token") || hashParams?.get("refresh_token")
    const supabase = createClient()

    if (accessToken && refreshToken) {
      supabase.auth
        .setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(({ error }) => {
          if (error) {
            setError("セッションの復元に失敗しました。メールのリンクをもう一度開いてください。")
          } else {
            setError(null)
            const url = new URL(window.location.href)
            url.searchParams.delete("access_token")
            url.searchParams.delete("refresh_token")
            url.searchParams.delete("expires_in")
            url.searchParams.delete("token_type")
            url.searchParams.delete("type")
            url.hash = ""
            router.replace(url.pathname + url.search)
            setMessage("メール確認が完了しました。ダッシュボードへ移動します。")
            router.push("/dashboard")
          }
        })
        .finally(() => setIsSettingSession(false))
    } else {
      setIsSettingSession(false)
    }
  }, [router, searchParams])

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex justify-center" aria-label="Janki">
            <BrandLogo className="h-10 w-auto" priority />
          </Link>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">メール確認が完了しました</CardTitle>
              <CardDescription>ダッシュボードへ移動します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isSettingSession ? (
                <p className="text-sm text-muted-foreground">準備中です…</p>
              ) : (
                <div className="space-y-3">
                  {message && <p className="text-sm text-green-600">{message}</p>}
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button className="w-full" onClick={() => router.push("/dashboard")}>
                    ダッシュボードへ
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
