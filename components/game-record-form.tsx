"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { SessionSummaryDialog, type SessionResult, type SessionPlayer } from "@/components/session-summary-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface League {
  id: string
  name: string
  game_type: string
  rule_id?: string | null
  uma_first: number
  uma_second: number
  uma_third: number
  uma_fourth: number | null
  oka: number
  starting_points: number
  return_points: number
}

interface Rule {
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

interface Friend {
  id: string
  display_name: string
  avatar_url?: string | null
}

interface PlayerResult {
  name: string
  score: string
  userId?: string
  avatarUrl?: string | null
  isManual?: boolean
}

interface GameRecordFormProps {
  currentUserId: string
  currentUserName: string
  currentUserAvatarUrl?: string | null
  leagues: League[]
  rules: Rule[]
  friends: Friend[]
  defaultLeagueId?: string
  sessionData?: SessionData // セッションデータを受け取る
}

interface SessionData {
  gameType: string
  leagueId: string
  ruleId?: string
  players: PlayerResult[]
  sessionResults: SessionResult[]
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
  currentUserAvatarUrl,
  leagues,
  rules,
  friends,
  defaultLeagueId,
  sessionData,
}: GameRecordFormProps) {
  const router = useRouter()

  const normalizeSessionResults = (results?: SessionResult[]) =>
    (results || []).map((result) => ({
      players: (result?.players || []).map((player: any) =>
        typeof player === "string"
          ? { name: player }
          : { name: player.name, userId: player.userId, avatarUrl: player.avatarUrl, isManual: player.isManual },
      ),
      points: result?.points || [],
    }))

  const [gameType, setGameType] = useState<"four_player" | "three_player">(
    (sessionData?.gameType as "four_player" | "three_player") || "four_player",
  )
  const [leagueId, setLeagueId] = useState<string>(sessionData?.leagueId || defaultLeagueId || "none")
  const [ruleId, setRuleId] = useState<string>(sessionData?.ruleId || "")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bonusPoints, setBonusPoints] = useState<number[]>([0, 0, 0, 0])
  const [continueSession, setContinueSession] = useState(false) // 連続記録モード

  const [sessionResults, setSessionResults] = useState<SessionResult[]>(normalizeSessionResults(sessionData?.sessionResults))

  const [players, setPlayers] = useState<PlayerResult[]>(
    sessionData?.players
      ? sessionData.players.map((p) => ({
          name: p.name,
          score: p.score ?? "",
          userId: p.userId,
          avatarUrl: p.avatarUrl,
          isManual: p.isManual,
        }))
      : [
          { name: "", score: "", userId: undefined, avatarUrl: undefined, isManual: false },
          { name: "", score: "", userId: undefined, avatarUrl: undefined, isManual: false },
          { name: "", score: "", userId: undefined, avatarUrl: undefined, isManual: false },
          { name: "", score: "", userId: undefined, avatarUrl: undefined, isManual: false },
        ],
  )

  const [showSummaryDialog, setShowSummaryDialog] = useState(false)
  const [finalSessionResults, setFinalSessionResults] = useState<SessionResult[]>([])

  const playerCount = gameType === "four_player" ? 4 : 3
  const selectedLeague = leagues.find((l) => l.id === leagueId)
  const selectedRule = rules.find((rule) => rule.id === ruleId)
  const selectedLeagueRule = selectedLeague?.rule_id
    ? rules.find((rule) => rule.id === selectedLeague.rule_id)
    : null
  const isFreeGame = leagueId === "none"
  const activeRule = isFreeGame ? selectedRule : selectedLeagueRule

  const umaSource = activeRule ?? selectedLeague ?? null
  const uma = umaSource
    ? [
        umaSource.uma_first,
        umaSource.uma_second,
        umaSource.uma_third,
        umaSource.uma_fourth ?? -30,
      ]
    : gameType === "four_player"
      ? [30, 10, -10, -30]
      : [30, 0, -30, 0]
  const startingPoints = activeRule?.starting_points ?? selectedLeague?.starting_points ?? 25000
  const returnPoints = activeRule?.return_points ?? selectedLeague?.return_points ?? 30000
  const oka = selectedLeague?.oka || 0

  const rulesForGameType = rules.filter((rule) => rule.game_type === gameType)
  const ruleUnavailable = isFreeGame && rulesForGameType.length === 0
  const ruleSelectionMissing = isFreeGame && rulesForGameType.length > 0 && !selectedRule

  useEffect(() => {
    if (!selectedRule) return
    if (selectedRule.game_type !== gameType) {
      setRuleId("")
    }
  }, [gameType, selectedRule])

  const handleFriendSelect = (index: number, value: string) => {
    if (value === "manual") {
      // 手動入力モードを有効化
      setPlayers((prev) => {
        const updated = [...prev]
        updated[index] = { name: "", score: updated[index].score, userId: undefined, avatarUrl: undefined, isManual: true }
        return updated
      })
    } else if (value === "self") {
      // 手動入力モードを無効化
      setPlayers((prev) => {
        const updated = [...prev]
        updated[index] = {
          name: currentUserName,
          score: updated[index].score,
          userId: currentUserId,
          avatarUrl: currentUserAvatarUrl,
          isManual: false,
        }
        return updated
      })
    } else {
      // 手動入力モードを無効化
      const friend = friends.find((f) => f.id === value)
      if (friend) {
        setPlayers((prev) => {
          const updated = [...prev]
          updated[index] = {
            name: friend.display_name,
            score: updated[index].score,
            userId: friend.id,
            avatarUrl: friend.avatar_url,
            isManual: false,
          }
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

  const maybeAutofillFourth = () => {
    if (playerCount !== 4 && playerCount !== 3) return
    const targetIndex = playerCount === 4 ? 3 : 2
    const targetPlayer = players[targetIndex]
    if (targetPlayer.isManual) return
    if (targetPlayer.score) return

    const filledScores = players.slice(0, targetIndex).map((p) => Number.parseInt(p.score))
    if (filledScores.some((s) => Number.isNaN(s))) return

    const remaining = expectedTotalScore - filledScores.reduce((sum, s) => sum + s, 0)
    setPlayers((prev) => {
      const updated = [...prev]
      updated[targetIndex] = { ...updated[targetIndex], score: remaining.toString() }
      return updated
    })
  }

  const calculateSessionTotals = () => {
    if (sessionResults.length === 0) return []

    const totals: Record<string, { name: string; total: number; avatarUrl?: string | null }> = {}

    sessionResults.forEach((result) => {
      result.players.forEach((player, index) => {
        const key = player.userId || player.name
        if (!totals[key]) {
          totals[key] = { name: player.name, avatarUrl: player.avatarUrl, total: 0 }
        }
        totals[key].total += result.points[index] || 0
        if (!totals[key].avatarUrl && player.avatarUrl) {
          totals[key].avatarUrl = player.avatarUrl
        }
      })
    })

    // 現在の対局結果も追加
    if (allFieldsFilled && previewResults) {
      players.slice(0, playerCount).forEach((player, index) => {
        const key = player.userId || player.name
        if (!totals[key]) {
          totals[key] = { name: player.name, avatarUrl: player.avatarUrl, total: 0 }
        }
        totals[key].total += (previewResults[index]?.point || 0) + bonusPoints[index]
        if (!totals[key].avatarUrl && player.avatarUrl) {
          totals[key].avatarUrl = player.avatarUrl
        }
      })
    }

    return Object.values(totals).sort((a, b) => b.total - a.total)
  }

  const sessionTotals = sessionResults.length > 0 ? calculateSessionTotals() : []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitted || isLoading) return

    if (ruleUnavailable) {
      setError("この対局タイプのルールがありません")
      return
    }

    if (ruleSelectionMissing) {
      setError("フリー対局はルールを選択してください")
      return
    }

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
        bonus_points: bonusPoints[index],
      }))

      const { error: resultsError } = await supabase.from("game_results").insert(gameResults)

      if (resultsError) throw resultsError

      // Keep only recent games per creator; stats are preserved via rollups.
      // Non-fatal: recording the game should succeed even if pruning fails.
      const { error: pruneError } = await supabase.rpc("rollup_and_prune_games_for_user", { p_keep: 30 })
      if (pruneError) {
        // eslint-disable-next-line no-console
        console.warn("[v0] rollup_and_prune_games_for_user failed:", pruneError)
      }

      const newSessionResult: SessionResult = {
        players: players.slice(0, playerCount).map((p) => ({
          name: p.name,
          userId: p.userId,
          // avatarUrlはURLが長くなるのでセッション保存時は持たせない
          isManual: p.isManual,
        })),
        points: players.slice(0, playerCount).map((_, index) => calculatedResults[index].point + bonusPoints[index]),
      }
      const allSessionResults = [...sessionResults, newSessionResult]

      if (continueSession) {
        // セッションデータをURLパラメータに保存
        const sessionDataEncoded = encodeURIComponent(
          JSON.stringify({
            gameType,
            leagueId,
            ruleId,
            players: players.slice(0, playerCount).map((p) => ({
              name: p.name,
              score: "",
              userId: p.userId,
              // セッションURLを短く保つためavatarUrlは持たせない
              isManual: p.isManual,
            })),
            sessionResults: allSessionResults.map((res) => ({
              players: res.players.map((p) => ({
                name: p.name,
                userId: p.userId,
                isManual: p.isManual,
              })),
              points: res.points,
            })),
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

        {isFreeGame && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">ルール（必須）</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {rulesForGameType.length > 0 ? (
                <Select value={ruleId} onValueChange={setRuleId}>
                  <SelectTrigger>
                    <SelectValue placeholder="ルールを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {rulesForGameType.map((rule) => (
                      <SelectItem key={rule.id} value={rule.id}>
                        {rule.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    この対局タイプのルールがありません。先にルールを作成してください。
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/rules/new">ルールを作成</Link>
                  </Button>
                </div>
              )}
              {ruleSelectionMissing && (
                <p className="text-xs text-destructive">フリー対局はルールを選択してください</p>
              )}
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
              const preview = allFieldsFilled && previewResults ? previewResults[index] : null
              const basePoint = preview?.point ?? 0
              const bonusPoint = bonusPoints[index] || 0
              const totalPoint = basePoint + bonusPoint
              const rankBadgeClass = cn(
                "text-xs font-semibold px-2 py-1 rounded-full border",
                preview
                  ? preview.rank === 1
                    ? "bg-chart-1/10 text-chart-1 border-chart-1/30"
                    : basePoint < 0
                      ? "bg-destructive/10 text-destructive border-destructive/20"
                      : "bg-secondary text-secondary-foreground border-secondary/50"
                  : "text-muted-foreground bg-muted border-transparent",
              )
              const pointBadgeClass = cn(
                "text-sm font-semibold px-3 py-1 rounded-full border",
                totalPoint >= 0
                  ? "bg-chart-1/10 text-chart-1 border-chart-1/30"
                  : "bg-destructive/10 text-destructive border-destructive/20",
              )
              return (
                <div key={index} className="rounded-lg border bg-card/50 p-3 space-y-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold">プレイヤー{index + 1}</Label>
                    {preview && (
                      <div className="flex items-center gap-2">
                        <span className={rankBadgeClass}>{preview.rank ? `${preview.rank}位` : "-"}</span>
                        <span className={pointBadgeClass}>
                          {totalPoint >= 0 ? "+" : ""}
                          {totalPoint.toFixed(1)}pt
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="space-y-3 sm:col-span-2">
                      <Select value={selectedValue} onValueChange={(value) => handleFriendSelect(index, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="フレンドを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="self">自分 ({currentUserName})</SelectItem>
                          {friends.map((friend) => (
                            <SelectItem key={friend.id} value={friend.id}>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={friend.avatar_url || undefined} />
                                  <AvatarFallback>{friend.display_name.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span>{friend.display_name}</span>
                              </div>
                            </SelectItem>
                          ))}
                          <SelectItem value="manual">手動入力</SelectItem>
                        </SelectContent>
                      </Select>
                      {players[index].isManual && (
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">名前</Label>
                          <Input
                            type="text"
                            placeholder="プレイヤー名"
                            value={players[index].name}
                            onChange={(e) => updatePlayer(index, "name", e.target.value)}
                          />
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">素点</Label>
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="25000"
                              value={players[index].score}
                              onChange={(e) => updatePlayer(index, "score", e.target.value)}
                              className="text-right pr-10"
                              onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
                              onBlur={() => maybeAutofillFourth()}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                              点
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">飛び賞</Label>
                          <div className="relative">
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="0"
                              value={bonusPoints[index] || ""}
                              onChange={(e) => updateBonusPoint(index, e.target.value)}
                              className="h-9 text-right text-sm pr-10"
                              disabled={!allFieldsFilled}
                              onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                              pt
                            </span>
                          </div>
                        </div>
                      </div>
                      {preview && bonusPoint !== 0 && (
                        <p className="text-xs text-muted-foreground">
                          {bonusPoint > 0 ? "飛び賞" : "飛ばされたプレイヤー"}: {bonusPoint > 0 ? "+" : ""}
                          {bonusPoint.toFixed(1)}pt
                        </p>
                      )}
                    </div>
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
                    素点合計: {totalScore.toLocaleString()}点 {scoreBalanceError && "⚠️ 合計が一致しません"}
                  </div>
                  <div className={cn("text-xs font-semibold", pointBalanceError ? "text-destructive" : "text-chart-1")}>
                    ポイント合計: {totalPoints >= 0 ? "+" : ""}
                    {totalPoints.toFixed(1)}pt {pointBalanceError && "⚠️ ゼロになっていません"}
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
              disabled={
                isLoading ||
                ruleUnavailable ||
                ruleSelectionMissing ||
                !allFieldsFilled ||
                scoreBalanceError ||
                pointBalanceError
              }
              onClick={() => setContinueSession(true)}
            >
              続けて登録
            </Button>
          )}
          <Button
            type="submit"
            className="flex-1"
            disabled={
              isLoading ||
              isSubmitted ||
              ruleUnavailable ||
              ruleSelectionMissing ||
              !allFieldsFilled ||
              scoreBalanceError ||
              pointBalanceError
            }
            onClick={() => setContinueSession(false)}
          >
            {isLoading || isSubmitted ? "保存中..." : sessionResults.length > 0 ? "記録を終了する" : "記録する"}
          </Button>
        </div>
      </form>

      <SessionSummaryDialog
        open={showSummaryDialog}
        sessionResults={finalSessionResults}
        leagueName={selectedLeague?.name || undefined}
        onClose={handleCloseSummary}
      />
    </>
  )
}
