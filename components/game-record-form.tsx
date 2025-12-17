"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface League {
  id: string
  name: string
  game_type: string
  uma_first: number
  uma_second: number
  uma_third: number
  uma_fourth: number
  oka: number
  starting_points: number
}

interface Friend {
  id: string
  display_name: string
}

interface PlayerResult {
  name: string
  score: string
  userId?: string
}

interface GameRecordFormProps {
  currentUserId: string
  currentUserName: string
  leagues: League[]
  friends: Friend[]
}

function calculatePoints(
  results: PlayerResult[],
  gameType: string,
  uma: number[],
  oka: number,
  startingPoints: number,
) {
  const playerCount = gameType === "four_player" ? 4 : 3

  const sorted = results
    .slice(0, playerCount)
    .map((r, originalIndex) => ({
      ...r,
      scoreNum: Number.parseInt(r.score) || 0,
      originalIndex,
    }))
    .sort((a, b) => b.scoreNum - a.scoreNum)

  const calculated = sorted.map((player, rankIndex) => {
    const rank = rankIndex + 1
    const basePoint = (player.scoreNum - startingPoints) / 1000
    const umaPoint = uma[rankIndex] || 0
    const okaPoint = rank === 1 ? oka * (playerCount - 1) : -oka
    const totalPoint = basePoint + umaPoint + okaPoint

    return {
      ...player,
      rank,
      point: totalPoint,
    }
  })

  const finalResults = new Array(playerCount)
  calculated.forEach((player) => {
    finalResults[player.originalIndex] = {
      rank: player.rank,
      point: player.point,
    }
  })

  return finalResults
}

export function GameRecordForm({ currentUserId, currentUserName, leagues, friends }: GameRecordFormProps) {
  const router = useRouter()
  const [gameType, setGameType] = useState<"four_player" | "three_player">("four_player")
  const [leagueId, setLeagueId] = useState<string>("none")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bonusPoints, setBonusPoints] = useState<number[]>([0, 0, 0, 0])

  const [players, setPlayers] = useState<PlayerResult[]>([
    { name: "", score: "", userId: undefined },
    { name: "", score: "", userId: undefined },
    { name: "", score: "", userId: undefined },
    { name: "", score: "", userId: undefined },
  ])

  const defaultUma = {
    four_player: [30, 10, -10, -30],
    three_player: [30, 0, -30, 0],
  }

  const playerCount = gameType === "four_player" ? 4 : 3
  const uma = defaultUma[gameType]
  const startingPoints = 25000
  const oka = 0

  const handleFriendSelect = (index: number, value: string) => {
    if (value === "manual") {
      setPlayers((prev) => {
        const updated = [...prev]
        updated[index] = { name: "", score: updated[index].score, userId: undefined }
        return updated
      })
    } else if (value === "self") {
      setPlayers((prev) => {
        const updated = [...prev]
        updated[index] = { name: currentUserName, score: updated[index].score, userId: currentUserId }
        return updated
      })
    } else {
      const friend = friends.find((f) => f.id === value)
      if (friend) {
        setPlayers((prev) => {
          const updated = [...prev]
          updated[index] = { name: friend.display_name, score: updated[index].score, userId: friend.id }
          return updated
        })
      }
    }
  }

  const updatePlayer = (index: number, field: "name" | "score", value: string) => {
    setPlayers((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const updateBonusPoint = (index: number, value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setBonusPoints((prev) => {
      const updated = [...prev]
      updated[index] = numValue
      return updated
    })
  }

  const previewResults = calculatePoints(players, gameType, uma, oka, startingPoints)

  const totalScore = players.slice(0, playerCount).reduce((sum, p) => sum + (Number.parseInt(p.score) || 0), 0)
  const expectedTotalScore = startingPoints * playerCount
  const scoreBalanceError = totalScore !== 0 && totalScore !== expectedTotalScore

  const totalPoints = previewResults ? previewResults.reduce((sum, r, i) => sum + r.point + bonusPoints[i], 0) : 0
  const pointBalanceError = previewResults && Math.abs(totalPoints) > 0.1

  const allFieldsFilled = players.slice(0, playerCount).every((p) => p.name && p.score)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitted || isLoading) return

    if (scoreBalanceError) {
      setError(
        `素点の合計が${expectedTotalScore.toLocaleString()}になっていません（現在: ${totalScore.toLocaleString()}）`,
      )
      return
    }

    if (pointBalanceError) {
      setError(`ポイントの合計がゼロになっていません（現在: ${totalPoints.toFixed(1)}）`)
      return
    }

    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { data: game, error: gameError } = await supabase
        .from("games")
        .insert({
          game_type: gameType,
          league_id: leagueId === "none" ? null : leagueId,
          created_by: currentUserId,
          played_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (gameError) throw gameError

      const calculatedResults = calculatePoints(players, gameType, uma, oka, startingPoints)

      const gameResults = players.slice(0, playerCount).map((player, index) => ({
        game_id: game.id,
        user_id: player.userId || null,
        player_name: player.name,
        rank: calculatedResults[index].rank,
        raw_score: Number.parseInt(player.score),
        point: calculatedResults[index].point + bonusPoints[index],
      }))

      const { error: resultsError } = await supabase.from("game_results").insert(gameResults)

      if (resultsError) throw resultsError

      setIsSubmitted(true)
      window.location.href = "/games"
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err !== null && "message" in err
            ? String((err as { message: unknown }).message)
            : "保存に失敗しました"
      setError(errorMessage)
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">対局タイプ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              type="button"
              variant={gameType === "four_player" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setGameType("four_player")}
            >
              四人麻雀
            </Button>
            <Button
              type="button"
              variant={gameType === "three_player" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setGameType("three_player")}
            >
              三人麻雀
            </Button>
          </div>
        </CardContent>
      </Card>

      {leagues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">リーグ（任意）</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={leagueId} onValueChange={setLeagueId}>
              <SelectTrigger>
                <SelectValue placeholder="リーグを選択（任意）" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">なし（フリー対局）</SelectItem>
                {leagues
                  .filter((l) => l.game_type === gameType)
                  .map((league) => (
                    <SelectItem key={league.id} value={league.id}>
                      {league.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">対局結果</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: playerCount }).map((_, index) => {
            const selectedValue = players[index].userId
              ? players[index].userId === currentUserId
                ? "self"
                : players[index].userId
              : players[index].name
                ? "manual"
                : ""

            return (
              <div key={index} className="space-y-2">
                <Label className="text-sm">プレイヤー{index + 1}</Label>
                <div className="flex gap-2 items-start">
                  <div className="flex-1">
                    <Select value={selectedValue} onValueChange={(value) => handleFriendSelect(index, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="フレンドまたは手動入力" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="self">自分 ({currentUserName})</SelectItem>
                        {friends.map((friend) => (
                          <SelectItem key={friend.id} value={friend.id}>
                            {friend.display_name}
                          </SelectItem>
                        ))}
                        <SelectItem value="manual">手動で入力...</SelectItem>
                      </SelectContent>
                    </Select>
                    {selectedValue === "manual" && (
                      <Input
                        placeholder="名前を入力"
                        value={players[index].name}
                        onChange={(e) => updatePlayer(index, "name", e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </div>
                  <div className="w-28">
                    <Label className="text-xs text-muted-foreground">素点</Label>
                    <Input
                      type="number"
                      placeholder="25000"
                      value={players[index].score}
                      onChange={(e) => updatePlayer(index, "score", e.target.value)}
                    />
                  </div>
                  <div className="w-20 text-right">
                    <Label className="text-xs text-muted-foreground">±pt</Label>
                    <div
                      className={cn(
                        "font-semibold text-sm",
                        previewResults[index]?.point >= 0 ? "text-chart-1" : "text-destructive",
                      )}
                    >
                      {previewResults[index]?.rank && `${previewResults[index].rank}位: `}
                      {previewResults[index]?.point >= 0 ? "+" : ""}
                      {previewResults[index]?.point.toFixed(1) || "0.0"}
                    </div>
                  </div>
                  <div className="w-20">
                    <Label className="text-xs text-muted-foreground">飛び賞</Label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0"
                      value={bonusPoints[index] || ""}
                      onChange={(e) => updateBonusPoint(index, e.target.value)}
                      className="h-9 text-sm"
                    />
                  </div>
                  <div className="w-20 text-right">
                    <Label className="text-xs text-muted-foreground">合計</Label>
                    <div
                      className={cn(
                        "font-bold text-sm",
                        (previewResults[index]?.point || 0) + bonusPoints[index] >= 0
                          ? "text-chart-1"
                          : "text-destructive",
                      )}
                    >
                      {(previewResults[index]?.point || 0) + bonusPoints[index] >= 0 ? "+" : ""}
                      {((previewResults[index]?.point || 0) + bonusPoints[index]).toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          <div className="pt-4 border-t border-border space-y-2">
            <p className="text-xs text-muted-foreground">
              ウマ: {uma.slice(0, playerCount).join(" / ")} ／ 持ち点: {startingPoints.toLocaleString()}
            </p>
            <div className="space-y-1">
              <div className={cn("text-xs", scoreBalanceError ? "text-destructive" : "text-muted-foreground")}>
                素点合計: {totalScore.toLocaleString()} {scoreBalanceError && "⚠️ 合計が一致しません"}
              </div>
              <div className={cn("text-xs font-semibold", pointBalanceError ? "text-destructive" : "text-chart-1")}>
                ポイント合計: {totalPoints >= 0 ? "+" : ""}
                {totalPoints.toFixed(1)} {pointBalanceError && "⚠️ ゼロになっていません"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1 bg-transparent"
          onClick={() => router.back()}
          disabled={isLoading || isSubmitted}
        >
          キャンセル
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={isLoading || isSubmitted || !allFieldsFilled || scoreBalanceError || pointBalanceError}
        >
          {isLoading || isSubmitted ? "保存中..." : "記録する"}
        </Button>
      </div>
    </form>
  )
}
