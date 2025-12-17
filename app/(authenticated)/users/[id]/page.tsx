import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Target, Award, Percent, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default async function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // 現在のユーザー確認
  const { data: userData, error } = await supabase.auth.getUser()
  if (error || !userData?.user) {
    redirect("/auth/login")
  }

  // プロフィール取得
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", id).single()

  if (!profile) {
    notFound()
  }

  // フレンド関係確認
  const { data: friendship } = await supabase
    .from("friendships")
    .select("*")
    .eq("status", "accepted")
    .or(
      `and(requester_id.eq.${userData.user.id},addressee_id.eq.${id}),and(requester_id.eq.${id},addressee_id.eq.${userData.user.id})`,
    )
    .single()

  // 自分自身またはフレンドでない場合はアクセス拒否
  if (id !== userData.user.id && !friendship) {
    notFound()
  }

  // 成績データ取得
  const { data: results } = await supabase
    .from("game_results")
    .select("*, games(game_type, created_at)")
    .eq("user_id", id)
    .order("created_at", { ascending: false })

  const fourPlayerResults = results?.filter((r) => r.games?.game_type === "four_player") || []
  const threePlayerResults = results?.filter((r) => r.games?.game_type === "three_player") || []

  const createPointsHistory = (gameResults: typeof results) => {
    let cumulativePoints = 0
    return (
      gameResults
        ?.sort((a, b) => new Date(a.games.created_at).getTime() - new Date(b.games.created_at).getTime())
        .map((result, index) => {
          cumulativePoints += Number(result.point)
          return {
            game: index + 1,
            points: cumulativePoints,
            date: new Date(result.games.created_at).toLocaleDateString("ja-JP", {
              month: "short",
              day: "numeric",
            }),
          }
        }) || []
    )
  }

  const fourPlayerPointsHistory = createPointsHistory(fourPlayerResults)
  const threePlayerPointsHistory = createPointsHistory(threePlayerResults)

  const calculateStats = (gameResults: typeof results) => {
    const totalGames = gameResults?.length || 0
    const totalPoints = gameResults?.reduce((sum, r) => sum + Number(r.point), 0) || 0
    const avgRank = totalGames > 0 ? (gameResults?.reduce((sum, r) => sum + r.rank, 0) || 0) / totalGames : 0
    const rentaiCount = gameResults?.filter((r) => r.rank <= 2).length || 0
    const rentaiRate = totalGames > 0 ? (rentaiCount / totalGames) * 100 : 0

    const rankCounts = [0, 0, 0, 0]
    gameResults?.forEach((r) => {
      if (r.rank >= 1 && r.rank <= 4) {
        rankCounts[r.rank - 1]++
      }
    })

    const maxRankCount = Math.max(...rankCounts)

    const scores = gameResults?.map((r) => r.raw_score) || []
    const highScore = scores.length > 0 ? Math.max(...scores) : null
    const lowScore = scores.length > 0 ? Math.min(...scores) : null

    return { totalGames, totalPoints, avgRank, rentaiRate, rankCounts, maxRankCount, highScore, lowScore }
  }

  const fourPlayerStats = calculateStats(fourPlayerResults)
  const threePlayerStats = calculateStats(threePlayerResults)

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/mypage">
            <ArrowLeft className="w-4 h-4 mr-2" />
            戻る
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{profile.display_name}さんの成績</h1>
          <p className="text-muted-foreground">フレンドの麻雀成績</p>
        </div>
      </div>

      <Tabs defaultValue="four_player" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="four_player">四人麻雀</TabsTrigger>
          <TabsTrigger value="three_player">三人麻雀</TabsTrigger>
        </TabsList>

        {/* 四人麻雀タブ */}
        <TabsContent value="four_player" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="総対戦数" value={`${fourPlayerStats.totalGames}戦`} icon={Target} />
            <StatCard
              title="総合pt"
              value={
                fourPlayerStats.totalPoints >= 0
                  ? `+${fourPlayerStats.totalPoints.toFixed(1)}`
                  : fourPlayerStats.totalPoints.toFixed(1)
              }
              icon={TrendingUp}
            />
            <StatCard
              title="平均順位"
              value={fourPlayerStats.avgRank > 0 ? fourPlayerStats.avgRank.toFixed(2) : "-"}
              icon={Award}
            />
            <StatCard
              title="連対率"
              value={fourPlayerStats.totalGames > 0 ? `${fourPlayerStats.rentaiRate.toFixed(1)}%` : "-"}
              icon={Percent}
            />
          </div>

          {/* 総合pt推移 */}
          {fourPlayerPointsHistory.length > 0 && (
            <Card className="py-4">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-lg">総合pt推移</CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-4">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={fourPlayerPointsHistory}>
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="linear" dataKey="points" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* 順位分布 */}
          {fourPlayerStats.totalGames > 0 && (
            <Card className="py-4">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-lg">順位分布</CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-4">
                <div className="grid grid-cols-4 gap-3">
                  {fourPlayerStats.rankCounts.map((count, index) => {
                    const percentage = fourPlayerStats.totalGames > 0 ? (count / fourPlayerStats.totalGames) * 100 : 0
                    const heightPercentage =
                      fourPlayerStats.maxRankCount > 0 ? (count / fourPlayerStats.maxRankCount) * 100 : 0
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

          {/* 記録 */}
          {(fourPlayerStats.highScore !== null || fourPlayerStats.lowScore !== null) && (
            <Card className="py-4">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-lg">記録</CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-accent/20 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">最高得点</p>
                    <p className="text-2xl font-bold text-chart-1">{fourPlayerStats.highScore?.toLocaleString()}点</p>
                  </div>
                  <div className="p-4 bg-destructive/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">最低得点</p>
                    <p className="text-2xl font-bold text-destructive">
                      {fourPlayerStats.lowScore?.toLocaleString()}点
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* 三人麻雀タブ */}
        <TabsContent value="three_player" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="総対戦数" value={`${threePlayerStats.totalGames}戦`} icon={Target} />
            <StatCard
              title="総合pt"
              value={
                threePlayerStats.totalPoints >= 0
                  ? `+${threePlayerStats.totalPoints.toFixed(1)}`
                  : threePlayerStats.totalPoints.toFixed(1)
              }
              icon={TrendingUp}
            />
            <StatCard
              title="平均順位"
              value={threePlayerStats.avgRank > 0 ? threePlayerStats.avgRank.toFixed(2) : "-"}
              icon={Award}
            />
            <StatCard
              title="連対率"
              value={threePlayerStats.totalGames > 0 ? `${threePlayerStats.rentaiRate.toFixed(1)}%` : "-"}
              icon={Percent}
            />
          </div>

          {/* 総合pt推移 */}
          {threePlayerPointsHistory.length > 0 && (
            <Card className="py-4">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-lg">総合pt推移</CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-4">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={threePlayerPointsHistory}>
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="linear" dataKey="points" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* 順位分布 */}
          {threePlayerStats.totalGames > 0 && (
            <Card className="py-4">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-lg">順位分布</CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-4">
                <div className="grid grid-cols-3 gap-3">
                  {threePlayerStats.rankCounts.slice(0, 3).map((count, index) => {
                    const percentage = threePlayerStats.totalGames > 0 ? (count / threePlayerStats.totalGames) * 100 : 0
                    const heightPercentage =
                      threePlayerStats.maxRankCount > 0 ? (count / threePlayerStats.maxRankCount) * 100 : 0
                    return (
                      <div key={index} className="text-center">
                        <div className="w-full h-32 rounded-lg flex items-end justify-center relative overflow-hidden bg-muted">
                          <div
                            className={cn(
                              "absolute bottom-0 w-full transition-all",
                              index === 0 && "bg-accent",
                              index === 1 && "bg-chart-1",
                              index === 2 && "bg-chart-4",
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

          {/* 記録 */}
          {(threePlayerStats.highScore !== null || threePlayerStats.lowScore !== null) && (
            <Card className="py-4">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-lg">記録</CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-accent/20 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">最高得点</p>
                    <p className="text-2xl font-bold text-chart-1">{threePlayerStats.highScore?.toLocaleString()}点</p>
                  </div>
                  <div className="p-4 bg-destructive/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">最低得点</p>
                    <p className="text-2xl font-bold text-destructive">
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

function StatCard({ title, value, icon: Icon }: { title: string; value: string; icon: React.ElementType }) {
  return (
    <Card className="p-3">
      <CardContent className="p-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted">
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
