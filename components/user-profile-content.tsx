"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Target, Award, Percent } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { getOptimizedAvatarUrl } from "@/lib/avatar"
import { PointsHistoryChart } from "@/components/points-history-chart"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { BackButton } from "@/components/back-button"

interface GameResult {
  id: string
  rank: number
  raw_score: number
  point: number
  created_at: string
  games: { game_type: string; created_at: string } | null
}

interface Rollup {
  game_type: string
  rolled_game_count: number
  rolled_total_points: number
  rolled_rank1_count: number
  rolled_rank2_count: number
  rolled_rank3_count: number
  rolled_rank4_count: number
  rolled_best_raw_score: number | null
  rolled_low_raw_score: number | null
}

interface UserProfileContentProps {
  profile: { id: string; display_name: string | null; avatar_url: string | null }
  results: GameResult[]
  rollups: Rollup[]
  backFallback: string
  backLabel?: string
}

export function UserProfileContent({
  profile,
  results,
  rollups,
  backFallback,
}: UserProfileContentProps) {
  const [isAvatarPreviewOpen, setIsAvatarPreviewOpen] = useState(false)

  const fourPlayerResults = results.filter((r) => r.games?.game_type === "four_player")
  const threePlayerResults = results.filter((r) => r.games?.game_type === "three_player")

  const getRollupForType = (gameType: "four_player" | "three_player") =>
    rollups.find((r) => r.game_type === gameType) || null

  const createPointsHistory = (gameResults: GameResult[], gameType: "four_player" | "three_player") => {
    const rollup = getRollupForType(gameType)
    const basePoints = Number(rollup?.rolled_total_points ?? 0)
    const baseGames = Number(rollup?.rolled_game_count ?? 0)
    let cumulativePoints = basePoints
    return gameResults
      .slice()
      .sort((a, b) => new Date(a.games!.created_at).getTime() - new Date(b.games!.created_at).getTime())
      .map((result, index) => {
        cumulativePoints += Number(result.point)
        return {
          game: baseGames + index + 1,
          points: cumulativePoints,
          date: new Date(result.games!.created_at).toLocaleDateString("ja-JP", {
            month: "short",
            day: "numeric",
          }),
        }
      })
  }

  const fourPlayerPointsHistory = createPointsHistory(fourPlayerResults, "four_player")
  const threePlayerPointsHistory = createPointsHistory(threePlayerResults, "three_player")

  const calculateStats = (gameResults: GameResult[], gameType: "four_player" | "three_player") => {
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

    const currentGames = gameResults.length
    const currentTotalPoints = gameResults.reduce((sum, r) => sum + Number(r.point), 0)
    const currentRankSum = gameResults.reduce((sum, r) => sum + Number(r.rank), 0)
    const currentRentaiCount = gameResults.filter((r) => r.rank <= 2).length

    const totalGames = rolledGameCount + currentGames
    const totalPoints = rolledTotalPoints + currentTotalPoints
    const avgRank = totalGames > 0 ? (rolledRankSum + currentRankSum) / totalGames : 0
    const rentaiCount = rolledRankCounts[0] + rolledRankCounts[1] + currentRentaiCount
    const rentaiRate = totalGames > 0 ? (rentaiCount / totalGames) * 100 : 0

    const rankCounts = Array.from({ length: rankLimit }, () => 0)
    gameResults.forEach((r) => {
      if (r.rank >= 1 && r.rank <= rankLimit) rankCounts[r.rank - 1]++
    })
    rolledRankCounts.forEach((count, index) => {
      rankCounts[index] += count
    })
    const maxRankCount = Math.max(...rankCounts)

    const scores = gameResults.map((r) => r.raw_score)
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

  const renderStats = (
    stats: ReturnType<typeof calculateStats>,
    pointsHistory: ReturnType<typeof createPointsHistory>,
    rankLimit: number,
  ) => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="総対戦数" value={`${stats.totalGames}戦`} icon={Target} color="text-blue-500" />
        <StatCard
          title="総合pt"
          value={stats.totalPoints >= 0 ? `+${stats.totalPoints.toFixed(1)}` : stats.totalPoints.toFixed(1)}
          icon={TrendingUp}
          color={stats.totalPoints >= 0 ? "text-green-500" : "text-red-500"}
        />
        <StatCard
          title="平均順位"
          value={stats.avgRank > 0 ? stats.avgRank.toFixed(2) : "-"}
          icon={Award}
          color="text-yellow-500"
        />
        <StatCard
          title="連対率"
          value={stats.totalGames > 0 ? `${stats.rentaiRate.toFixed(1)}%` : "-"}
          icon={Percent}
          color="text-purple-500"
        />
      </div>

      {pointsHistory.length > 0 && (
        <Card className="border border-slate-100 shadow-sm bg-white pt-4 pb-2">
          <CardHeader className="pt-1 pb-1 px-4">
            <CardTitle className="text-lg">総合pt推移</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-2 px-3 sm:px-4">
            <PointsHistoryChart data={pointsHistory} stroke="#3b82f6" />
          </CardContent>
        </Card>
      )}

      {stats.totalGames > 0 && (
        <Card className="border border-slate-100 shadow-sm bg-white">
          <CardHeader className="pb-2 px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">順位分布</CardTitle>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {stats.totalGames}戦の内訳
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-0 px-4">
            <div className={cn("grid gap-3", rankLimit === 4 ? "grid-cols-4" : "grid-cols-3")}>
              {stats.rankCounts.slice(0, rankLimit).map((count, index) => {
                const percentage = stats.totalGames > 0 ? (count / stats.totalGames) * 100 : 0
                const heightPercentage = stats.maxRankCount > 0 ? (count / stats.maxRankCount) * 100 : 0
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

      {(stats.highScore !== null || stats.lowScore !== null) && (
        <Card className="border border-slate-100 shadow-sm bg-white">
          <CardHeader className="pb-1 px-4">
            <CardTitle className="text-lg">記録</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-emerald-50/80 ring-1 ring-emerald-100 text-center">
                <p className="text-xs text-muted-foreground">最高得点</p>
                <p className="text-xl font-bold text-emerald-600 mt-1">{stats.highScore?.toLocaleString()}点</p>
              </div>
              <div className="p-3 rounded-lg bg-rose-50/80 ring-1 ring-rose-100 text-center">
                <p className="text-xs text-muted-foreground">最低得点</p>
                <p className="text-xl font-bold text-rose-600 mt-1">{stats.lowScore?.toLocaleString()}点</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="space-y-3">
        <BackButton fallbackPath={backFallback} label="戻る" variant="outline" />
        <div className="flex items-center gap-4 px-2">
          <button
            type="button"
            className="shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setIsAvatarPreviewOpen(true)}
            aria-label="プロフィール画像を拡大表示"
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={getOptimizedAvatarUrl(profile.avatar_url, { size: 96, quality: 55 })} />
              <AvatarFallback>{profile.display_name?.charAt(0).toUpperCase() || "?"}</AvatarFallback>
            </Avatar>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{profile.display_name}さんの成績</h1>
            <p className="text-muted-foreground">フレンドの麻雀成績</p>
          </div>
        </div>
      </div>

      <Dialog open={isAvatarPreviewOpen} onOpenChange={setIsAvatarPreviewOpen}>
        <DialogContent className="max-w-sm">
          <DialogTitle className="sr-only">プロフィール画像</DialogTitle>
          <div className="flex items-center justify-center py-2">
            <Avatar className="h-56 w-56">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback className="text-4xl">{profile.display_name?.charAt(0).toUpperCase() || "?"}</AvatarFallback>
            </Avatar>
          </div>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="four_player" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="four_player">四人麻雀</TabsTrigger>
          <TabsTrigger value="three_player">三人麻雀</TabsTrigger>
        </TabsList>
        <TabsContent value="four_player">{renderStats(fourPlayerStats, fourPlayerPointsHistory, 4)}</TabsContent>
        <TabsContent value="three_player">{renderStats(threePlayerStats, threePlayerPointsHistory, 3)}</TabsContent>
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
