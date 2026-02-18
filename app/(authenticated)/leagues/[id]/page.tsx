"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { useAuthUser } from "@/lib/hooks/use-auth-user"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Trophy, Settings } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts"
import { cn } from "@/lib/utils"
import { LeagueCreateForm } from "@/components/league-create-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LeagueMemberAdd } from "@/components/league-member-add"

function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

const EPSILON = 1e-6

function addRankLabels<T>(items: T[], getValue: (item: T) => number, epsilon = EPSILON): Array<T & { rankLabel: number }> {
  let lastValue: number | null = null
  let lastRank = 0
  let position = 0

  return items.map((item) => {
    position += 1
    const value = getValue(item)
    const isTie = lastValue !== null && Math.abs(value - lastValue) < epsilon

    if (!isTie) {
      lastRank = position
      lastValue = value
    }

    return { ...item, rankLabel: lastRank }
  })
}

export default function LeagueDetailPage() {
  const router = useRouter()
  const params = useParams()
  const supabase = createClient()
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null)

  const leagueId = useMemo(() => {
    const raw = params?.id
    return Array.isArray(raw) ? raw[0] : raw
  }, [params])

  const userQuery = useAuthUser()

  const user = userQuery.data

  useEffect(() => {
    if (userQuery.isFetched && !user) router.replace("/auth/login")
  }, [router, user, userQuery.isFetched])

  const isCreatePage = leagueId === "new"
  const isValidLeagueId = Boolean(leagueId && isValidUUID(leagueId))

  const leagueQuery = useQuery({
    queryKey: ["league-detail", leagueId, user?.id],
    enabled: Boolean(user?.id && isValidLeagueId),
    queryFn: async () => {
      const { data: league, error: leagueError } = await supabase.from("leagues").select("*").eq("id", leagueId).single()
      if (leagueError) throw leagueError
      if (!league) return null

      const { data: members, error: membersError } = await supabase
        .from("league_members")
        .select("user_id, profiles(id, display_name, friend_code, avatar_url)")
        .eq("league_id", leagueId)
      if (membersError) throw membersError

      const memberIds = (members || []).map((m: any) => m.user_id).filter(Boolean)
      let ownerProfile: { id: string; display_name: string | null; avatar_url: string | null } | null = null
      if (!memberIds.includes(league.owner_id)) {
        const { data: profileRow } = await supabase
          .from("profiles")
          .select("id, display_name, avatar_url")
          .eq("id", league.owner_id)
          .maybeSingle()
        ownerProfile = profileRow || null
      }

      const { data: games, error: gamesError } = await supabase
        .from("games")
        .select("*")
        .eq("league_id", leagueId)
        .order("played_at", { ascending: false })
      if (gamesError) throw gamesError

      const gameIds = (games || []).map((g: any) => g.id).filter(Boolean)
      const gameResultsByGameId = new Map<string, any[]>()
      if (gameIds.length > 0) {
        const { data: gameResults, error: gameResultsError } = await supabase
          .from("game_results")
          .select(
            `
            *
          `,
          )
          .in("game_id", gameIds)
        if (gameResultsError) throw gameResultsError

        const profileIds = Array.from(new Set((gameResults || []).map((row: any) => row.user_id).filter(Boolean)))
        const profileMap = new Map<string, { display_name: string; avatar_url: string | null }>()
        if (profileIds.length > 0) {
          const { data: profilesData, error: gameResultProfilesError } = await supabase
            .from("profiles")
            .select("id, display_name, avatar_url")
            .in("id", profileIds)
          if (gameResultProfilesError) throw gameResultProfilesError
          ;(profilesData || []).forEach((p: any) => {
            profileMap.set(p.id, { display_name: p.display_name, avatar_url: p.avatar_url })
          })
        }

        ;(gameResults || []).forEach((row: any) => {
          const hydratedRow = {
            ...row,
            profiles: row.user_id ? profileMap.get(row.user_id) || null : null,
          }
          const list = gameResultsByGameId.get(row.game_id) || []
          list.push(hydratedRow)
          gameResultsByGameId.set(row.game_id, list)
        })
      }

      const gamesWithResults = (games || []).map((game: any) => ({
        ...game,
        game_results: gameResultsByGameId.get(game.id) || [],
      }))

      const { data: leagueRollups, error: leagueRollupsError } = await supabase
        .from("league_user_game_rollups")
        .select("*")
        .eq("league_id", leagueId)
      if (leagueRollupsError) {
        console.warn("[v0] failed to load league_user_game_rollups:", leagueRollupsError)
      }

      const rollupUserIds = (leagueRollups || []).map((r: any) => r.user_id).filter(Boolean)
      const seedIds = Array.from(new Set([...memberIds, league.owner_id, ...rollupUserIds]))
      let extraProfiles: Array<{ id: string; display_name: string | null; avatar_url: string | null }> = []
      if (seedIds.length > 0) {
        const { data: profilesData, error: profilesError } = await supabase
          .from("profiles")
          .select("id, display_name, avatar_url")
          .in("id", seedIds)
        if (profilesError) {
          console.warn("[v0] failed to load profiles:", profilesError)
        } else {
          extraProfiles = profilesData || []
        }
      }

      return {
        league,
        members: members || [],
        ownerProfile,
        games: gamesWithResults,
        leagueRollups: leagueRollups || [],
        extraProfiles,
      }
    },
  })

  if (userQuery.isLoading || (userQuery.isFetched && !user)) {
    return (
      <div className="space-y-6 pb-20 md:pb-0 max-w-xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">読み込み中...</CardContent>
        </Card>
      </div>
    )
  }

  if (isCreatePage) {
    return (
      <div className="space-y-6 pb-20 md:pb-0 max-w-xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-foreground">リーグを作成</h1>
          <p className="text-muted-foreground">新しいリーグの設定を入力してください</p>
        </div>
        <LeagueCreateForm userId={user!.id} />
      </div>
    )
  }

  if (!isValidLeagueId) {
    return (
      <div className="space-y-6 pb-20 md:pb-0 max-w-xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">リーグが見つかりません</CardContent>
        </Card>
      </div>
    )
  }

  if (leagueQuery.isLoading) {
    return (
      <div className="space-y-6 pb-20 md:pb-0 max-w-xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">読み込み中...</CardContent>
        </Card>
      </div>
    )
  }

  const data = leagueQuery.data as any
  if (!data || !data.league) {
    return (
      <div className="space-y-6 pb-20 md:pb-0 max-w-xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">リーグが見つかりません</CardContent>
        </Card>
      </div>
    )
  }

  const { league, members, ownerProfile, games, leagueRollups, extraProfiles } = data

  const profileMap = new Map<string, { name: string; avatarUrl?: string | null }>()
  extraProfiles?.forEach((p: any) => {
    if (!p?.id) return
    profileMap.set(p.id, { name: p.display_name || "ユーザー", avatarUrl: p.avatar_url || null })
  })

  const playerStats: Record<
    string,
    {
      odIndex: string
      name: string
      avatarUrl?: string | null
      totalPoints: number
      gameCount: number
      rankSum: number
      rankCounts: [number, number, number, number]
      bestScore: number | null
    }
  > = {}

  games?.forEach((game: any) => {
    game.game_results?.forEach((result: any) => {
      if (!result.user_id) return

      const odIndex = result.user_id
      const fallbackProfile = profileMap.get(odIndex)
      const name = result.profiles?.display_name || result.player_name || fallbackProfile?.name || "Unknown"
      const avatarUrl = (result.profiles as any)?.avatar_url || fallbackProfile?.avatarUrl

      if (!playerStats[odIndex]) {
        playerStats[odIndex] = {
          odIndex,
          name,
          avatarUrl,
          totalPoints: 0,
          gameCount: 0,
          rankSum: 0,
          rankCounts: [0, 0, 0, 0],
          bestScore: null,
        }
      }

      playerStats[odIndex].totalPoints += Number(result.point)
      playerStats[odIndex].gameCount += 1
      playerStats[odIndex].rankSum += Number(result.rank)
      if (result.rank >= 1 && result.rank <= 4) {
        playerStats[odIndex].rankCounts[result.rank - 1] += 1
      }
      const rawScoreNum = Number((result.raw_score ?? "").toString().replace(/,/g, ""))
      if (Number.isFinite(rawScoreNum)) {
        const currentBest = playerStats[odIndex].bestScore
        playerStats[odIndex].bestScore =
          currentBest === null || currentBest === undefined ? rawScoreNum : Math.max(currentBest as number, rawScoreNum)
      }
    })
  })

  ;(leagueRollups || []).forEach((row: any) => {
    const userId = row.user_id as string | null
    if (!userId) return

    if (!playerStats[userId]) {
      const fallback = profileMap.get(userId)
      playerStats[userId] = {
        odIndex: userId,
        name: fallback?.name || "Unknown",
        avatarUrl: fallback?.avatarUrl || null,
        totalPoints: 0,
        gameCount: 0,
        rankSum: 0,
        rankCounts: [0, 0, 0, 0],
        bestScore: null,
      }
    }

    const rolledGameCount = Number(row.rolled_game_count ?? 0)
    const rolledTotalPoints = Number(row.rolled_total_points ?? 0)
    const rolledRankCounts = [
      Number(row.rolled_rank1_count ?? 0),
      Number(row.rolled_rank2_count ?? 0),
      Number(row.rolled_rank3_count ?? 0),
      Number(row.rolled_rank4_count ?? 0),
    ]
    const rolledRankSum =
      rolledRankCounts[0] * 1 + rolledRankCounts[1] * 2 + rolledRankCounts[2] * 3 + rolledRankCounts[3] * 4
    const rolledBest = row.rolled_best_raw_score ?? null

    playerStats[userId].gameCount += rolledGameCount
    playerStats[userId].totalPoints += rolledTotalPoints
    playerStats[userId].rankSum += rolledRankSum
    playerStats[userId].rankCounts[0] += rolledRankCounts[0]
    playerStats[userId].rankCounts[1] += rolledRankCounts[1]
    playerStats[userId].rankCounts[2] += rolledRankCounts[2]
    playerStats[userId].rankCounts[3] += rolledRankCounts[3]
    playerStats[userId].bestScore =
      playerStats[userId].bestScore === null
        ? rolledBest
        : rolledBest === null
          ? playerStats[userId].bestScore
          : Math.max(playerStats[userId].bestScore as number, rolledBest as number)
  })

  const seedPlayers: Array<{ id: string; name: string; avatarUrl?: string | null }> = []
  members?.forEach((member: any) => {
    seedPlayers.push({
      id: member.user_id,
      name: (member.profiles as any)?.display_name || profileMap.get(member.user_id)?.name || "メンバー",
      avatarUrl: (member.profiles as any)?.avatar_url || profileMap.get(member.user_id)?.avatarUrl,
    })
  })
  if (!members?.some((m: any) => m.user_id === league.owner_id)) {
    seedPlayers.push({
      id: league.owner_id,
      name: ownerProfile?.display_name || profileMap.get(league.owner_id)?.name || "オーナー",
      avatarUrl: ownerProfile?.avatar_url || profileMap.get(league.owner_id)?.avatarUrl || null,
    })
  }

  seedPlayers.forEach((p) => {
    if (!playerStats[p.id]) {
      playerStats[p.id] = {
        odIndex: p.id,
        name: p.name,
        avatarUrl: p.avatarUrl,
        totalPoints: 0,
        gameCount: 0,
        rankSum: 0,
        rankCounts: [0, 0, 0, 0],
        bestScore: null,
      }
    } else {
      playerStats[p.id].name = playerStats[p.id].name === "Unknown" ? p.name : playerStats[p.id].name
      playerStats[p.id].avatarUrl = playerStats[p.id].avatarUrl ?? p.avatarUrl
    }
  })

  const rankingAll = Object.values(playerStats)
  const rankingPlayed = rankingAll.filter((p) => p.gameCount > 0).sort((a, b) => b.totalPoints - a.totalPoints)
  const rankingUnplayed = rankingAll
    .filter((p) => p.gameCount === 0)
    .sort((a, b) => a.name.localeCompare(b.name))

  const rankedWithLabels = addRankLabels(rankingPlayed, (player) => player.totalPoints)
  const fullRanking = [
    ...rankedWithLabels,
    ...rankingUnplayed.map((player) => ({ ...player, rankLabel: "—" as const })),
  ]
  const bestScoreCandidates = Object.values(playerStats)
    .filter((p) => p.gameCount > 0 && Number.isFinite(p.bestScore))
    .sort((a, b) => (b.bestScore ?? -Infinity) - (a.bestScore ?? -Infinity))
  const bestScoreRanking = addRankLabels(bestScoreCandidates, (player) => player.bestScore ?? -Infinity).filter(
    (player) => player.rankLabel <= 3,
  )
  const avoidCandidates = Object.values(playerStats)
    .filter((p) => p.gameCount > 0)
    .map((p) => ({
      ...p,
      avoidRate: p.gameCount > 0 ? 1 - p.rankCounts[3] / p.gameCount : null,
    }))
    .filter((p) => Number.isFinite(p.avoidRate))
    .sort((a, b) => (b.avoidRate as number) - (a.avoidRate as number))
  const avoidRanking = addRankLabels(avoidCandidates, (player) => player.avoidRate as number).filter(
    (player) => player.rankLabel <= 3,
  )

  const rollupTotalsMap = new Map<string, number>()
  ;(leagueRollups || []).forEach((row: any) => {
    if (!row.user_id) return
    rollupTotalsMap.set(row.user_id as string, Number(row.rolled_total_points ?? 0))
  })

  const chartPlayers = Object.values(playerStats)
    .filter((p) => p.gameCount > 0)
    .sort((a, b) => b.totalPoints - a.totalPoints)

  const chartColors = [
    "#10b981",
    "#f97316",
    "#3b82f6",
    "#8b5cf6",
    "#ef4444",
    "#14b8a6",
    "#eab308",
    "#6366f1",
    "#ec4899",
    "#22c55e",
  ]

  const gamesSorted = [...(games || [])].sort((a: any, b: any) => {
    const aTime = new Date(a.played_at || a.created_at).getTime()
    const bTime = new Date(b.played_at || b.created_at).getTime()
    return aTime - bTime
  })

  const perPlayerSeries = new Map<string, number[]>()
  chartPlayers.forEach((player) => {
    const base = rollupTotalsMap.get(player.odIndex) ?? 0
    let total = base
    const series: number[] = []
    gamesSorted.forEach((game: any) => {
      const result = (game.game_results || []).find((r: any) => r.user_id === player.odIndex)
      if (!result) return
      total += Number(result.point)
      series.push(Number(total.toFixed(2)))
    })
    perPlayerSeries.set(player.odIndex, series)
  })

  const maxSeriesLength = Math.max(0, ...Array.from(perPlayerSeries.values()).map((series) => series.length))
  const pointsTimeline = Array.from({ length: maxSeriesLength }, (_, index) => {
    const entry: Record<string, number> = { game: index + 1 }
    perPlayerSeries.forEach((series, playerId) => {
      if (index < series.length) {
        entry[playerId] = series[index]
      }
    })
    return entry
  })

  const memberIds = members?.map((m: any) => m.user_id) || []
  const existingMemberIds = Array.from(new Set([...memberIds, league.owner_id]))
  const isOwner = league.owner_id === user!.id
  const isMember = memberIds.includes(user!.id)

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3 min-w-0">
          <Link href="/leagues">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground break-words">{league.name}</h1>
              <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
                {league.game_type === "four_player" ? "四麻" : "三麻"}
              </span>
            </div>
            {league.description && <p className="text-muted-foreground text-sm mt-1">{league.description}</p>}
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">
          {isOwner && (
            <Link href={`/leagues/${leagueId}/settings`}>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
          )}
          {isOwner && (
            <LeagueMemberAdd leagueId={leagueId!} userId={user!.id} existingMemberIds={existingMemberIds} />
          )}
          <Link href={`/games/new?league=${leagueId}`}>
            <Button size="sm" className="gap-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              対局を記録
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-accent" />
            ランキング
          </CardTitle>
        </CardHeader>
        <CardContent>
          {fullRanking.length > 0 ? (
            <div className="space-y-3">
              {fullRanking.map((player, index) => {
                const rankLabel = (player as any).rankLabel
                const rankNumber = typeof rankLabel === "number" ? rankLabel : null
                const avgRank = player.gameCount > 0 ? player.rankSum / player.gameCount : null
                return (
                  <div
                    key={player.odIndex}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg",
                      rankNumber === 1 && "bg-accent/20",
                      rankNumber === 2 && "bg-secondary/50",
                      rankNumber === 3 && "bg-muted/50",
                      (rankNumber === null || rankNumber > 3) && "border border-border",
                    )}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                            rankNumber === 1 && "bg-accent text-accent-foreground",
                            rankNumber === 2 && "bg-secondary text-secondary-foreground",
                            rankNumber === 3 && "bg-muted text-muted-foreground",
                            (rankNumber === null || rankNumber > 3) && "bg-background text-foreground border border-border",
                          )}
                        >
                          {rankLabel}
                        </div>
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={player.avatarUrl || undefined} />
                          <AvatarFallback>{player.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold truncate" title={player.name}>
                          {player.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {player.gameCount}戦 / 平均{avgRank !== null ? `${avgRank.toFixed(1)}位` : "-"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={cn(
                          "font-bold text-lg",
                          player.totalPoints >= 0 ? "text-chart-1" : "text-destructive",
                        )}
                      >
                        {player.totalPoints >= 0 ? "+" : ""}
                        {player.totalPoints.toFixed(1)}
                      </p>
                      <p className="text-xs text-muted-foreground">pt</p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">まだ対局がありません</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">順位回数</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {fullRanking.length > 0 ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b">
                  <th className="text-left py-2 font-medium">プレイヤー</th>
                  <th className="text-center py-2 font-medium">1位</th>
                  <th className="text-center py-2 font-medium">2位</th>
                  <th className="text-center py-2 font-medium">3位</th>
                  <th className="text-center py-2 font-medium">4位</th>
                </tr>
              </thead>
              <tbody>
                {fullRanking.map((player) => (
                  <tr key={player.odIndex} className="border-b last:border-0">
                    <td className="py-2 pr-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={player.avatarUrl || undefined} />
                          <AvatarFallback>{player.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold inline-block max-w-[180px] truncate align-middle" title={player.name}>
                          {player.name}
                        </span>
                      </div>
                    </td>
                    <td className="text-center tabular-nums">{player.rankCounts[0]}</td>
                    <td className="text-center tabular-nums">{player.rankCounts[1]}</td>
                    <td className="text-center tabular-nums">{player.rankCounts[2]}</td>
                    <td className="text-center tabular-nums">{player.rankCounts[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted-foreground text-center py-4">まだ対局がありません</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">総合pt推移</CardTitle>
        </CardHeader>
        <CardContent>
          {chartPlayers.length > 0 && pointsTimeline.length > 0 ? (
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pointsTimeline} margin={{ top: 8, right: 12, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                  <XAxis
                    dataKey="game"
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    width={32}
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                    labelFormatter={(value) => `${value}戦目`}
                    formatter={(value: any, name: any) => [`${value >= 0 ? "+" : ""}${value}pt`, name]}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: 8 }}
                    content={({ payload }) => (
                      <div className="flex flex-wrap items-center gap-3">
                        {(payload || []).map((entry: any) => {
                          const id = entry.dataKey as string
                          const isSelected = selectedPlayerId === id
                          const isDimmed = selectedPlayerId && !isSelected
                          return (
                            <button
                              type="button"
                              key={id}
                              onClick={() => setSelectedPlayerId(isSelected ? null : id)}
                              className={cn(
                                "flex items-center gap-1 text-xs font-semibold transition-opacity max-w-[160px]",
                                isDimmed && "opacity-40",
                              )}
                              style={{ color: entry.color }}
                              title={String(entry.value)}
                            >
                              <span className="inline-block h-2.5 w-2.5 rounded-full border" style={{ borderColor: entry.color }} />
                              <span className="truncate">{entry.value}</span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  />
                  {chartPlayers.map((player, index) => (
                    (() => {
                      const isSelected = selectedPlayerId === player.odIndex
                      const isDimmed = selectedPlayerId && !isSelected
                      const stroke = chartColors[index % chartColors.length]
                      return (
                    <Line
                      key={player.odIndex}
                      type="linear"
                      dataKey={player.odIndex}
                      name={player.name}
                      stroke={stroke}
                      strokeWidth={isSelected ? 3 : 2}
                      dot={false}
                      strokeOpacity={isDimmed ? 0.2 : 1}
                      connectNulls
                    />
                      )
                    })()
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">まだ対局がありません</p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">最高スコア TOP3</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {bestScoreRanking.length > 0 ? (
              bestScoreRanking.map((player) => (
                <div
                  key={player.odIndex}
                  className="flex items-center justify-between rounded-lg border border-border/70 px-3 py-2"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0 pr-3">
                    <span className="text-sm font-semibold text-muted-foreground">#{player.rankLabel}</span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={player.avatarUrl || undefined} />
                      <AvatarFallback>{player.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate" title={player.name}>
                        {player.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{player.gameCount}戦</p>
                    </div>
                  </div>
                  <p className="text-base font-bold text-emerald-600">
                    {Number.isFinite(player.bestScore) ? `${(player.bestScore as number).toLocaleString()}点` : "-"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">まだスコアがありません</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">4着回避率 TOP3</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {avoidRanking.length > 0 ? (
              avoidRanking.map((player) => (
                <div
                  key={player.odIndex}
                  className="flex items-center justify-between rounded-lg border border-border/70 px-3 py-2"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0 pr-3">
                    <span className="text-sm font-semibold text-muted-foreground">#{player.rankLabel}</span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={player.avatarUrl || undefined} />
                      <AvatarFallback>{player.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate" title={player.name}>
                        {player.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{player.gameCount}戦</p>
                    </div>
                  </div>
                  <p className="text-base font-bold text-blue-600">
                    {Number.isFinite(player.avoidRate) ? `${((player.avoidRate as number) * 100).toFixed(1)}%` : "-"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">まだ対局がありません</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">対局履歴</CardTitle>
        </CardHeader>
        <CardContent>
          {games && games.length > 0 ? (
            <div className="space-y-3">
              {games.map((game: any) => {
                const seatCount = game.game_type === "four_player" ? 4 : 3
                const seatBuckets = new Map<number, any[]>()
                ;(game.game_results || []).forEach((result: any) => {
                  const seat = Number(result.seat_index ?? result.rank)
                  if (!Number.isFinite(seat) || seat < 1 || seat > seatCount) return
                  if (!seatBuckets.has(seat)) seatBuckets.set(seat, [])
                  seatBuckets.get(seat)!.push(result)
                })
                const seatSummaries = Array.from({ length: seatCount }, (_, idx) => {
                  const seat = idx + 1
                  const members = (seatBuckets.get(seat) || []).slice().sort((a, b) => a.rank - b.rank)
                  const first = members[0]
                  const names = members.map((m) => m.player_name || m.profiles?.display_name || "Unknown").join(" / ")
                  const pointBase = Number(first?.point ?? 0)
                  const allSamePoint = members.every((m) => Math.abs(Number(m.point) - pointBase) < 0.01)
                  const pointText =
                    members.length === 0
                      ? "-"
                      : members.length === 1
                        ? `${pointBase >= 0 ? "+" : ""}${pointBase.toFixed(2)}`
                        : allSamePoint
                          ? `${pointBase >= 0 ? "+" : ""}${pointBase.toFixed(2)}ずつ`
                          : members
                              .map((m) => {
                                const p = Number(m.point)
                                return `${p >= 0 ? "+" : ""}${p.toFixed(2)}`
                              })
                              .join(" / ")
                  return { seat, first, names, pointText, hasData: members.length > 0, isPositive: pointBase >= 0 }
                }).sort((a, b) => {
                  if (!a.hasData && !b.hasData) return a.seat - b.seat
                  if (!a.hasData) return 1
                  if (!b.hasData) return -1
                  if ((a.first?.rank ?? 999) !== (b.first?.rank ?? 999)) return (a.first?.rank ?? 999) - (b.first?.rank ?? 999)
                  return a.seat - b.seat
                })
                return (
                  <Link key={game.id} href={`/games/${game.id}`} className="block">
                    <div className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          {new Date(game.played_at).toLocaleDateString("ja-JP")}
                        </span>
                      </div>
                      <div className={cn("gap-2", seatCount === 4 ? "grid grid-cols-4" : "grid grid-cols-3")}>
                        {seatSummaries.map((seat: any) => (
                          <div key={`${game.id}-seat-${seat.seat}`} className="text-center min-w-0">
                            <div className="flex flex-col items-center gap-1">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={(seat.first?.profiles as any)?.avatar_url || undefined} />
                                <AvatarFallback>
                                  {(seat.first?.player_name || seat.first?.profiles?.display_name || "?")
                                    .charAt(0)
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-xs text-muted-foreground">{seat.hasData ? `${seat.first?.rank}位` : "-"}</div>
                              <div
                                className="text-sm font-medium truncate w-full"
                                title={seat.hasData ? seat.names : "-"}
                              >
                                {seat.hasData ? seat.names : "-"}
                              </div>
                            </div>
                            <div className={cn("text-xs", seat.isPositive ? "text-chart-1" : "text-destructive")}>{seat.pointText}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">まだ対局がありません</p>
              <Link href={`/games/new?league=${leagueId}`}>
                <Button>最初の対局を記録</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
