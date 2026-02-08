"use client"

import { useEffect, useMemo } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { useAuthUser } from "@/lib/hooks/use-auth-user"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Trophy, Settings } from "lucide-react"
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

  const leagueId = useMemo(() => {
    const raw = params?.id
    return Array.isArray(raw) ? raw[0] : raw
  }, [params])

  const userQuery = useAuthUser()

  const user = userQuery.data

  useEffect(() => {
    if (userQuery.isFetched && !user) router.replace("/auth/login")
  }, [router, user, userQuery.isFetched])

  if (userQuery.isLoading || (userQuery.isFetched && !user)) {
    return (
      <div className="space-y-6 pb-20 md:pb-0 max-w-xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">読み込み中...</CardContent>
        </Card>
      </div>
    )
  }

  if (leagueId === "new") {
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

  if (!leagueId || !isValidUUID(leagueId)) {
    return (
      <div className="space-y-6 pb-20 md:pb-0 max-w-xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">リーグが見つかりません</CardContent>
        </Card>
      </div>
    )
  }

  const leagueQuery = useQuery({
    queryKey: ["league-detail", leagueId, user?.id],
    enabled: Boolean(user?.id && leagueId && isValidUUID(leagueId)),
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
        .select(
          `
          *,
          game_results (
            *,
            profiles (display_name, avatar_url)
          )
        `,
        )
        .eq("league_id", leagueId)
        .order("played_at", { ascending: false })
      if (gamesError) throw gamesError

      const { data: leagueRollups, error: leagueRollupsError } = await supabase
        .from("league_user_game_rollups")
        .select("*")
        .eq("league_id", leagueId)
      if (leagueRollupsError) {
        // eslint-disable-next-line no-console
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
          // eslint-disable-next-line no-console
          console.warn("[v0] failed to load profiles:", profilesError)
        } else {
          extraProfiles = profilesData || []
        }
      }

      return { league, members: members || [], ownerProfile, games: games || [], leagueRollups: leagueRollups || [], extraProfiles }
    },
  })

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
      bestScore: number | null
      fourthCount: number
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
          bestScore: null,
          fourthCount: 0,
        }
      }

      playerStats[odIndex].totalPoints += Number(result.point)
      playerStats[odIndex].gameCount += 1
      playerStats[odIndex].rankSum += Number(result.rank)
      const rawScoreNum = Number((result.raw_score ?? "").toString().replace(/,/g, ""))
      if (Number.isFinite(rawScoreNum)) {
        const currentBest = playerStats[odIndex].bestScore
        playerStats[odIndex].bestScore =
          currentBest === null || currentBest === undefined ? rawScoreNum : Math.max(currentBest as number, rawScoreNum)
      }
      if (result.rank === 4) {
        playerStats[odIndex].fourthCount += 1
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
        bestScore: null,
        fourthCount: 0,
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
    playerStats[userId].fourthCount += rolledRankCounts[3]
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
        bestScore: null,
        fourthCount: 0,
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
      avoidRate: p.gameCount > 0 ? 1 - p.fourthCount / p.gameCount : null,
    }))
    .filter((p) => Number.isFinite(p.avoidRate))
    .sort((a, b) => (b.avoidRate as number) - (a.avoidRate as number))
  const avoidRanking = addRankLabels(avoidCandidates, (player) => player.avoidRate as number).filter(
    (player) => player.rankLabel <= 3,
  )

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
            <LeagueMemberAdd leagueId={leagueId} userId={user!.id} existingMemberIds={existingMemberIds} />
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
              <p className="text-xs text-muted-foreground">
                対局履歴は各記録者ごとに直近30戦まで表示されます（成績は全期間）。
              </p>
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
                    <div className="flex items-center gap-3">
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
                      <div>
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {player.gameCount}戦 / 平均{avgRank !== null ? `${avgRank.toFixed(2)}位` : "-"}
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
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-muted-foreground">#{player.rankLabel}</span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={player.avatarUrl || undefined} />
                      <AvatarFallback>{player.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{player.name}</p>
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
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-muted-foreground">#{player.rankLabel}</span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={player.avatarUrl || undefined} />
                      <AvatarFallback>{player.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{player.name}</p>
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
                const sortedResults = [...(game.game_results || [])].sort((a, b) => a.rank - b.rank)
                return (
                  <Link key={game.id} href={`/games/${game.id}`} className="block">
                    <div className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          {new Date(game.played_at).toLocaleDateString("ja-JP")}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {sortedResults.map((result: any) => (
                          <div key={result.id} className="text-center min-w-0">
                            <div className="flex flex-col items-center gap-1">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={(result.profiles as any)?.avatar_url || undefined} />
                                <AvatarFallback>
                                  {(result.player_name || result.profiles?.display_name || "?")
                                    .charAt(0)
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-xs text-muted-foreground">{result.rank}位</div>
                              <div
                                className="text-sm font-medium truncate w-full"
                                title={result.player_name || result.profiles?.display_name || "Unknown"}
                              >
                                {result.player_name || result.profiles?.display_name || "Unknown"}
                              </div>
                            </div>
                            <div
                              className={cn("text-xs", Number(result.point) >= 0 ? "text-chart-1" : "text-destructive")}
                            >
                              {Number(result.point) >= 0 ? "+" : ""}
                              {Number(result.point).toFixed(1)}
                            </div>
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
