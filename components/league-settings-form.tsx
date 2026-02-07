"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"

interface League {
  id: string
  name: string
  description: string | null
  game_type: string
  uma_first: number
  uma_second: number
  uma_third: number
  uma_fourth: number | null
  starting_points: number
}

interface LeagueSettingsFormProps {
  league: League
}

export function LeagueSettingsForm({ league }: LeagueSettingsFormProps) {
  const router = useRouter()
  const [name, setName] = useState(league.name)
  const [description, setDescription] = useState(league.description || "")
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isLoading || isDeleting) return

    setIsLoading(true)
    setError(null)
    setMessage(null)

    const supabase = createClient()

    try {
      const { error: updateError } = await supabase
        .from("leagues")
        .update({
          name: name.trim(),
          description: description.trim() || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", league.id)

      if (updateError) throw updateError

      setMessage("保存しました")
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : "更新に失敗しました")
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (isDeleting) return

    setIsDeleting(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("leagues").delete().eq("id", league.id)

      if (error) throw error

      window.location.href = "/leagues"
    } catch (err) {
      setError(err instanceof Error ? err.message : "削除に失敗しました")
      setIsDeleting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">基本情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">リーグ名</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading || isDeleting}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">説明</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              disabled={isLoading || isDeleting}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ルール設定（変更不可）</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>対局タイプ</Label>
            <Input value={league.game_type === "four_player" ? "四人麻雀" : "三人麻雀"} disabled className="bg-muted" />
          </div>
          <div className="grid gap-2">
            <Label>ウマ</Label>
            <Input
              value={`${league.uma_first} / ${league.uma_second} / ${league.uma_third}${
                league.game_type === "four_player" ? ` / ${league.uma_fourth}` : ""
              }`}
              disabled
              className="bg-muted"
            />
          </div>
          <p className="text-xs text-muted-foreground">ルール設定は対局結果の整合性のため変更できません</p>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {message && <p className="text-sm text-chart-1">{message}</p>}

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1 bg-transparent"
          onClick={() => router.back()}
          disabled={isLoading || isDeleting}
        >
          戻る
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading || isDeleting}>
          {isLoading ? "保存中..." : "保存"}
        </Button>
      </div>

      {/* 削除 */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            disabled={isLoading || isDeleting}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            このリーグを削除
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>リーグを削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消せません。リーグに紐づいた対局データからリーグ情報が削除されます。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "削除中..." : "削除する"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  )
}
