"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"

export function RuleCreateForm({ currentUserId }: { currentUserId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    game_type: "four_player",
    starting_points: 25000,
    return_points: 30000,
    uma_first: 30,
    uma_second: 10,
    uma_third: -10,
    uma_fourth: -30,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()
    const { error } = await supabase.from("rules").insert({
      ...formData,
      created_by: currentUserId,
    })

    if (error) {
      console.error("Error creating rule:", error)
      alert("作成に失敗しました")
      setIsSubmitting(false)
      return
    }

    window.location.href = "/rules"
  }

  const oka =
    ((formData.return_points - formData.starting_points) * (formData.game_type === "four_player" ? 4 : 3)) / 1000

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>基本設定</CardTitle>
          <CardDescription>ルールの基本情報を入力してください</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">ルール名</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="例: 標準四麻"
              required
            />
          </div>

          <div>
            <Label htmlFor="game_type">ゲームタイプ</Label>
            <Select
              value={formData.game_type}
              onValueChange={(value) => setFormData({ ...formData, game_type: value })}
            >
              <SelectTrigger id="game_type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="four_player">四麻</SelectItem>
                <SelectItem value="three_player">三麻</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="starting_points">持ち点</Label>
              <Input
                id="starting_points"
                type="number"
                step="1000"
                value={formData.starting_points}
                onChange={(e) => setFormData({ ...formData, starting_points: Number.parseInt(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="return_points">返し</Label>
              <Input
                id="return_points"
                type="number"
                step="1000"
                value={formData.return_points}
                onChange={(e) => setFormData({ ...formData, return_points: Number.parseInt(e.target.value) })}
                required
              />
            </div>
          </div>

          <div>
            <Label>ウマ</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              <div>
                <Label htmlFor="uma_first" className="text-xs">
                  1位
                </Label>
                <Input
                  id="uma_first"
                  type="number"
                  value={formData.uma_first}
                  onChange={(e) => setFormData({ ...formData, uma_first: Number.parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="uma_second" className="text-xs">
                  2位
                </Label>
                <Input
                  id="uma_second"
                  type="number"
                  value={formData.uma_second}
                  onChange={(e) => setFormData({ ...formData, uma_second: Number.parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="uma_third" className="text-xs">
                  3位
                </Label>
                <Input
                  id="uma_third"
                  type="number"
                  value={formData.uma_third}
                  onChange={(e) => setFormData({ ...formData, uma_third: Number.parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="uma_fourth" className="text-xs">
                  4位
                </Label>
                <Input
                  id="uma_fourth"
                  type="number"
                  value={formData.uma_fourth}
                  onChange={(e) => setFormData({ ...formData, uma_fourth: Number.parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">オカ（自動計算）</div>
            <div className="text-lg font-bold">{oka}pt</div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "作成中..." : "作成する"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
