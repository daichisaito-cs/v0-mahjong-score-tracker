"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BrandLogo } from "@/components/brand-logo"
import Link from "next/link"
import { useState } from "react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const redirectTo =
        typeof window !== "undefined" ? `${window.location.origin}/auth/reset-password` : undefined
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
      if (error) throw error
      // メールアドレスの存在有無は伏せて、常に成功扱いにする
      setSent(true)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "メールの送信に失敗しました")
    } finally {
      setIsLoading(false)
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
              <CardTitle className="text-2xl">パスワードの再設定</CardTitle>
              <CardDescription>
                登録済みのメールアドレスに、パスワード再設定用のリンクを送信します
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sent ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    入力されたメールアドレスが登録済みの場合、再設定用のリンクを記載したメールを送信しました。メールに記載のリンクからパスワードを再設定してください。
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/auth/login">ログイン画面へ戻る</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">メールアドレス</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@mail.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "送信中..." : "再設定メールを送信"}
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    <Link href="/auth/login" className="underline underline-offset-4 text-primary">
                      ログイン画面へ戻る
                    </Link>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
