"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { cn } from "@/lib/utils"
import { Trash2 } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"

interface GameEditFormProps {
  gameId: string
  gameType: string
  appliedRule?: {
    returnPoints: number
    uma: number[]
  }
  results: {
    id: string
    name: string
    score: string
    userId: string
    bonusPoints: number
  }[]
}

function calculatePoints(
  scores: string[],
  gameType: string,
  uma: number[],
  returnPoints: number,
) {
  const playerCount = gameType === "four_player" ? 4 : 3

  const sorted = scores
    .slice(0, playerCount)
    .map((score, originalIndex) => ({
      score: Number.parseInt(score) || 0,
      originalIndex,
    }))
    .sort((a, b) => b.score - a.score)

  const calculated = sorted.map((player) => ({ ...player }))

  const groups: Array<typeof calculated> = []
  let currentGroup: typeof calculated = [calculated[0]]
  for (let i = 1; i < calculated.length; i++) {
    if (calculated[i].score === calculated[i - 1].score) {
      currentGroup.push(calculated[i])
    } else {
      groups.push(currentGroup)
      currentGroup = [calculated[i]]
    }
  }
  groups.push(currentGroup)

  const resolved = new Array(playerCount).fill(null).map(() => ({ rank: 0, point: 0 }))
  let rankCursor = 1
  for (const group of groups) {
    const rankStart = rankCursor
    const rankEnd = rankCursor + group.length - 1
    let totalUma = 0
    for (let rank = rankStart; rank <= rankEnd; rank++) {
      totalUma += uma[rank - 1] || 0
    }
    const avgUma = totalUma / group.length

    group.forEach((player) => {
      const basePoint = (player.score - returnPoints) / 1000
      resolved[player.originalIndex] = {
        rank: rankStart,
        point: Number((basePoint + avgUma).toFixed(2)),
      }
    })

    rankCursor += group.length
  }

  const finalResults = new Array(playerCount)
  resolved.forEach((player, idx) => {
    finalResults[idx] = player
  })

  return finalResults
}

export function GameEditForm({ gameId, gameType, appliedRule, results }: GameEditFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [scores, setScores] = useState(results.map((r) => r.score))
  const [bonusPoints, setBonusPoints] = useState(results.map((r) => r.bonusPoints || 0))
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const playerCount = gameType === "four_player" ? 4 : 3
  const uma =
    appliedRule?.uma && appliedRule.uma.length > 0
      ? appliedRule.uma
      : gameType === "four_player"
        ? [30, 10, -10, -30]
        : [30, 0, -30, 0]
  const returnPoints = appliedRule?.returnPoints ?? 30000

  const previewResults =
    scores.every((s) => s) ? calculatePoints(scores, gameType, uma, returnPoints) : null

  const updateBonusPoint = (index: number, value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setBonusPoints((prev) => {
      const updated = [...prev]
      updated[index] = numValue
      return updated
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitted || isLoading || isDeleting) return

    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const calculatedResults = calculatePoints(scores, gameType, uma, returnPoints)

      for (let i = 0; i < results.length && i < playerCount; i++) {
        const { error: updateError } = await supabase
          .from("game_results")
          .update({
            raw_score: Number.parseInt(scores[i]),
            rank: calculatedResults[i].rank,
            point: calculatedResults[i].point + bonusPoints[i],
            bonus_points: Number(bonusPoints[i].toFixed(2)),
          })
          .eq("id", results[i].id)

        if (updateError) throw updateError
      }

      setIsSubmitted(true)
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["games"] }),
        queryClient.invalidateQueries({ queryKey: ["game", gameId] }),
        queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
        queryClient.invalidateQueries({ queryKey: ["league-detail"] }),
      ])
      router.push(`/games/${gameId}`)
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
      const { error } = await supabase.from("games").delete().eq("id", gameId)

      if (error) throw error

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["games"] }),
        queryClient.invalidateQueries({ queryKey: ["game", gameId] }),
        queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
        queryClient.invalidateQueries({ queryKey: ["league-detail"] }),
      ])
      router.push("/games")
    } catch (err) {
      setError(err instanceof Error ? err.message : "削除に失敗しました")
      setIsDeleting(false)
    }
  }

  const isDisabled = isLoading || isDeleting || isSubmitted

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">スコア編集</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {results.slice(0, playerCount).map((result, index) => (
            <div key={result.id} className="flex gap-3 items-end">
              <div className="flex-1">
                <Label className="text-sm">プレイヤー{index + 1}</Label>
                <Input value={result.name} disabled className="bg-muted" />
              </div>
              <div className="w-28">
                <Label className="text-sm">素点</Label>
                <Input
                  type="number"
                  value={scores[index]}
                  onChange={(e) => {
                    const newScores = [...scores]
                    newScores[index] = e.target.value
                    setScores(newScores)
                  }}
                  disabled={isDisabled}
                />
              </div>
              <div className="w-24">
                <Label className="text-sm">飛び賞</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={bonusPoints[index] || ""}
                  onChange={(e) => updateBonusPoint(index, e.target.value)}
                  disabled={isDisabled}
                />
              </div>
              {previewResults && previewResults[index] && (
                <div className="w-20 text-right">
                  <div className="text-xs text-muted-foreground">{previewResults[index].rank}位</div>
                  <div
                    className={cn(
                      "font-semibold",
                      previewResults[index].point + bonusPoints[index] >= 0 ? "text-chart-1" : "text-destructive",
                    )}
                  >
                    {previewResults[index].point + bonusPoints[index] >= 0 ? "+" : ""}
                    {(previewResults[index].point + bonusPoints[index]).toFixed(2)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1" disabled={isDisabled}>
          キャンセル
        </Button>
        <Button type="submit" className="flex-1" disabled={isDisabled}>
          {isLoading || isSubmitted ? "更新中..." : "更新する"}
        </Button>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            disabled={isDisabled}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            この対局を削除
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>対局を削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消せません。対局データと全ての結果が完全に削除されます。
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
