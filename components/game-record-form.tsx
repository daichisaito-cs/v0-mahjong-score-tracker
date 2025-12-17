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
import { SessionSummaryDialog } from "@/components/session-summary-dialog"

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
  return_points: number
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
  defaultLeagueId?: string
  sessionData?: SessionData // セッションデータを受け取る
}

interface SessionData {
  gameType: string
  leagueId: string
  players: PlayerResult[]
  sessionResults: Array<{ players: string[]; points: number[] }>
}

function calculatePoints(
  results: PlayerResult[],
  gameType: string,
  uma: number[],
  oka: number,
  startingPoints: number,
  returnPoints: number,
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

  const okaPoints = ((returnPoints - startingPoints) * playerCount) / 1000

  // 同じ点数のプレイヤーをグループ化
  const groups: Array<typeof sorted> = []
  let currentGroup: typeof sorted = [sorted[0]]

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].scoreNum === sorted[i - 1].scoreNum) {
      currentGroup.push(sorted[i])
    } else {
      groups.push(currentGroup)
      currentGroup = [sorted[i]]
    }
  }
  groups.push(currentGroup)

  // 各グループに順位とポイントを割り当て
  const calculated: Array<{
    name: string
    scoreNum: number
    originalIndex: number
    userId?: string
    rank: number
    point: number
  }> = []

  let currentRank = 1

  for (const group of groups) {
    // グループ内の順位範囲（例：同率1位が2人なら1位と2位）
    const rankStart = currentRank
    const rankEnd = currentRank + group.length - 1

    // ウマの合計を計算
    let totalUma = 0
    for (let rank = rankStart; rank <= rankEnd; rank++) {
      totalUma += uma[rank - 1] || 0
    }
    const averageUma = totalUma / group.length

    // オカはグループ内に1位が含まれる場合のみ分配
    let averageOka = 0
    if (rankStart === 1) {
      averageOka = okaPoints / group.length
    }

    group.forEach((player) => {
      const basePoint = (player.scoreNum - returnPoints) / 1000
      const totalPoint = basePoint + averageUma + averageOka

      calculated.push({
        ...player,
        rank: rankStart, // 同点の場合も同じ順位（例: 両方とも1位）
        point: totalPoint,
      })
    })

    currentRank += group.length
  }

  // 元の順序に戻す
  const finalResults = new Array(playerCount)
  calculated.forEach((player) => {
    finalResults[player.originalIndex] = {
      rank: player.rank,
      point: player.point,
    }
  })

  return finalResults
}

export function GameRecordForm({
  currentUserId,
  currentUserName,
  leagues,
  friends,
  defaultLeagueId,
  sessionData,
}: GameRecordFormProps) {
  const router = useRouter()
  const [gameType, setGameType] = useState<"four_player" | "three_player">(
    (sessionData?.gameType as "four_player" | "three_player") || "four_player",
  )
  const [leagueId, setLeagueId] = useState<string>(sessionData?.leagueId || defaultLeagueId || "none")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bonusPoints, setBonusPoints] = useState<number[]>([0, 0, 0, 0])
  const [continueSession, setContinueSession] = useState(false) // 連続記録モード

  const [sessionResults, setSessionResults] = useState<Array<{ players: string[]; points: number[] }>>(
    sessionData?.sessionResults || [],
  )

  const [players, setPlayers] = useState<PlayerResult[]>(
    sessionData?.players || [
      { name: "", score: "", userId: undefined },
      { name: "", score: "", userId: undefined },
      { name: "", score: "", userId: undefined },
      { name: "", score: "", userId: undefined },
    ],
  )

  const [showSummaryDialog, setShowSummaryDialog] = useState(false)
  const [finalSessionResults, setFinalSessionResults] = useState<Array<{ players: string[]; points: number[] }>>([])

  const playerCount = gameType === "four_player" ? 4 : 3
  const selectedLeague = leagues.find((l) => l.id === leagueId)
  const uma = selectedLeague
    ? [selectedLeague.uma_first, selectedLeague.uma_second, selectedLeague.uma_third, selectedLeague.uma_fourth]
    : gameType === "four_player"
      ? [30, 10, -10, -30]
      : [30, 0, -30, 0]
  const startingPoints = selectedLeague?.starting_points || 25000
  const returnPoints = selectedLeague?.return_points || 30000
  const oka = selectedLeague?.oka || 0

  const handleFriendSelect = (index: number, value: string) => {
    if (value === "manual") {
      // 手動入力モードを有効化
      setPlayers((prev) => {
        const updated = [...prev]
        updated[index] = { name: "", score: updated[index].score, userId: undefined }
        return updated
      })
    } else if (value === "self") {
      // 手動入力モードを無効化
      setPlayers((prev) => {
        const updated = [...prev]
        updated[index] = { name: currentUserName, score: updated[index].score, userId: currentUserId }
        return updated
      })
    } else {
      // 手動入力モードを無効化
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

  const handleScoreBlur = (index: number) => {
    console.log("[v0] handleScoreBlur called for index:", index)
    console.log(
      "[v0] Current players scores:",
      players.slice(0, playerCount).map((p) => p.score),
    )

    // 入力値が数値として有効かチェック
    const currentScore = players[index].score
    if (currentScore && isNaN(Number(currentScore))) {
      console.log("[v0] Invalid score detected, clearing")
      setPlayers((prev) => {
        const updated = [...prev]
        updated[index] = { ...updated[index], score: "" }
        return updated
      })
      return
    }

    // 空でない素点の数をカウント（現在のフィールドを含む）
    const filledScoresCount = players.slice(0, playerCount).filter((p) => p.score && p.score.trim() !== "").length
    console.log("[v0] Filled scores count:", filledScoresCount)

    const shouldAutoFillLastScore = filledScoresCount === playerCount - 1

    if (shouldAutoFillLastScore) {
      const emptyIndex = players.slice(0, playerCount).findIndex((p) => !p.score || p.score.trim() === "")
      console.log("[v0] Empty index for auto-fill:", emptyIndex)

      if (emptyIndex !== -1) {
        const filledTotal = players
          .slice(0, playerCount)
          .reduce((sum, p, i) => (i !== emptyIndex ? sum + (Number(p.score) || 0) : sum), 0)
        const autoScore = startingPoints * playerCount - filledTotal

        console.log("[v0] Auto-calculating last score:", {
          filledTotal,
          startingPoints,
          playerCount,
          autoScore,
        })

        setPlayers((prev) => {
          const updated = [...prev]
          updated[emptyIndex] = { ...updated[emptyIndex], score: String(autoScore) }
          return updated
        })
      }
    }
  }

  // 4人全員分の名前と素点が入力されたかチェック
  const allFieldsFilled = players.slice(0, playerCount).every((p) => p.name && p.score)

  // ポイント計算は全員分入力完了後のみ
  const previewResults = allFieldsFilled
    ? calculatePoints(players, gameType, uma, oka, startingPoints, returnPoints)
    : null

  const totalScore = players.slice(0, playerCount).reduce((sum, p) => sum + (Number.parseInt(p.score) || 0), 0)
  const expectedTotalScore = startingPoints * playerCount
  const scoreBalanceError = allFieldsFilled && totalScore !== expectedTotalScore

  const totalPoints = previewResults ? previewResults.reduce((sum, r, i) => sum + r.point + bonusPoints[i], 0) : 0
  const pointBalanceError = previewResults && Math.abs(totalPoints) > 0.1

  const calculateSessionTotals = () => {
    if (sessionResults.length === 0) return []

    const totals: Record<string, { name: string; total: number }> = {}

    sessionResults.forEach((result) => {
      result.players.forEach((playerName, index) => {
        if (!totals[playerName]) {
          totals[playerName] = { name: playerName, total: 0 }
        }
        totals[playerName].total += result.points[index]
      })
    })

    // 現在の対局結果も追加
    if (allFieldsFilled && previewResults) {
      players.slice(0, playerCount).forEach((player, index) => {
        const playerName = player.name
        if (!totals[playerName]) {
          totals[playerName] = { name: playerName, total: 0 }
        }
        totals[playerName].total += (previewResults[index]?.point || 0) + bonusPoints[index]
      })
    }

    return Object.values(totals).sort((a, b) => b.total - a.total)
  }

  const sessionTotals = sessionResults.length > 0 ? calculateSessionTotals() : []

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

      const calculatedResults = calculatePoints(players, gameType, uma, oka, startingPoints, returnPoints)

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

      const newSessionResult = {
        players: players.slice(0, playerCount).map((p) => p.name),
        points: players.slice(0, playerCount).map((_, index) => calculatedResults[index].point + bonusPoints[index]),
      }
      const allSessionResults = [...sessionResults, newSessionResult]

      if (continueSession) {
        // セッションデータをURLパラメータに保存
        const sessionDataEncoded = encodeURIComponent(
          JSON.stringify({
            gameType,
            leagueId,
            players: players.slice(0, playerCount).map((p) => ({ name: p.name, score: "", userId: p.userId })),
            sessionResults: allSessionResults,
          }),
        )

        setIsSubmitted(true)
        window.location.href = `/games/new?session=${sessionDataEncoded}`
      } else {
        setIsSubmitted(true)
        if (sessionResults.length > 0) {
          setFinalSessionResults(allSessionResults)
          setShowSummaryDialog(true)
        } else {
          window.location.href = "/games"
        }
      }
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

  const handleCloseSummary = () => {
    setShowSummaryDialog(false)
    window.location.href = "/games"
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {sessionResults.length > 0 && (
          <Card className="bg-primary/5 border-primary">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                連続記録中（{sessionResults.length + 1}戦目） - 暫定合計
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {sessionTotals.map((player, index) => (
                  <div key={index} className="text-center p-2 bg-background rounded border">
                    <div className="text-sm font-medium truncate">{player.name}</div>
                    <div className={`text-lg font-bold ${player.total >= 0 ? "text-chart-1" : "text-destructive"}`}>
                      {player.total >= 0 ? "+" : ""}
                      {player.total.toFixed(1)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

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
                : ""

              return (
                <div key={index} className="space-y-2">
                  <Label className="text-sm">プレイヤー{index + 1}</Label>
                  <div className="flex gap-2 items-start">
                    <div className="flex-1 space-y-2">
                      <Select value={selectedValue} onValueChange={(value) => handleFriendSelect(index, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="フレンドを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="self">自分 ({currentUserName})</SelectItem>
                          {friends.map((friend) => (
                            <SelectItem key={friend.id} value={friend.id}>
                              {friend.display_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-28">
                      <Label className="text-xs text-muted-foreground">素点</Label>
                      <Input
                        type="number"
                        placeholder="25000"
                        value={players[index].score}
                        onChange={(e) => updatePlayer(index, "score", e.target.value)}
                        onBlur={() => handleScoreBlur(index)}
                      />
                    </div>
                    {/* 全員分入力完了後のみポイント表示 */}
                    {allFieldsFilled && previewResults && (
                      <>
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
                      </>
                    )}
                  </div>
                </div>
              )
            })}

            <div className="pt-4 border-t border-border space-y-2">
              <p className="text-xs text-muted-foreground">
                ウマ: {uma.slice(0, playerCount).join(" / ")} ／ 持ち点: {startingPoints.toLocaleString()} ／ 返し:{" "}
                {returnPoints.toLocaleString()}
                <br />
                <span className="text-[10px]">※ 同点の場合は順位点を分け合います</span>
              </p>
              {/* 全員分入力完了後のみ合計値を表示 */}
              {allFieldsFilled && (
                <div className="space-y-1">
                  <div className={cn("text-xs", scoreBalanceError ? "text-destructive" : "text-muted-foreground")}>
                    素点合計: {totalScore.toLocaleString()} {scoreBalanceError && "⚠️ 合計が一致しません"}
                  </div>
                  <div className={cn("text-xs font-semibold", pointBalanceError ? "text-destructive" : "text-chart-1")}>
                    ポイント合計: {totalPoints >= 0 ? "+" : ""}
                    {totalPoints.toFixed(1)} {pointBalanceError && "⚠️ ゼロになっていません"}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={() => {
              if (sessionResults.length > 0) {
                // セッション中の場合は対局一覧に戻る
                window.location.href = "/games"
              } else {
                router.back()
              }
            }}
            disabled={isLoading || isSubmitted}
          >
            キャンセル
          </Button>
          {!isSubmitted && (
            <Button
              type="submit"
              variant="secondary"
              className="flex-1"
              disabled={isLoading || !allFieldsFilled || scoreBalanceError || pointBalanceError}
              onClick={() => setContinueSession(true)}
            >
              続けて登録
            </Button>
          )}
          <Button
            type="submit"
            className="flex-1"
            disabled={isLoading || isSubmitted || !allFieldsFilled || scoreBalanceError || pointBalanceError}
            onClick={() => setContinueSession(false)}
          >
            {isLoading || isSubmitted ? "保存中..." : sessionResults.length > 0 ? "記録を終了する" : "記録する"}
          </Button>
        </div>
      </form>

      <SessionSummaryDialog
        open={showSummaryDialog}
        sessionResults={finalSessionResults}
        onClose={handleCloseSummary}
      />
    </>
  )
}
