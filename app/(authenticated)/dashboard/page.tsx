"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Target, Award, Percent } from "lucide-react"
import { cn } from "@/lib/utils"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createBrowserClient()

  const [gameType, setGameType] = useState<"four_player" | "three_player">("four_player")
  const [profile, setProfile] = useState<any>(null)
  const [results, setResults] = useState<any[]>([])
  const [rollups, setRollups] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData?.user) {
        router.push("/auth/login")
        return
      }

      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", userData.user.id).single()

      setProfile(profileData)

      const { data: resultsData } = await supabase
        .from("game_results")
        .select("*, games(game_type, played_at, created_at)")
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: true })

      setResults(resultsData || [])

      const { data: rollupsData, error: rollupsError } = await supabase
        .from("user_game_rollups")
        .select("*")
        .eq("user_id", userData.user.id)

      if (rollupsError) {
        // eslint-disable-next-line no-console
        console.warn("[v0] failed to load user_game_rollups:", rollupsError)
      }
      setRollups(rollupsData || [])

      setLoading(false)
    }

    loadData()
  }, [router, supabase])

  if (loading) {
    return <div className="p-6">読み込み中...</div>
  }

  const filteredResults = results.filter((r) => r.games?.game_type === gameType)

  const rollup = rollups.find((r) => r.game_type === gameType) || null
  const rolledGameCount = Number(rollup?.rolled_game_count ?? 0)
  const rolledTotalPoints = Number(rollup?.rolled_total_points ?? 0)
  const rolledRankCounts = [
    Number(rollup?.rolled_rank1_count ?? 0),
    Number(rollup?.rolled_rank2_count ?? 0),
    Number(rollup?.rolled_rank3_count ?? 0),
    Number(rollup?.rolled_rank4_count ?? 0),
  ]
  const rolledRankSum =
    rolledRankCounts[0] * 1 + rolledRankCounts[1] * 2 + rolledRankCounts[2] * 3 + rolledRankCounts[3] * 4

  const currentGames = filteredResults.length
  const currentTotalPoints = filteredResults.reduce((sum, r) => sum + Number(r.point), 0)
  const currentRankSum = filteredResults.reduce((sum, r) => sum + Number(r.rank), 0)
  const currentRentaiCount = filteredResults.filter((r) => r.rank <= 2).length

  const totalGames = rolledGameCount + currentGames
  const totalPoints = rolledTotalPoints + currentTotalPoints
  const avgRank = totalGames > 0 ? (rolledRankSum + currentRankSum) / totalGames : 0
  const rentaiCount = rolledRankCounts[0] + rolledRankCounts[1] + currentRentaiCount
  const rentaiRate = totalGames > 0 ? (rentaiCount / totalGames) * 100 : 0

  const rankCounts = [0, 0, 0, 0]
  filteredResults.forEach((r) => {
    if (r.rank >= 1 && r.rank <= 4) {
      rankCounts[r.rank - 1]++
    }
  })
  rankCounts[0] += rolledRankCounts[0]
  rankCounts[1] += rolledRankCounts[1]
  rankCounts[2] += rolledRankCounts[2]
  rankCounts[3] += rolledRankCounts[3]

  const maxRankCount = Math.max(...rankCounts, 1)

  const scores = filteredResults.map((r) => r.raw_score)
  const currentHighScore = scores.length > 0 ? Math.max(...scores) : null
  const currentLowScore = scores.length > 0 ? Math.min(...scores) : null
  const rolledHighScore = rollup?.rolled_best_raw_score ?? null
  const rolledLowScore = rollup?.rolled_low_raw_score ?? null
  const highScore =
    currentHighScore === null ? rolledHighScore : rolledHighScore === null ? currentHighScore : Math.max(rolledHighScore, currentHighScore)
  const lowScore =
    currentLowScore === null ? rolledLowScore : rolledLowScore === null ? currentLowScore : Math.min(rolledLowScore, currentLowScore)

  const pointsHistory = filteredResults.map((result, index) => {
    const cumulativePoints = filteredResults.slice(0, index + 1).reduce((sum, r) => sum + Number(r.point), 0) + rolledTotalPoints

    return {
      game: rolledGameCount + index + 1,
      points: Number(cumulativePoints.toFixed(1)),
      date: new Date(result.games?.played_at || result.created_at).toLocaleDateString("ja-JP", {
        month: "short",
        day: "numeric",
      }),
    }
  })

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{profile?.display_name || "ユーザー"}さん、こんにちは</h1>
        <p className="text-muted-foreground">あなたの麻雀成績をチェックしましょう</p>
      </div>

      <Tabs value={gameType} onValueChange={(value) => setGameType(value as any)}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="four_player">四人麻雀</TabsTrigger>
          <TabsTrigger value="three_player">三人麻雀</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="総対戦数" value={`${totalGames}戦`} icon={Target} color="text-blue-500" />
        <StatCard
          title="総合pt"
          value={totalPoints >= 0 ? `+${totalPoints.toFixed(1)}` : totalPoints.toFixed(1)}
          icon={TrendingUp}
          color={totalPoints >= 0 ? "text-green-500" : "text-red-500"}
        />
        <StatCard
          title="平均順位"
          value={avgRank > 0 ? avgRank.toFixed(2) : "-"}
          icon={Award}
          color="text-yellow-500"
        />
        <StatCard
          title="連対率"
          value={totalGames > 0 ? `${rentaiRate.toFixed(1)}%` : "-"}
          icon={Percent}
          color="text-purple-500"
        />
      </div>

      {pointsHistory.length > 0 && (
        <Card className="border border-slate-100 shadow-sm bg-white pt-4 pb-2">
          <CardHeader className="pt-1 pb-1">
            <CardTitle className="text-lg">総合pt推移</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-2 !px-2 sm:!px-4">
            <ResponsiveContainer width="100%" height={205}>
              <LineChart data={pointsHistory} margin={{ top: 6, right: 10, bottom: 6, left: 0 }}>
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
                  formatter={(value: any) => [`${value >= 0 ? "+" : ""}${value}pt`, "累計pt"]}
                />
                <Line
                  type="linear"
                  dataKey="points"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#3b82f6" }}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {totalGames > 0 && (
        <Card className="border border-slate-100 shadow-md bg-white/90 backdrop-blur">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">順位分布</CardTitle>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {totalGames}戦の内訳
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-4 gap-3">
              {rankCounts.map((count, index) => {
                const percentage = totalGames > 0 ? (count / totalGames) * 100 : 0
                const heightPercentage = maxRankCount > 0 ? (count / maxRankCount) * 100 : 0

                return (
                  <div key={index} className="text-center">
                    <div className="w-full h-32 rounded-xl flex items-end justify-center relative overflow-hidden bg-gradient-to-b from-slate-50 to-muted">
                      <div
                        className={cn(
                          "absolute bottom-0 w-full transition-all rounded-t-xl",
                          index === 0 && "bg-gradient-to-t from-amber-300 to-amber-200",
                          index === 1 && "bg-gradient-to-t from-emerald-400 to-emerald-300",
                          index === 2 && "bg-gradient-to-t from-slate-300 to-slate-200",
                          index === 3 && "bg-gradient-to-t from-rose-300 to-rose-200",
                        )}
                        style={{ height: `${heightPercentage}%` }}
                      />
                      <span className="relative z-10 font-bold text-sm mb-2">{count}回</span>
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

      {/* Records */}
      {(highScore !== null || lowScore !== null) && (
        <Card className="border border-slate-100 shadow-sm bg-white">
          <CardHeader className="pb-1">
            <CardTitle className="text-lg">記録</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-emerald-50/80 ring-1 ring-emerald-100 text-center">
                <p className="text-xs text-muted-foreground">最高得点</p>
                <p className="text-xl font-bold text-emerald-600 mt-1">{highScore?.toLocaleString()}点</p>
              </div>
              <div className="p-3 rounded-lg bg-rose-50/80 ring-1 ring-rose-100 text-center">
                <p className="text-xs text-muted-foreground">最低得点</p>
                <p className="text-xl font-bold text-rose-600 mt-1">{lowScore?.toLocaleString()}点</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
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
  color: string
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
