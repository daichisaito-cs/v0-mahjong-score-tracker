"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SessionSummaryDialog, type SessionResult } from "@/components/session-summary-dialog"
import { cn } from "@/lib/utils"

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

interface SeatMemberInput {
  name: string
  userId?: string
  avatarUrl?: string | null
  isManual?: boolean
}

interface SeatInput {
  seatIndex: number
  score: string
  bonusPoints: number
  members: SeatMemberInput[]
}

interface SessionData {
  gameType: string
  leagueId: string
  ruleId?: string
  seats?: SeatInput[]
  players?: Array<{
    name: string
    score: string
    userId?: string
    avatarUrl?: string | null
    isManual?: boolean
  }>
  sessionResults?: SessionResult[]
}

interface GameRecordFormProps {
  currentUserId: string
  currentUserName: string
  currentUserAvatarUrl?: string | null
  leagues: League[]
  rules: Rule[]
  friends: Friend[]
  defaultLeagueId?: string
  sessionData?: SessionData
}

type SeatCalcResult = {
  rank: number
  seatPoint: number
}

const EPSILON = 0.01

function round2(num: number) {
  return Number(num.toFixed(2))
}

function createEmptyMember(): SeatMemberInput {
  return { name: "", userId: undefined, avatarUrl: undefined, isManual: false }
}

function createDefaultSeats(playerCount: number): SeatInput[] {
  return Array.from({ length: playerCount }, (_, idx) => ({
    seatIndex: idx + 1,
    score: "",
    bonusPoints: 0,
    members: [createEmptyMember()],
  }))
}

function normalizeSessionResults(results?: SessionResult[]) {
  return (results || []).map((result) => ({
    players: (result?.players || []).map((player: any) =>
      typeof player === "string"
        ? { name: player }
        : { name: player.name, userId: player.userId, avatarUrl: player.avatarUrl, isManual: player.isManual },
    ),
    points: (result?.points || []).map((point: any) => Number(point) || 0),
  }))
}

function calculateSeatPoints(
  seats: SeatInput[],
  playerCount: number,
  uma: number[],
  oka: number,
  startingPoints: number,
  returnPoints: number,
): SeatCalcResult[] {
  const sorted = seats
    .slice(0, playerCount)
    .map((seat, originalIndex) => ({
      originalIndex,
      scoreNum: Number.parseInt(seat.score) || 0,
    }))
    .sort((a, b) => b.scoreNum - a.scoreNum)

  const okaPoints = ((returnPoints - startingPoints) * playerCount) / 1000

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

  const calculated: Array<{ originalIndex: number; rank: number; seatPoint: number }> = []
  let currentRank = 1

  for (const group of groups) {
    const rankStart = currentRank
    const rankEnd = currentRank + group.length - 1

    let totalUma = 0
    for (let rank = rankStart; rank <= rankEnd; rank++) {
      totalUma += uma[rank - 1] || 0
    }

    const averageUma = totalUma / group.length
    const averageOka = rankStart === 1 ? okaPoints / group.length : 0

    group.forEach((seat) => {
      const basePoint = (seat.scoreNum - returnPoints) / 1000
      const seatPoint = basePoint + averageUma + averageOka
      calculated.push({
        originalIndex: seat.originalIndex,
        rank: rankStart,
        seatPoint,
      })
    })

    currentRank += group.length
  }

  const finalResults = new Array(playerCount)
  calculated.forEach((entry) => {
    finalResults[entry.originalIndex] = {
      rank: entry.rank,
      seatPoint: entry.seatPoint,
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
  const queryClient = useQueryClient()

  const [gameType, setGameType] = useState<"four_player" | "three_player">(
    (sessionData?.gameType as "four_player" | "three_player") || "four_player",
  )
  const [leagueId, setLeagueId] = useState<string>(sessionData?.leagueId || defaultLeagueId || "none")
  const [ruleId, setRuleId] = useState<string>(sessionData?.ruleId || "")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [continueSession, setContinueSession] = useState(false)

  const [sessionResults, setSessionResults] = useState<SessionResult[]>(normalizeSessionResults(sessionData?.sessionResults))
  const [showSummaryDialog, setShowSummaryDialog] = useState(false)
  const [finalSessionResults, setFinalSessionResults] = useState<SessionResult[]>([])

  const playerCount = gameType === "four_player" ? 4 : 3

  const initialSeats = useMemo(() => {
    if (sessionData?.seats && sessionData.seats.length > 0) {
      return sessionData.seats.map((seat, index) => ({
        seatIndex: seat.seatIndex || index + 1,
        score: seat.score || "",
        bonusPoints: Number(seat.bonusPoints || 0),
        members:
          seat.members && seat.members.length > 0
            ? seat.members.map((m) => ({
                name: m.name || "",
                userId: m.userId,
                avatarUrl: m.avatarUrl,
                isManual: m.isManual,
              }))
            : [createEmptyMember()],
      }))
    }

    if (sessionData?.players && sessionData.players.length > 0) {
      return sessionData.players.map((p, index) => ({
        seatIndex: index + 1,
        score: p.score || "",
        bonusPoints: 0,
        members: [
          {
            name: p.name || "",
            userId: p.userId,
            avatarUrl: p.avatarUrl,
            isManual: p.isManual,
          },
        ],
      }))
    }

    return createDefaultSeats(playerCount)
  }, [sessionData, playerCount])

  const [seats, setSeats] = useState<SeatInput[]>(() => {
    const normalized = initialSeats
      .slice(0, playerCount)
      .map((seat, idx) => ({
        seatIndex: idx + 1,
        score: seat.score || "",
        bonusPoints: Number(seat.bonusPoints || 0),
        members: seat.members && seat.members.length > 0 ? seat.members.slice(0, 2) : [createEmptyMember()],
      }))

    while (normalized.length < playerCount) {
      normalized.push({
        seatIndex: normalized.length + 1,
        score: "",
        bonusPoints: 0,
        members: [createEmptyMember()],
      })
    }

    return normalized
  })

  useEffect(() => {
    setSeats((prev) => {
      const next = prev
        .slice(0, playerCount)
        .map((seat, idx) => ({ ...seat, seatIndex: idx + 1, members: seat.members.slice(0, 2) }))

      while (next.length < playerCount) {
        next.push({ seatIndex: next.length + 1, score: "", bonusPoints: 0, members: [createEmptyMember()] })
      }

      return next
    })
  }, [playerCount])

  const selectedLeague = leagues.find((l) => l.id === leagueId)
  const selectedRule = rules.find((rule) => rule.id === ruleId)
  const selectedLeagueRule = selectedLeague?.rule_id ? rules.find((rule) => rule.id === selectedLeague.rule_id) : null
  const isFreeGame = leagueId === "none"
  const activeRule = isFreeGame ? selectedRule : selectedRule ?? selectedLeagueRule

  const umaSource = activeRule ?? selectedLeague ?? null
  const uma = umaSource
    ? [umaSource.uma_first, umaSource.uma_second, umaSource.uma_third, umaSource.uma_fourth ?? -30]
    : gameType === "four_player"
      ? [30, 10, -10, -30]
      : [30, 0, -30, 0]
  const startingPoints = activeRule?.starting_points ?? selectedLeague?.starting_points ?? 25000
  const returnPoints = activeRule?.return_points ?? selectedLeague?.return_points ?? 30000
  const oka = selectedLeague?.oka || 0
  const appliedRuleId = activeRule?.id ?? null
  const appliedRuleName = activeRule?.name ?? null

  const rulesForGameType = rules.filter((rule) => rule.game_type === gameType)
  const ruleUnavailable = isFreeGame && rulesForGameType.length === 0
  const ruleSelectionMissing = isFreeGame && rulesForGameType.length > 0 && !selectedRule

  useEffect(() => {
    if (!selectedRule) return
    if (selectedRule.game_type !== gameType) {
      setRuleId("")
    }
  }, [gameType, selectedRule])

  useEffect(() => {
    if (isFreeGame) return
    setRuleId(selectedLeague?.rule_id || "")
  }, [isFreeGame, selectedLeague?.rule_id])

  const updateSeatField = (seatIndex: number, field: "score" | "bonusPoints", value: string) => {
    setSeats((prev) => {
      const updated = [...prev]
      if (field === "score") {
        updated[seatIndex] = { ...updated[seatIndex], score: value }
      } else {
        updated[seatIndex] = { ...updated[seatIndex], bonusPoints: Number.parseFloat(value) || 0 }
      }
      return updated
    })
  }

  const setMember = (seatIndex: number, memberIndex: number, member: SeatMemberInput) => {
    setSeats((prev) => {
      const updated = [...prev]
      const seat = updated[seatIndex]
      const members = [...seat.members]
      members[memberIndex] = member
      updated[seatIndex] = { ...seat, members }
      return updated
    })
  }

  const handleMemberSelect = (seatIndex: number, memberIndex: number, value: string) => {
    if (value === "manual") {
      const existing = seats[seatIndex].members[memberIndex]
      setMember(seatIndex, memberIndex, {
        name: existing?.isManual ? existing.name : "",
        userId: undefined,
        avatarUrl: undefined,
        isManual: true,
      })
      return
    }

    if (value === "self") {
      setMember(seatIndex, memberIndex, {
        name: currentUserName,
        userId: currentUserId,
        avatarUrl: currentUserAvatarUrl,
        isManual: false,
      })
      return
    }

    const friend = friends.find((f) => f.id === value)
    if (friend) {
      setMember(seatIndex, memberIndex, {
        name: friend.display_name,
        userId: friend.id,
        avatarUrl: friend.avatar_url,
        isManual: false,
      })
    }
  }

  const updateManualMemberName = (seatIndex: number, memberIndex: number, value: string) => {
    const existing = seats[seatIndex].members[memberIndex]
    setMember(seatIndex, memberIndex, {
      ...existing,
      name: value,
      isManual: true,
      userId: undefined,
      avatarUrl: undefined,
    })
  }

  const addMemberToSeat = (seatIndex: number) => {
    setSeats((prev) => {
      const updated = [...prev]
      const seat = updated[seatIndex]
      if (seat.members.length >= 2) return prev
      updated[seatIndex] = { ...seat, members: [...seat.members, createEmptyMember()] }
      return updated
    })
  }

  const removeMemberFromSeat = (seatIndex: number, memberIndex: number) => {
    setSeats((prev) => {
      const updated = [...prev]
      const seat = updated[seatIndex]
      if (seat.members.length <= 1) return prev
      const members = seat.members.filter((_, idx) => idx !== memberIndex)
      updated[seatIndex] = { ...seat, members }
      return updated
    })
  }

  const activeSeats = seats.slice(0, playerCount)
  const expectedTotalScore = startingPoints * playerCount

  const allSeatsHaveMembers = activeSeats.every((seat) => seat.members.length >= 1 && seat.members.length <= 2)
  const allMembersHaveNames = activeSeats.every((seat) => seat.members.every((member) => member.name.trim().length > 0))
  const allScoresFilled = activeSeats.every((seat) => seat.score !== "")
  const allFieldsFilled = allScoresFilled && allSeatsHaveMembers && allMembersHaveNames

  const userIds = activeSeats.flatMap((seat) => seat.members.map((member) => member.userId).filter(Boolean) as string[])
  const uniqueUserIdCount = new Set(userIds).size
  const hasDuplicateUsers = uniqueUserIdCount !== userIds.length

  const seatCountInvalid = activeSeats.some((seat) => seat.members.length < 1 || seat.members.length > 2)

  const totalScore = activeSeats.reduce((sum, seat) => sum + (Number.parseInt(seat.score) || 0), 0)
  const scoreBalanceError = allScoresFilled && totalScore !== expectedTotalScore

  const seatCalcResults = allFieldsFilled
    ? calculateSeatPoints(activeSeats, playerCount, uma, oka, startingPoints, returnPoints)
    : null

  const previewSeatTotals =
    seatCalcResults &&
    activeSeats.map((seat, seatIndex) => {
      const seatCalc = seatCalcResults[seatIndex]
      const memberCount = seat.members.length
      const splitSeatPoint = seatCalc ? seatCalc.seatPoint / memberCount : 0
      const splitBonus = memberCount > 0 ? (seat.bonusPoints || 0) / memberCount : 0
      const perMemberPoint = round2(splitSeatPoint + splitBonus)

      return {
        rank: seatCalc?.rank || 0,
        seatPoint: seatCalc?.seatPoint || 0,
        perMemberPoint,
      }
    })

  const totalPoints =
    previewSeatTotals?.reduce((sum, seat, seatIndex) => sum + seat.perMemberPoint * activeSeats[seatIndex].members.length, 0) || 0
  const pointBalanceError = previewSeatTotals ? Math.abs(totalPoints) > EPSILON : false

  const maybeAutofillLastSeat = () => {
    const targetIndex = playerCount - 1
    const target = activeSeats[targetIndex]
    if (!target || target.score) return

    const prevScores = activeSeats.slice(0, targetIndex).map((seat) => Number.parseInt(seat.score))
    if (prevScores.some((score) => Number.isNaN(score))) return

    const remaining = expectedTotalScore - prevScores.reduce((sum, score) => sum + score, 0)
    setSeats((prev) => {
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
        totals[key].total += Number(result.points[index] || 0)
        if (!totals[key].avatarUrl && player.avatarUrl) {
          totals[key].avatarUrl = player.avatarUrl
        }
      })
    })

    if (allFieldsFilled && previewSeatTotals) {
      activeSeats.forEach((seat, seatIndex) => {
        seat.members.forEach((member) => {
          const key = member.userId || member.name
          if (!totals[key]) {
            totals[key] = { name: member.name, avatarUrl: member.avatarUrl, total: 0 }
          }
          totals[key].total += previewSeatTotals[seatIndex].perMemberPoint
          if (!totals[key].avatarUrl && member.avatarUrl) {
            totals[key].avatarUrl = member.avatarUrl
          }
        })
      })
    }

    return Object.values(totals)
      .map((t) => ({ ...t, total: round2(t.total) }))
      .sort((a, b) => b.total - a.total)
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
      setError("ルールを選択してください")
      return
    }

    if (seatCountInvalid) {
      setError("各席の参加者は1〜2名で入力してください")
      return
    }

    if (!allMembersHaveNames) {
      setError("全員の名前を入力してください")
      return
    }

    if (hasDuplicateUsers) {
      setError("同じユーザーを複数の席に設定できません")
      return
    }

    if (scoreBalanceError) {
      setError(
        `素点の合計が${expectedTotalScore.toLocaleString()}になっていません（現在: ${totalScore.toLocaleString()}）`,
      )
      return
    }

    if (pointBalanceError) {
      setError(`ポイントの合計がゼロになっていません（現在: ${totalPoints.toFixed(2)}）`)
      return
    }

    if (!seatCalcResults || !previewSeatTotals) {
      setError("入力値を確認してください")
      return
    }

    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const baseGamePayload = {
        game_type: gameType,
        league_id: leagueId === "none" ? null : leagueId,
        created_by: currentUserId,
        played_at: new Date().toISOString(),
      }
      const snapshotPayload = {
        ...baseGamePayload,
        applied_rule_id: appliedRuleId,
        applied_rule_name: appliedRuleName,
        applied_starting_points: startingPoints,
        applied_return_points: returnPoints,
        applied_uma_first: uma[0] ?? null,
        applied_uma_second: uma[1] ?? null,
        applied_uma_third: uma[2] ?? null,
        applied_uma_fourth: gameType === "four_player" ? (uma[3] ?? null) : null,
      }

      let gameRes = await supabase.from("games").insert(snapshotPayload).select().single()
      const missingSnapshotColumns =
        gameRes.error &&
        /applied_rule_|applied_starting_points|applied_return_points|applied_uma_/i.test(gameRes.error.message || "")
      if (missingSnapshotColumns) {
        gameRes = await supabase.from("games").insert(baseGamePayload).select().single()
      }
      const { data: game, error: gameError } = gameRes

      if (gameError) throw gameError

      const gameResults = activeSeats.flatMap((seat, seatIndex) => {
        const seatCalc = seatCalcResults[seatIndex]
        const memberCount = seat.members.length
        const splitSeatPoint = seatCalc.seatPoint / memberCount
        const splitBonus = (seat.bonusPoints || 0) / memberCount

        return seat.members.map((member) => ({
          game_id: game.id,
          user_id: member.userId || null,
          player_name: member.name,
          seat_index: seat.seatIndex,
          rank: seatCalc.rank,
          raw_score: Number.parseInt(seat.score),
          point: round2(splitSeatPoint + splitBonus),
          bonus_points: round2(splitBonus),
        }))
      })

      const { error: resultsError } = await supabase.from("game_results").insert(gameResults)
      if (resultsError) throw resultsError

      const { error: pruneError } = await supabase.rpc("rollup_and_prune_games_for_user", { p_keep: 30 })
      if (pruneError) {
        // eslint-disable-next-line no-console
        console.warn("[v0] rollup_and_prune_games_for_user failed:", pruneError)
      }

      const newSessionResult: SessionResult = {
        players: activeSeats.flatMap((seat) =>
          seat.members.map((member) => ({
            name: member.name,
            userId: member.userId,
            isManual: member.isManual,
          })),
        ),
        points: activeSeats.flatMap((seat, seatIndex) => seat.members.map(() => previewSeatTotals[seatIndex].perMemberPoint)),
      }
      const allSessionResults = [...sessionResults, newSessionResult]

      if (continueSession) {
        const sessionDataEncoded = encodeURIComponent(
          JSON.stringify({
            gameType,
            leagueId,
            ruleId,
            seats: activeSeats.map((seat) => ({
              seatIndex: seat.seatIndex,
              score: "",
              bonusPoints: 0,
              members: seat.members.map((member) => ({
                name: member.name,
                userId: member.userId,
                isManual: member.isManual,
              })),
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

        setSessionResults(allSessionResults)
        setIsSubmitted(true)
        window.location.href = `/games/new?session=${sessionDataEncoded}`
      } else {
        setIsSubmitted(true)
        if (sessionResults.length > 0) {
          setFinalSessionResults(allSessionResults)
          setShowSummaryDialog(true)
        } else {
          queryClient.invalidateQueries({ queryKey: ["games", currentUserId] })
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
    queryClient.invalidateQueries({ queryKey: ["games", currentUserId] })
    window.location.href = "/games"
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {sessionResults.length > 0 && (
          <Card className="bg-primary/5 border-primary">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">連続記録中（{sessionResults.length + 1}戦目） - 暫定合計</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {sessionTotals.map((player, index) => (
                  <div key={index} className="text-center p-2 bg-background rounded border">
                    <div className="text-sm font-medium truncate">{player.name}</div>
                    <div className={`text-lg font-bold ${player.total >= 0 ? "text-chart-1" : "text-destructive"}`}>
                      {player.total >= 0 ? "+" : ""}
                      {player.total.toFixed(2)}
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

        {(isFreeGame || leagues.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{isFreeGame ? "ルール（必須）" : "ルール（リーグ既定を初期選択）"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {rulesForGameType.length > 0 ? (
                <Select value={ruleId} onValueChange={setRuleId}>
                  <SelectTrigger>
                    <SelectValue placeholder={isFreeGame ? "ルールを選択" : "リーグ既定ルールを使用"} />
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
                  <p className="text-sm text-muted-foreground">この対局タイプのルールがありません。先にルールを作成してください。</p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/rules/new">ルールを作成</Link>
                  </Button>
                </div>
              )}
              {!isFreeGame && selectedLeagueRule && selectedRule?.id !== selectedLeagueRule.id && (
                <p className="text-xs text-muted-foreground">リーグ既定: {selectedLeagueRule.name}（今回のみ上書き中）</p>
              )}
              {ruleSelectionMissing && <p className="text-xs text-destructive">ルールを選択してください</p>}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">対局結果</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeSeats.map((seat, seatIndex) => {
              const seatPreview = previewSeatTotals?.[seatIndex]
              const seatRankClass = cn(
                "text-xs font-semibold px-2 py-1 rounded-full border",
                seatPreview
                  ? seatPreview.rank === 1
                    ? "bg-chart-1/10 text-chart-1 border-chart-1/30"
                    : seatPreview.seatPoint < 0
                      ? "bg-destructive/10 text-destructive border-destructive/20"
                      : "bg-secondary text-secondary-foreground border-secondary/50"
                  : "text-muted-foreground bg-muted border-transparent",
              )

              return (
                <div key={seat.seatIndex} className="rounded-lg border bg-card/50 p-3 space-y-3 sm:p-4">
                  <div className="flex items-center gap-2">
                    {seatPreview && (
                      <>
                        <span className={seatRankClass}>{seatPreview.rank}位</span>
                        <span
                          className={cn(
                            "text-sm font-semibold",
                            (seat.members.length > 1 ? seatPreview.perMemberPoint : seatPreview.seatPoint) >= 0
                              ? "text-chart-1"
                              : "text-destructive",
                          )}
                        >
                          {(seat.members.length > 1 ? seatPreview.perMemberPoint : seatPreview.seatPoint) >= 0 ? "+" : ""}
                          {(seat.members.length > 1 ? seatPreview.perMemberPoint : seatPreview.seatPoint).toFixed(2)}
                          pt
                          {seat.members.length > 1 ? "ずつ" : ""}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="space-y-2">
                    {seat.members.map((member, memberIndex) => {
                      const selectedValue = member.isManual
                        ? "manual"
                        : member.userId
                          ? member.userId === currentUserId
                            ? "self"
                            : member.userId
                          : ""
                      return (
                        <div key={`${seat.seatIndex}-${memberIndex}`} className="rounded-md border p-2 space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs text-muted-foreground">参加者{memberIndex + 1}</Label>
                            {seat.members.length > 1 && (
                              <Button type="button" variant="ghost" size="sm" onClick={() => removeMemberFromSeat(seatIndex, memberIndex)}>
                                削除
                              </Button>
                            )}
                          </div>

                          <Select value={selectedValue} onValueChange={(value) => handleMemberSelect(seatIndex, memberIndex, value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="プレイヤーを選択" />
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

                          {member.isManual && (
                            <div className="space-y-1">
                              <Label className="text-xs text-muted-foreground">名前</Label>
                              <Input
                                type="text"
                                placeholder="プレイヤー名"
                                value={member.name}
                                onChange={(e) => updateManualMemberName(seatIndex, memberIndex, e.target.value)}
                              />
                            </div>
                          )}

                          {!member.isManual && member.name && (
                            <p className="text-xs text-muted-foreground">{member.name}</p>
                          )}
                        </div>
                      )
                    })}

                    {seat.members.length < 2 && (
                      <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => addMemberToSeat(seatIndex)}>
                        参加者を追加（ペア）
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-t pt-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">素点</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="25000"
                          value={seat.score}
                          onChange={(e) => updateSeatField(seatIndex, "score", e.target.value)}
                          onBlur={() => maybeAutofillLastSeat()}
                          className="text-right pr-10"
                          onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">点</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">飛び賞</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0"
                          value={seat.bonusPoints || ""}
                          onChange={(e) => updateSeatField(seatIndex, "bonusPoints", e.target.value)}
                          disabled={!allFieldsFilled}
                          className="text-right pr-10"
                          onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">pt</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="pt-4 border-t border-border space-y-1">
              <p className="text-xs text-muted-foreground">
                ウマ: {uma.slice(0, playerCount).join(" / ")} ／ 持ち点: {startingPoints.toLocaleString()} ／ 返し: {returnPoints.toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground">※ 同点の場合は順位点を分け合います</p>

              {allScoresFilled && (
                <div className={cn("text-xs", scoreBalanceError ? "text-destructive" : "text-muted-foreground")}>
                  素点合計: {totalScore.toLocaleString()}点 {scoreBalanceError && "⚠️ 合計が一致しません"}
                </div>
              )}

              {previewSeatTotals && (
                <div className={cn("text-xs font-semibold", pointBalanceError ? "text-destructive" : "text-chart-1")}>
                  ポイント合計: {totalPoints >= 0 ? "+" : ""}
                  {totalPoints.toFixed(2)}pt {pointBalanceError && "⚠️ ゼロになっていません"}
                </div>
              )}

              {hasDuplicateUsers && <p className="text-xs text-destructive">同じユーザーを複数の席に設定できません</p>}
              {seatCountInvalid && <p className="text-xs text-destructive">各席の参加者は1〜2名で入力してください</p>}
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
                hasDuplicateUsers ||
                seatCountInvalid ||
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
              hasDuplicateUsers ||
              seatCountInvalid ||
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
