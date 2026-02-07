"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { BrandLogo } from "@/components/brand-logo"
import { Eye, EyeOff } from "lucide-react"

export default function InviteCompleteClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isSettingSession, setIsSettingSession] = useState(true)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [needsPassword, setNeedsPassword] = useState(false)

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
            setError("セッションの復元に失敗しました。招待メールのリンクをもう一度開いてください。")
          } else {
            setError(null)
            // remove tokens from url
            const url = new URL(window.location.href)
            url.searchParams.delete("access_token")
            url.searchParams.delete("refresh_token")
            url.searchParams.delete("expires_in")
            url.searchParams.delete("token_type")
            url.searchParams.delete("type")
            url.hash = ""
            router.replace(url.pathname + url.search)
          }
        })
        .then(async () => {
          const { data } = await supabase.auth.getUser()
          const needs = Boolean((data?.user?.user_metadata as any)?.needs_password)
          setNeedsPassword(needs)
          if (!needs) {
            setMessage("メール確認が完了しました。ダッシュボードへ移動します。")
            router.push("/dashboard")
          }
        })
        .finally(() => setIsSettingSession(false))
    } else {
      setIsSettingSession(false)
    }
  }, [router, searchParams])

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("パスワードが一致しません")
      return
    }
    if (password.length < 6) {
      setError("パスワードは6文字以上で入力してください")
      return
    }

    setIsSubmitting(true)
    setError(null)
    const supabase = createClient()

    try {
      const { error } = await supabase.auth.updateUser({
        password,
        data: { needs_password: false },
      })
      if (error) throw error
      setMessage("パスワードを設定しました。ダッシュボードへ移動します。")
      router.push("/dashboard")
    } catch (error) {
      setError(error instanceof Error ? error.message : "パスワードの設定に失敗しました")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex justify-center" aria-label="Janki">
            <BrandLogo className="h-10 w-auto" priority />
          </Link>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">招待が完了しました</CardTitle>
              <CardDescription>
                初回ログイン用にパスワードを設定し、サインインへ進んでください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isSettingSession ? (
                <p className="text-sm text-muted-foreground">準備中です…</p>
              ) : needsPassword ? (
                <form onSubmit={handleSetPassword} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="password">パスワード</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "パスワードを隠す" : "パスワードを表示"}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">パスワード（確認）</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        aria-label={showConfirmPassword ? "パスワードを隠す" : "パスワードを表示"}
                      >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  {message && <p className="text-sm text-green-600">{message}</p>}
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "設定中..." : "パスワードを設定"}
                  </Button>
                </form>
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
