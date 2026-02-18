"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RuleEditFormProps {
  rule: {
    id: string
    name: string
    game_type: string
    starting_points: number
    return_points: number
    uma_first: number
    uma_second: number
    uma_third: number
    uma_fourth: number | null
  }
}

export function RuleEditForm({ rule }: RuleEditFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: rule.name,
    game_type: rule.game_type,
    starting_points: rule.starting_points as number | "",
    return_points: rule.return_points as number | "",
    uma_first: rule.uma_first as number | "",
    uma_second: rule.uma_second as number | "",
    uma_third: rule.uma_third as number | "",
    uma_fourth: (rule.uma_fourth ?? -30) as number | null | "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)

    const startingPoints = Number(formData.starting_points)
    const returnPoints = Number(formData.return_points)
    const umaFirst = Number(formData.uma_first)
    const umaSecond = Number(formData.uma_second)
    const umaThird = Number(formData.uma_third)
    const umaFourth = formData.game_type === "four_player" ? Number(formData.uma_fourth) : null
    const umaTotal =
      formData.game_type === "four_player" ? umaFirst + umaSecond + umaThird + Number(umaFourth) : umaFirst + umaSecond + umaThird

    if (
      [startingPoints, returnPoints, umaFirst, umaSecond, umaThird].some((value) => Number.isNaN(value)) ||
      (formData.game_type === "four_player" && Number.isNaN(umaFourth))
    ) {
      alert("数値を入力してください")
      setIsSubmitting(false)
      return
    }

    if (umaTotal !== 0) {
      alert("ウマの合計は0にしてください")
      setIsSubmitting(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase
      .from("rules")
      .update({
        name: formData.name,
        game_type: formData.game_type,
        starting_points: startingPoints,
        return_points: returnPoints,
        uma_first: umaFirst,
        uma_second: umaSecond,
        uma_third: umaThird,
        uma_fourth: umaFourth,
      })
      .eq("id", rule.id)

    if (error) {
      console.error("Error updating rule:", error)
      alert("更新に失敗しました")
      setIsSubmitting(false)
      return
    }

    await queryClient.invalidateQueries({ queryKey: ["rules"] })
    router.push("/rules")
  }

  const oka =
    ((Number(formData.return_points || 0) - Number(formData.starting_points || 0)) *
      (formData.game_type === "four_player" ? 4 : 3)) /
    1000
  const gameTypeLabel = formData.game_type === "four_player" ? "四麻" : "三麻"
  const formatUma = (value: number | "" | null) => {
    if (value === "" || value === null) return "-"
    if (Number.isNaN(Number(value))) return "-"
    return String(value)
  }
  const umaPreview = [
    formData.uma_first,
    formData.uma_second,
    formData.uma_third,
    ...(formData.game_type === "four_player" ? [formData.uma_fourth] : []),
  ]
    .map(formatUma)
    .join(" / ")

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>基本設定</CardTitle>
          <CardDescription>ルールの基本情報と得点設定を編集してください</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="name">ルール名</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="例: 標準四麻"
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="game_type">ゲームタイプ</Label>
            <Select
              value={formData.game_type}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  game_type: value,
                  uma_fourth: value === "four_player" ? prev.uma_fourth ?? -30 : null,
                }))
              }
            >
              <SelectTrigger id="game_type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="four_player">四麻</SelectItem>
                <SelectItem value="three_player">三麻</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">対局タイプに応じて必要な項目が変わります</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="starting_points">持ち点</Label>
              <Input
                id="starting_points"
                type="number"
                step="1000"
                value={formData.starting_points}
                className="text-right"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    starting_points: e.target.value === "" ? "" : Number.parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="return_points">返し</Label>
              <Input
                id="return_points"
                type="number"
                step="1000"
                value={formData.return_points}
                className="text-right"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    return_points: e.target.value === "" ? "" : Number.parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>ウマ</Label>
            <div
              className={`grid gap-2 ${
                formData.game_type === "four_player" ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"
              }`}
            >
              <div className="space-y-1">
                <Label htmlFor="uma_first" className="text-xs">
                  1位
                </Label>
                <Input
                  id="uma_first"
                  type="number"
                  value={formData.uma_first}
                  className="text-right"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      uma_first: e.target.value === "" ? "" : Number.parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="uma_second" className="text-xs">
                  2位
                </Label>
                <Input
                  id="uma_second"
                  type="number"
                  value={formData.uma_second}
                  className="text-right"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      uma_second: e.target.value === "" ? "" : Number.parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="uma_third" className="text-xs">
                  3位
                </Label>
                <Input
                  id="uma_third"
                  type="number"
                  value={formData.uma_third}
                  className="text-right"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      uma_third: e.target.value === "" ? "" : Number.parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              {formData.game_type === "four_player" && (
                <div className="space-y-1">
                  <Label htmlFor="uma_fourth" className="text-xs">
                    4位
                  </Label>
                  <Input
                    id="uma_fourth"
                    type="number"
                    value={formData.uma_fourth ?? ""}
                    className="text-right"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        uma_fourth: e.target.value === "" ? "" : Number.parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg border bg-muted/40 p-4 space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center rounded-full bg-background px-2 py-1 border">プレビュー</span>
              <span>ゲーム: {gameTypeLabel}</span>
              <span>持ち点: {formData.starting_points || "-"}点</span>
              <span>返し: {formData.return_points || "-"}点</span>
            </div>
            <div className="text-sm font-medium">ウマ: {umaPreview}</div>
            <div className="text-sm text-muted-foreground">オカ（自動計算）: {oka}pt</div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
              キャンセル
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "更新中..." : "更新する"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
