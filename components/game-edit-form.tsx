"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { cn } from "@/lib/utils"
import { getOptimizedAvatarUrl } from "@/lib/avatar"
import { YAKUMAN_LIST } from "@/lib/yakuman"
import {
  EPSILON,
  calculateSeatPoints,
  formatRawScore,
  parseRawScore,
  round2,
  type SeatInput,
  type SeatMemberInput,
} from "@/lib/game-scoring"

interface League {
  id: string
  name: string
  game_type: string
  rule_id?: string | null
  uma_first: number
  uma_second: number
  uma_third: number
  uma_fourth: number | null
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

interface ExistingResultRow {
  id: string
  seatIndex: number
  userId: string | null
  name: string
  rawScore: number
  bonusPoints: number
  yakuman: string[]
}

interface GameEditFormProps {
  gameId: string
  gameType: "four_player" | "three_player"
  playedAt: string
  leagueId: string | null
  ruleId: string | null
  leagues: League[]
  rules: Rule[]
  friends: Friend[]
  currentUserId: string
  currentUserName: string
  currentUserAvatarUrl?: string | null
  existingRows: ExistingResultRow[]
}

function createEmptyMember(): SeatMemberInput {
  return { name: "", userId: undefined, avatarUrl: undefined, isManual: false, yakuman: [] }
}

function toDateTimeLocalValue(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ""
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function buildInitialSeats(rows: ExistingResultRow[], playerCount: number): SeatInput[] {
  const buckets = new Map<number, ExistingResultRow[]>()
  rows.forEach((row) => {
    const seat = Number.isFinite(row.seatIndex) && row.seatIndex > 0 ? row.seatIndex : buckets.size + 1
    if (!buckets.has(seat)) buckets.set(seat, [])
    buckets.get(seat)!.push(row)
  })

  const seats: SeatInput[] = Array.from(buckets.keys())
    .sort((a, b) => a - b)
    .map((seat, index) => {
      const members = buckets.get(seat)!
      return {
        seatIndex: index + 1,
        score: formatRawScore(members[0]?.rawScore),
        bonusPoints: members.reduce((sum, m) => sum + Number(m.bonusPoints || 0), 0),
        members: members.slice(0, 2).map((m) => ({
          name: m.name,
          userId: m.userId || undefined,
          avatarUrl: undefined,
          isManual: !m.userId,
          yakuman: m.yakuman || [],
        })),
      }
    })

  while (seats.length < playerCount) {
    seats.push({ seatIndex: seats.length + 1, score: "", bonusPoints: 0, members: [createEmptyMember()] })
  }

  return seats
}

export function GameEditForm({
  gameId,
  gameType: initialGameType,
  playedAt: initialPlayedAt,
  leagueId: initialLeagueId,
  ruleId: initialRuleId,
  leagues,
  rules,
  friends,
  currentUserId,
  currentUserName,
  currentUserAvatarUrl,
  existingRows,
}: GameEditFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [gameType, setGameType] = useState<"four_player" | "three_player">(initialGameType)
  const [playedAt, setPlayedAt] = useState(toDateTimeLocalValue(initialPlayedAt))
  const [leagueId, setLeagueId] = useState<string>(initialLeagueId || "none")
  const [ruleId, setRuleId] = useState<string>(initialRuleId || "")
  const [seats, setSeats] = useState<SeatInput[]>(() =>
    buildInitialSeats(existingRows, initialGameType === "four_player" ? 4 : 3),
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const playerCount = gameType === "four_player" ? 4 : 3
  const isDisabled = isLoading || isDeleting || isSubmitted

  // 対局タイプを切り替えたら席数を合わせる
  useEffect(() => {
    setSeats((prev) => {
      if (prev.length === playerCount) return prev
      const next = prev.slice(0, playerCount)
      while (next.length < playerCount) {
        next.push({ seatIndex: next.length + 1, score: "", bonusPoints: 0, members: [createEmptyMember()] })
      }
      return next.map((seat, index) => ({ ...seat, seatIndex: index + 1 }))
    })
  }, [playerCount])

  const selectedLeague = leagues.find((l) => l.id === leagueId)
  const selectedRule = rules.find((rule) => rule.id === ruleId)
  const selectedLeagueRule = selectedLeague?.rule_id ? rules.find((rule) => rule.id === selectedLeague.rule_id) : null
  const isFreeGame = leagueId === "none"
  const activeRule = isFreeGame ? selectedRule : (selectedRule ?? selectedLeagueRule)

  const umaSource = activeRule ?? selectedLeague ?? null
  const uma = umaSource
    ? [umaSource.uma_first, umaSource.uma_second, umaSource.uma_third, umaSource.uma_fourth ?? -30]
    : gameType === "four_player"
      ? [30, 10, -10, -30]
      : [30, 0, -30, 0]
  const startingPoints = activeRule?.starting_points ?? selectedLeague?.starting_points ?? 25000
  const returnPoints = activeRule?.return_points ?? selectedLeague?.return_points ?? 30000

  const rulesForGameType = rules.filter((rule) => rule.game_type === gameType)
  const leaguesForGameType = leagues.filter((league) => league.game_type === gameType)

  // リーグを変えたらそのリーグのルールに追従する
  useEffect(() => {
    if (isFreeGame) return
    setRuleId(selectedLeague?.rule_id || "")
  }, [isFreeGame, selectedLeague?.rule_id])

  // 対局タイプに合わないリーグ/ルールは外す
  useEffect(() => {
    if (selectedLeague && selectedLeague.game_type !== gameType) setLeagueId("none")
  }, [gameType, selectedLeague])

  useEffect(() => {
    if (selectedRule && selectedRule.game_type !== gameType) setRuleId("")
  }, [gameType, selectedRule])

  const updateSeatField = (seatIndex: number, field: "score" | "bonusPoints", value: string) => {
    setSeats((prev) => {
      const updated = [...prev]
      updated[seatIndex] =
        field === "score"
          ? { ...updated[seatIndex], score: value }
          : { ...updated[seatIndex], bonusPoints: Number.parseFloat(value) || 0 }
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
    const existing = seats[seatIndex].members[memberIndex]

    if (value === "manual") {
      setMember(seatIndex, memberIndex, {
        ...existing,
        name: existing?.isManual ? existing.name : "",
        userId: undefined,
        avatarUrl: undefined,
        isManual: true,
      })
      return
    }

    if (value === "self") {
      setMember(seatIndex, memberIndex, {
        ...existing,
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
        ...existing,
        name: friend.display_name,
        userId: friend.id,
        avatarUrl: friend.avatar_url,
        isManual: false,
      })
    }
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
      updated[seatIndex] = { ...seat, members: seat.members.filter((_, idx) => idx !== memberIndex) }
      return updated
    })
  }

  const activeSeats = seats.slice(0, playerCount)
  const expectedTotalScore = startingPoints * playerCount

  const allMembersHaveNames = activeSeats.every((seat) => seat.members.every((m) => m.name.trim().length > 0))
  const allScoresValid = activeSeats.every((seat) => parseRawScore(seat.score) !== null)
  const totalScore = activeSeats.reduce((sum, seat) => sum + (parseRawScore(seat.score) || 0), 0)
  const scoreBalanceError = allScoresValid && totalScore !== expectedTotalScore

  const userIds = activeSeats.flatMap((seat) => seat.members.map((m) => m.userId).filter(Boolean)) as string[]
  const hasDuplicateUsers = new Set(userIds).size !== userIds.length

  const seatCalcResults = useMemo(
    () =>
      allScoresValid ? calculateSeatPoints(activeSeats, playerCount, uma, startingPoints, returnPoints) : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(activeSeats.map((s) => s.score)), playerCount, JSON.stringify(uma), startingPoints, returnPoints],
  )

  const previewSeatTotals = seatCalcResults
    ? activeSeats.map((seat, index) => {
        const calc = seatCalcResults[index]
        const memberCount = seat.members.length || 1
        const perMemberPoint = round2(calc.seatPoint / memberCount + (seat.bonusPoints || 0) / memberCount)
        return { rank: calc.rank, perMemberPoint, memberCount }
      })
    : null

  const totalPoints = previewSeatTotals
    ? previewSeatTotals.reduce((sum, seat) => sum + seat.perMemberPoint * seat.memberCount, 0)
    : 0
  const pointBalanceError = previewSeatTotals ? Math.abs(totalPoints) > EPSILON : false

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isDisabled) return

    if (!playedAt) {
      setError("対局日時を入力してください")
      return
    }
    if (!allScoresValid) {
      setError("素点を数値で入力してください")
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
    if (!seatCalcResults) {
      setError("入力値を確認してください")
      return
    }

    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error: gameError } = await supabase
        .from("games")
        .update({
          game_type: gameType,
          league_id: isFreeGame ? null : leagueId,
          played_at: new Date(playedAt).toISOString(),
          applied_rule_id: activeRule?.id ?? null,
          applied_rule_name: activeRule?.name ?? null,
          applied_starting_points: startingPoints,
          applied_return_points: returnPoints,
          applied_uma_first: uma[0] ?? null,
          applied_uma_second: uma[1] ?? null,
          applied_uma_third: uma[2] ?? null,
          applied_uma_fourth: gameType === "four_player" ? (uma[3] ?? null) : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", gameId)

      if (gameError) throw gameError

      const desiredRows = activeSeats.flatMap((seat, seatIndex) => {
        const calc = seatCalcResults[seatIndex]
        const memberCount = seat.members.length
        const splitSeatPoint = calc.seatPoint / memberCount
        const splitBonus = (seat.bonusPoints || 0) / memberCount
        const rawScore = parseRawScore(seat.score)!

        return seat.members.map((member) => ({
          game_id: gameId,
          user_id: member.userId || null,
          player_name: member.name,
          seat_index: seat.seatIndex,
          rank: calc.rank,
          raw_score: rawScore,
          point: round2(splitSeatPoint + splitBonus),
          bonus_points: round2(splitBonus),
          yakuman: member.yakuman && member.yakuman.length > 0 ? member.yakuman : null,
        }))
      })

      // 既存行をできるだけ再利用し、余りは追加/削除する（途中で失敗してもデータが消えないように）
      const existingIds = existingRows.map((row) => row.id)
      const reuseCount = Math.min(existingIds.length, desiredRows.length)

      for (let i = 0; i < reuseCount; i++) {
        const { error: updateError } = await supabase
          .from("game_results")
          .update(desiredRows[i])
          .eq("id", existingIds[i])
        if (updateError) throw updateError
      }

      if (desiredRows.length > reuseCount) {
        const { error: insertError } = await supabase.from("game_results").insert(desiredRows.slice(reuseCount))
        if (insertError) throw insertError
      }

      if (existingIds.length > reuseCount) {
        const { error: deleteError } = await supabase
          .from("game_results")
          .delete()
          .in("id", existingIds.slice(reuseCount))
        if (deleteError) throw deleteError
      }

      // リーグ対局なら参加者をメンバーに追加
      if (!isFreeGame) {
        const uniqueUserIds = Array.from(new Set(userIds))
        if (uniqueUserIds.length > 0) {
          await supabase
            .from("league_members")
            .upsert(
              uniqueUserIds.map((uid) => ({ league_id: leagueId, user_id: uid })),
              { onConflict: "league_id,user_id", ignoreDuplicates: true },
            )
        }
      }

      setIsSubmitted(true)
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["games"] }),
        queryClient.invalidateQueries({ queryKey: ["game", gameId] }),
        queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
        queryClient.invalidateQueries({ queryKey: ["league-detail"] }),
      ])
      router.push(`/games/${gameId}`)
      router.refresh()
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
      const { error: deleteError } = await supabase.from("games").delete().eq("id", gameId)
      if (deleteError) throw deleteError

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["games"] }),
        queryClient.invalidateQueries({ queryKey: ["game", gameId] }),
        queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
        queryClient.invalidateQueries({ queryKey: ["league-detail"] }),
      ])
      router.push("/games")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "削除に失敗しました")
      setIsDeleting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">対局設定</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-sm">対局日時</Label>
            <Input
              type="datetime-local"
              value={playedAt}
              onChange={(e) => setPlayedAt(e.target.value)}
              disabled={isDisabled}
              className="w-full"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">対局タイプ</Label>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { value: "four_player", label: "4人麻雀" },
                  { value: "three_player", label: "3人麻雀" },
                ] as const
              ).map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={gameType === option.value ? "default" : "outline"}
                  onClick={() => setGameType(option.value)}
                  disabled={isDisabled}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">リーグ</Label>
            <Select value={leagueId} onValueChange={setLeagueId} disabled={isDisabled}>
              <SelectTrigger>
                <SelectValue placeholder="リーグを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">フリー対局（リーグなし）</SelectItem>
                {leaguesForGameType.map((league) => (
                  <SelectItem key={league.id} value={league.id}>
                    {league.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">ルール</Label>
            <Select
              value={ruleId || "none"}
              onValueChange={(value) => setRuleId(value === "none" ? "" : value)}
              disabled={isDisabled || !isFreeGame}
            >
              <SelectTrigger>
                <SelectValue placeholder="ルールを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">指定なし（デフォルト）</SelectItem>
                {rulesForGameType.map((rule) => (
                  <SelectItem key={rule.id} value={rule.id}>
                    {rule.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!isFreeGame && (
              <p className="text-xs text-muted-foreground">リーグ対局のルールはリーグ設定に従います</p>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            ウマ: {uma.slice(0, playerCount).join(" / ")} ／ 持ち点: {startingPoints.toLocaleString()} ／ 返し:{" "}
            {returnPoints.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">対局結果</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeSeats.map((seat, seatIndex) => {
            const seatPreview = previewSeatTotals?.[seatIndex]
            const displayPoint = seatPreview?.perMemberPoint ?? 0

            return (
              <div key={seat.seatIndex} className="rounded-lg border bg-card/50 p-3 space-y-3 sm:p-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">席{seat.seatIndex}</span>
                  {seatPreview && (
                    <>
                      <span
                        className={cn(
                          "text-xs font-semibold px-2 py-1 rounded-full border",
                          seatPreview.rank === 1
                            ? "bg-chart-1/10 text-chart-1 border-chart-1/30"
                            : displayPoint < 0
                              ? "bg-destructive/10 text-destructive border-destructive/20"
                              : "bg-secondary text-secondary-foreground border-secondary/50",
                        )}
                      >
                        {seatPreview.rank}位
                      </span>
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          displayPoint >= 0 ? "text-chart-1" : "text-destructive",
                        )}
                      >
                        {displayPoint >= 0 ? "+" : ""}
                        {displayPoint.toFixed(2)}pt{seat.members.length > 1 ? "ずつ" : ""}
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
                          : friends.some((f) => f.id === member.userId)
                            ? member.userId
                            : "other"
                        : ""

                    return (
                      <div key={`${seat.seatIndex}-${memberIndex}`} className="rounded-md border p-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs text-muted-foreground">参加者{memberIndex + 1}</Label>
                          {seat.members.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              disabled={isDisabled}
                              onClick={() => removeMemberFromSeat(seatIndex, memberIndex)}
                            >
                              削除
                            </Button>
                          )}
                        </div>

                        <Select
                          value={selectedValue}
                          onValueChange={(value) => handleMemberSelect(seatIndex, memberIndex, value)}
                          disabled={isDisabled}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="プレイヤーを選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="self">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={getOptimizedAvatarUrl(currentUserAvatarUrl, { size: 48, quality: 50 })}
                                  />
                                  <AvatarFallback>{currentUserName.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span>{currentUserName}</span>
                              </div>
                            </SelectItem>
                            {friends.map((friend) => (
                              <SelectItem key={friend.id} value={friend.id}>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage
                                      src={getOptimizedAvatarUrl(friend.avatar_url, { size: 48, quality: 50 })}
                                    />
                                    <AvatarFallback>{friend.display_name.charAt(0).toUpperCase()}</AvatarFallback>
                                  </Avatar>
                                  <span>{friend.display_name}</span>
                                </div>
                              </SelectItem>
                            ))}
                            {selectedValue === "other" && (
                              <SelectItem value="other">{member.name}（フレンド外）</SelectItem>
                            )}
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
                              disabled={isDisabled}
                              onChange={(e) =>
                                setMember(seatIndex, memberIndex, {
                                  ...member,
                                  name: e.target.value,
                                  isManual: true,
                                  userId: undefined,
                                })
                              }
                            />
                          </div>
                        )}

                        {member.name && (
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">役満</Label>
                            <Select
                              value="_none"
                              disabled={isDisabled}
                              onValueChange={(value) => {
                                if (value === "_none") return
                                const current = member.yakuman || []
                                if (!current.includes(value)) {
                                  setMember(seatIndex, memberIndex, { ...member, yakuman: [...current, value] })
                                }
                              }}
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue placeholder="役満を追加" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="_none">なし</SelectItem>
                                {YAKUMAN_LIST.filter((y) => !(member.yakuman || []).includes(y)).map((y) => (
                                  <SelectItem key={y} value={y}>
                                    {y}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {(member.yakuman || []).length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {member.yakuman!.map((y) => (
                                  <span
                                    key={y}
                                    className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-xs font-semibold"
                                  >
                                    {y}
                                    <button
                                      type="button"
                                      className="hover:text-amber-600"
                                      disabled={isDisabled}
                                      onClick={() =>
                                        setMember(seatIndex, memberIndex, {
                                          ...member,
                                          yakuman: (member.yakuman || []).filter((v) => v !== y),
                                        })
                                      }
                                    >
                                      ×
                                    </button>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}

                  {seat.members.length < 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full"
                      disabled={isDisabled}
                      onClick={() => addMemberToSeat(seatIndex)}
                    >
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
                        inputMode="numeric"
                        placeholder="250"
                        value={seat.score}
                        disabled={isDisabled}
                        onChange={(e) => updateSeatField(seatIndex, "score", e.target.value)}
                        className="text-right pr-10"
                        onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        00
                      </span>
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
                        disabled={isDisabled}
                        onChange={(e) => updateSeatField(seatIndex, "bonusPoints", e.target.value)}
                        className="text-right pr-10"
                        onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        pt
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          <div className="pt-4 border-t border-border space-y-1">
            <p className="text-[10px] text-muted-foreground">※ 同点の場合は順位点を分け合います</p>
            {allScoresValid && (
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
          </div>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="w-full sm:flex-1"
          disabled={isDisabled}
        >
          キャンセル
        </Button>
        <Button type="submit" className="w-full sm:flex-1" disabled={isDisabled}>
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
