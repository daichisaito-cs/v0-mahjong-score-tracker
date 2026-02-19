"use client"

import type React from "react"

import { useEffect, useMemo } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { useAuthUser } from "@/lib/hooks/use-auth-user"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Target, Award, Percent, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PointsHistoryChart } from "@/components/points-history-chart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserProfilePage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const userId = useMemo(() => {
    const raw = params?.id
    return Array.isArray(raw) ? raw[0] : raw
  }, [params])
  const fromFriendsTab = searchParams.get("from") === "friends"
  const backHref = fromFriendsTab ? "/mypage?tab=friends" : "/mypage"

  const userQuery = useAuthUser()

  const user = userQuery.data

  useEffect(() => {
    if (userQuery.isFetched && !user) router.replace("/auth/login")
  }, [router, user, userQuery.isFetched])

  const dataQuery = useQuery({
    queryKey: ["user-profile", user?.id, userId],
    enabled: Boolean(user?.id && userId),
    queryFn: async () => {
      const [profileRes, friendshipRes, resultsRes, rollupsRes] = await Promise.all([
        supabase.from("profiles").select("id, display_name, avatar_url").eq("id", userId!).single(),
        supabase
          .from("friendships")
          .select("id")
          .eq("status", "accepted")
          .or(
            `and(requester_id.eq.${user!.id},addressee_id.eq.${userId}),and(requester_id.eq.${userId},addressee_id.eq.${user!.id})`,
          )
          .maybeSingle(),
        supabase
          .from("game_results")
          .select("id, rank, raw_score, point, created_at, games(game_type, created_at)")
          .eq("user_id", userId!)
          .order("created_at", { ascending: false }),
        supabase
          .from("user_game_rollups")
          .select(
            "game_type, rolled_game_count, rolled_total_points, rolled_rank1_count, rolled_rank2_count, rolled_rank3_count, rolled_rank4_count, rolled_best_raw_score, rolled_low_raw_score",
          )
          .eq("user_id", userId!),
      ])

      if (profileRes.error) throw profileRes.error
      if (friendshipRes.error) throw friendshipRes.error
      if (resultsRes.error) throw resultsRes.error
      if (rollupsRes.error) {
        // rollups がまだ導入されていない環境でもページが落ちないようにする
        console.warn("[v0] failed to load user_game_rollups:", rollupsRes.error)
      }

      return {
        profile: profileRes.data,
        friendship: friendshipRes.data,
        results: resultsRes.data || [],
        rollups: rollupsRes.data || [],
      }
    },
  })

  if (userQuery.isLoading || (userQuery.isFetched && !user)) {
    return (
      <div className="space-y-6 pb-20 md:pb-0">
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">読み込み中...</CardContent>
        </Card>
      </div>
    )
  }

  if (!userId) {
    return (
      <div className="space-y-6 pb-20 md:pb-0">
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">ユーザーが見つかりません</CardContent>
        </Card>
      </div>
    )
  }

  if (dataQuery.isLoading) {
    return (
      <div className="space-y-6 pb-20 md:pb-0">
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">読み込み中...</CardContent>
        </Card>
      </div>
    )
  }

  const profile = (dataQuery.data as any)?.profile
  const friendship = (dataQuery.data as any)?.friendship
  const results = (dataQuery.data as any)?.results as any[]
  const rollups = (dataQuery.data as any)?.rollups as any[]

  if (!profile) {
    return (
      <div className="space-y-6 pb-20 md:pb-0">
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">ユーザーが見つかりません</CardContent>
        </Card>
      </div>
    )
  }

  if (userId !== user?.id && !friendship) {
    return (
      <div className="space-y-6 pb-20 md:pb-0">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">このユーザーの成績は閲覧できません</p>
            <Link href="/mypage">
              <Button>マイページに戻る</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const fourPlayerResults = results?.filter((r) => r.games?.game_type === "four_player") || []
  const threePlayerResults = results?.filter((r) => r.games?.game_type === "three_player") || []

  const getRollupForType = (gameType: "four_player" | "three_player") =>
    (rollups || []).find((r: any) => r.game_type === gameType) || null

  const createPointsHistory = (gameResults: typeof results, gameType: "four_player" | "three_player") => {
    const rollup = getRollupForType(gameType)
    const basePoints = Number(rollup?.rolled_total_points ?? 0)
    const baseGames = Number(rollup?.rolled_game_count ?? 0)
    let cumulativePoints = basePoints
    return (
      gameResults
        ?.sort((a, b) => new Date(a.games.created_at).getTime() - new Date(b.games.created_at).getTime())
        .map((result, index) => {
          cumulativePoints += Number(result.point)
          return {
            game: baseGames + index + 1,
            points: cumulativePoints,
            date: new Date(result.games.created_at).toLocaleDateString("ja-JP", {
              month: "short",
              day: "numeric",
            }),
          }
        }) || []
    )
  }

  const fourPlayerPointsHistory = createPointsHistory(fourPlayerResults, "four_player")
  const threePlayerPointsHistory = createPointsHistory(threePlayerResults, "three_player")

  const calculateStats = (gameResults: typeof results, gameType: "four_player" | "three_player") => {
    const rankLimit = gameType === "four_player" ? 4 : 3
    const rollup = getRollupForType(gameType)
    const rolledGameCount = Number(rollup?.rolled_game_count ?? 0)
    const rolledTotalPoints = Number(rollup?.rolled_total_points ?? 0)
    const rolledRankCounts = [
      Number(rollup?.rolled_rank1_count ?? 0),
      Number(rollup?.rolled_rank2_count ?? 0),
      Number(rollup?.rolled_rank3_count ?? 0),
      Number(rollup?.rolled_rank4_count ?? 0),
    ].slice(0, rankLimit)
    const rolledRankSum = rolledRankCounts.reduce((sum, count, index) => sum + count * (index + 1), 0)

    const currentGames = gameResults?.length || 0
    const currentTotalPoints = gameResults?.reduce((sum, r) => sum + Number(r.point), 0) || 0
    const currentRankSum = gameResults?.reduce((sum, r) => sum + Number(r.rank), 0) || 0
    const currentRentaiCount = gameResults?.filter((r) => r.rank <= 2).length || 0

    const totalGames = rolledGameCount + currentGames
    const totalPoints = rolledTotalPoints + currentTotalPoints
    const avgRank = totalGames > 0 ? (rolledRankSum + currentRankSum) / totalGames : 0
    const rentaiCount = rolledRankCounts[0] + rolledRankCounts[1] + currentRentaiCount
    const rentaiRate = totalGames > 0 ? (rentaiCount / totalGames) * 100 : 0

    const rankCounts = Array.from({ length: rankLimit }, () => 0)
    gameResults?.forEach((r) => {
      if (r.rank >= 1 && r.rank <= rankLimit) {
        rankCounts[r.rank - 1]++
      }
    })
    rolledRankCounts.forEach((count, index) => {
      rankCounts[index] += count
    })

    const maxRankCount = Math.max(...rankCounts)

    const scores = gameResults?.map((r) => r.raw_score) || []
    const currentHighScore = scores.length > 0 ? Math.max(...scores) : null
    const currentLowScore = scores.length > 0 ? Math.min(...scores) : null
    const rolledHighScore = rollup?.rolled_best_raw_score ?? null
    const rolledLowScore = rollup?.rolled_low_raw_score ?? null
    const highScore =
      currentHighScore === null
        ? rolledHighScore
        : rolledHighScore === null
          ? currentHighScore
          : Math.max(rolledHighScore, currentHighScore)
    const lowScore =
      currentLowScore === null
        ? rolledLowScore
        : rolledLowScore === null
          ? currentLowScore
          : Math.min(rolledLowScore, currentLowScore)

    return { totalGames, totalPoints, avgRank, rentaiRate, rankCounts, maxRankCount, highScore, lowScore }
  }

  const fourPlayerStats = calculateStats(fourPlayerResults, "four_player")
  const threePlayerStats = calculateStats(threePlayerResults, "three_player")

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="space-y-3">
        <Button variant="outline" size="sm" className="gap-1.5 bg-transparent" asChild>
          <Link href={backHref}>
            <ArrowLeft className="w-4 h-4 mr-0" />
            {fromFriendsTab ? "戻る" : "戻る"}
          </Link>
        </Button>
        <div className="flex items-center gap-4 px-2">
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarImage src={profile.avatar_url || undefined} />
            <AvatarFallback>{profile.display_name?.charAt(0).toUpperCase() || "?"}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{profile.display_name}さんの成績</h1>
            <p className="text-muted-foreground">フレンドの麻雀成績</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="four_player" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="four_player">四人麻雀</TabsTrigger>
          <TabsTrigger value="three_player">三人麻雀</TabsTrigger>
        </TabsList>

        <TabsContent value="four_player" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="総対戦数" value={`${fourPlayerStats.totalGames}戦`} icon={Target} color="text-blue-500" />
            <StatCard
              title="総合pt"
              value={
                fourPlayerStats.totalPoints >= 0
                  ? `+${fourPlayerStats.totalPoints.toFixed(1)}`
                  : fourPlayerStats.totalPoints.toFixed(1)
              }
              icon={TrendingUp}
              color={fourPlayerStats.totalPoints >= 0 ? "text-green-500" : "text-red-500"}
            />
            <StatCard
              title="平均順位"
              value={fourPlayerStats.avgRank > 0 ? fourPlayerStats.avgRank.toFixed(2) : "-"}
              icon={Award}
              color="text-yellow-500"
            />
            <StatCard
              title="連対率"
              value={fourPlayerStats.totalGames > 0 ? `${fourPlayerStats.rentaiRate.toFixed(1)}%` : "-"}
              icon={Percent}
              color="text-purple-500"
            />
          </div>

          {fourPlayerPointsHistory.length > 0 && (
            <Card className="border border-slate-100 shadow-sm bg-white pt-4 pb-2">
              <CardHeader className="pt-1 pb-1 px-4">
                <CardTitle className="text-lg">総合pt推移</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-2 px-3 sm:px-4">
                <PointsHistoryChart data={fourPlayerPointsHistory} stroke="#3b82f6" />
              </CardContent>
            </Card>
          )}

          {fourPlayerStats.totalGames > 0 && (
            <Card className="border border-slate-100 shadow-sm bg-white">
              <CardHeader className="pb-2 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">順位分布</CardTitle>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {fourPlayerStats.totalGames}戦の内訳
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0 px-4">
                <div className="grid grid-cols-4 gap-3">
                  {fourPlayerStats.rankCounts.map((count, index) => {
                    const percentage = fourPlayerStats.totalGames > 0 ? (count / fourPlayerStats.totalGames) * 100 : 0
                    const heightPercentage =
                      fourPlayerStats.maxRankCount > 0 ? (count / fourPlayerStats.maxRankCount) * 100 : 0
                    return (
                      <div key={index} className="text-center">
                        <div className="w-full h-36 relative flex items-end justify-center">
                          <div className="absolute inset-x-0 bottom-0 border-b border-slate-300/90" />
                          {count > 0 ? (
                            <div
                              className={cn(
                                "relative z-10 w-[84%] max-w-[96px] transition-all rounded-none flex items-end justify-center",
                                index === 0 && "bg-gradient-to-t from-amber-300 to-amber-200",
                                index === 1 && "bg-gradient-to-t from-emerald-400 to-emerald-300",
                                index === 2 && "bg-gradient-to-t from-sky-300 to-sky-200",
                                index === 3 && "bg-gradient-to-t from-rose-300 to-rose-200",
                              )}
                              style={{ height: `${Math.max(heightPercentage, 16)}%` }}
                            >
                              <span className="font-bold text-sm mb-2 leading-none">{count}回</span>
                            </div>
                          ) : (
                            <span className="relative z-10 text-sm font-bold text-muted-foreground mb-2 leading-none">
                              {count}回
                            </span>
                          )}
                        </div>
                        <p className="text-sm mt-2 font-medium">{index + 1}位</p>
                        <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {(fourPlayerStats.highScore !== null || fourPlayerStats.lowScore !== null) && (
            <Card className="border border-slate-100 shadow-sm bg-white">
              <CardHeader className="pb-1 px-4">
                <CardTitle className="text-lg">記録</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-emerald-50/80 ring-1 ring-emerald-100 text-center">
                    <p className="text-xs text-muted-foreground">最高得点</p>
                    <p className="text-xl font-bold text-emerald-600 mt-1">
                      {fourPlayerStats.highScore?.toLocaleString()}点
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-rose-50/80 ring-1 ring-rose-100 text-center">
                    <p className="text-xs text-muted-foreground">最低得点</p>
                    <p className="text-xl font-bold text-rose-600 mt-1">
                      {fourPlayerStats.lowScore?.toLocaleString()}点
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="three_player" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="総対戦数" value={`${threePlayerStats.totalGames}戦`} icon={Target} color="text-blue-500" />
            <StatCard
              title="総合pt"
              value={
                threePlayerStats.totalPoints >= 0
                  ? `+${threePlayerStats.totalPoints.toFixed(1)}`
                  : threePlayerStats.totalPoints.toFixed(1)
              }
              icon={TrendingUp}
              color={threePlayerStats.totalPoints >= 0 ? "text-green-500" : "text-red-500"}
            />
            <StatCard
              title="平均順位"
              value={threePlayerStats.avgRank > 0 ? threePlayerStats.avgRank.toFixed(2) : "-"}
              icon={Award}
              color="text-yellow-500"
            />
            <StatCard
              title="連対率"
              value={threePlayerStats.totalGames > 0 ? `${threePlayerStats.rentaiRate.toFixed(1)}%` : "-"}
              icon={Percent}
              color="text-purple-500"
            />
          </div>

          {threePlayerPointsHistory.length > 0 && (
            <Card className="border border-slate-100 shadow-sm bg-white pt-4 pb-2">
              <CardHeader className="pt-1 pb-1 px-4">
                <CardTitle className="text-lg">総合pt推移</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-2 px-3 sm:px-4">
                <PointsHistoryChart data={threePlayerPointsHistory} stroke="#3b82f6" />
              </CardContent>
            </Card>
          )}

          {threePlayerStats.totalGames > 0 && (
            <Card className="border border-slate-100 shadow-sm bg-white">
              <CardHeader className="pb-2 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">順位分布</CardTitle>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {threePlayerStats.totalGames}戦の内訳
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0 px-4">
                <div className="grid grid-cols-3 gap-3">
                  {threePlayerStats.rankCounts.slice(0, 3).map((count, index) => {
                    const percentage = threePlayerStats.totalGames > 0 ? (count / threePlayerStats.totalGames) * 100 : 0
                    const heightPercentage =
                      threePlayerStats.maxRankCount > 0 ? (count / threePlayerStats.maxRankCount) * 100 : 0
                    return (
                      <div key={index} className="text-center">
                        <div className="w-full h-36 relative flex items-end justify-center">
                          <div className="absolute inset-x-0 bottom-0 border-b border-slate-300/90" />
                          {count > 0 ? (
                            <div
                              className={cn(
                                "relative z-10 w-[84%] max-w-[96px] transition-all rounded-none flex items-end justify-center",
                                index === 0 && "bg-gradient-to-t from-amber-300 to-amber-200",
                                index === 1 && "bg-gradient-to-t from-emerald-400 to-emerald-300",
                                index === 2 && "bg-gradient-to-t from-sky-300 to-sky-200",
                              )}
                              style={{ height: `${Math.max(heightPercentage, 16)}%` }}
                            >
                              <span className="font-bold text-sm mb-2 leading-none">{count}回</span>
                            </div>
                          ) : (
                            <span className="relative z-10 text-sm font-bold text-muted-foreground mb-2 leading-none">
                              {count}回
                            </span>
                          )}
                        </div>
                        <p className="text-sm mt-2 font-medium">{index + 1}位</p>
                        <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {(threePlayerStats.highScore !== null || threePlayerStats.lowScore !== null) && (
            <Card className="border border-slate-100 shadow-sm bg-white">
              <CardHeader className="pb-1 px-4">
                <CardTitle className="text-lg">記録</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-emerald-50/80 ring-1 ring-emerald-100 text-center">
                    <p className="text-xs text-muted-foreground">最高得点</p>
                    <p className="text-xl font-bold text-emerald-600 mt-1">
                      {threePlayerStats.highScore?.toLocaleString()}点
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-rose-50/80 ring-1 ring-rose-100 text-center">
                    <p className="text-xs text-muted-foreground">最低得点</p>
                    <p className="text-xl font-bold text-rose-600 mt-1">
                      {threePlayerStats.lowScore?.toLocaleString()}点
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string
  value: string
  icon: React.ElementType
  color?: string
}) {
  return (
    <Card className="!py-0">
      <CardContent className="py-3 !px-4">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg bg-muted", color)}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
