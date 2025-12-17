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
      setLoading(false)
    }

    loadData()
  }, [router, supabase])

  if (loading) {
    return <div className="p-6">読み込み中...</div>
  }

  const filteredResults = results.filter((r) => r.games?.game_type === gameType)

  const totalGames = filteredResults.length
  const totalPoints = filteredResults.reduce((sum, r) => sum + Number(r.point), 0)
  const avgRank = totalGames > 0 ? filteredResults.reduce((sum, r) => sum + r.rank, 0) / totalGames : 0
  const rentaiCount = filteredResults.filter((r) => r.rank <= 2).length
  const rentaiRate = totalGames > 0 ? (rentaiCount / totalGames) * 100 : 0

  const rankCounts = [0, 0, 0, 0]
  filteredResults.forEach((r) => {
    if (r.rank >= 1 && r.rank <= 4) {
      rankCounts[r.rank - 1]++
    }
  })

  const maxRankCount = Math.max(...rankCounts, 1)

  const scores = filteredResults.map((r) => r.raw_score)
  const highScore = scores.length > 0 ? Math.max(...scores) : null
  const lowScore = scores.length > 0 ? Math.min(...scores) : null

  const pointsHistory = filteredResults.map((result, index) => {
    const cumulativePoints = filteredResults.slice(0, index + 1).reduce((sum, r) => sum + Number(r.point), 0)

    return {
      game: index + 1,
      points: Number(cumulativePoints.toFixed(1)),
      date: new Date(result.games?.played_at || result.created_at).toLocaleDateString("ja-JP", {
        month: "short",
        day: "numeric",
      }),
    }
  })

  console.log("[v0] pointsHistory:", pointsHistory)

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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">総合pt推移</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={pointsHistory} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                <XAxis
                  dataKey="game"
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">順位分布</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-4 gap-3">
              {rankCounts.map((count, index) => {
                const percentage = totalGames > 0 ? (count / totalGames) * 100 : 0
                const heightPercentage = maxRankCount > 0 ? (count / maxRankCount) * 100 : 0

                return (
                  <div key={index} className="text-center">
                    <div className="w-full h-32 rounded-lg flex items-end justify-center relative overflow-hidden bg-muted">
                      <div
                        className={cn(
                          "absolute bottom-0 w-full transition-all",
                          index === 0 && "bg-accent",
                          index === 1 && "bg-chart-1",
                          index === 2 && "bg-chart-4",
                          index === 3 && "bg-destructive/60",
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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">記録</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">最高得点</p>
                <p className="text-2xl font-bold text-green-600">{highScore?.toLocaleString()}点</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">最低得点</p>
                <p className="text-2xl font-bold text-red-600">{lowScore?.toLocaleString()}点</p>
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
    <Card>
      <CardContent className="p-3">
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
