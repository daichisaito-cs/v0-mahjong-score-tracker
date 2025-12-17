import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Target, Award, Percent } from "lucide-react"
import { cn } from "@/lib/utils"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: userData, error } = await supabase.auth.getUser()
  if (error || !userData?.user) {
    redirect("/auth/login")
  }

  // プロフィール取得
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", userData.user.id).single()

  // 成績データ取得
  const { data: results } = await supabase
    .from("game_results")
    .select("*, games(game_type)")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false })

  const totalGames = results?.length || 0
  const totalPoints = results?.reduce((sum, r) => sum + Number(r.point), 0) || 0
  const avgRank = totalGames > 0 ? (results?.reduce((sum, r) => sum + r.rank, 0) || 0) / totalGames : 0
  const rentaiCount = results?.filter((r) => r.rank <= 2).length || 0
  const rentaiRate = totalGames > 0 ? (rentaiCount / totalGames) * 100 : 0

  const rankCounts = [0, 0, 0, 0]
  results?.forEach((r) => {
    if (r.rank >= 1 && r.rank <= 4) {
      rankCounts[r.rank - 1]++
    }
  })

  const scores = results?.map((r) => r.raw_score) || []
  const highScore = scores.length > 0 ? Math.max(...scores) : null
  const lowScore = scores.length > 0 ? Math.min(...scores) : null

  const fourPlayerResults = results?.filter((r) => r.games?.game_type === "four_player") || []
  const threePlayerResults = results?.filter((r) => r.games?.game_type === "three_player") || []

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{profile?.display_name || "ユーザー"}さん、こんにちは</h1>
        <p className="text-muted-foreground">あなたの麻雀成績をチェックしましょう</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="総対戦数" value={`${totalGames}戦`} icon={Target} color="text-chart-1" />
        <StatCard
          title="総合pt"
          value={totalPoints >= 0 ? `+${totalPoints.toFixed(1)}` : totalPoints.toFixed(1)}
          icon={TrendingUp}
          color={totalPoints >= 0 ? "text-chart-1" : "text-destructive"}
        />
        <StatCard title="平均順位" value={avgRank > 0 ? avgRank.toFixed(2) : "-"} icon={Award} color="text-chart-2" />
        <StatCard
          title="連対率"
          value={totalGames > 0 ? `${rentaiRate.toFixed(1)}%` : "-"}
          icon={Percent}
          color="text-chart-4"
        />
      </div>

      {totalGames > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">順位分布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3">
              {rankCounts.map((count, index) => {
                const percentage = totalGames > 0 ? (count / totalGames) * 100 : 0
                return (
                  <div key={index} className="text-center">
                    <div className="w-full h-24 rounded-lg flex items-end justify-center relative overflow-hidden bg-muted">
                      <div
                        className={cn(
                          "absolute bottom-0 w-full transition-all",
                          index === 0 && "bg-accent",
                          index === 1 && "bg-chart-1",
                          index === 2 && "bg-chart-4",
                          index === 3 && "bg-destructive/60",
                        )}
                        style={{ height: `${percentage}%` }}
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

      {(highScore !== null || lowScore !== null) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">記録</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-accent/20 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">最高得点</p>
                <p className="text-2xl font-bold text-chart-1">{highScore?.toLocaleString()}点</p>
              </div>
              <div className="p-4 bg-destructive/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">最低得点</p>
                <p className="text-2xl font-bold text-destructive">{lowScore?.toLocaleString()}点</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {(fourPlayerResults.length > 0 || threePlayerResults.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ルール別成績</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fourPlayerResults.length > 0 && (
                <div className="p-4 border border-border rounded-lg">
                  <p className="font-semibold mb-2">四人麻雀</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">対戦数</span>
                      <span>{fourPlayerResults.length}戦</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">総合pt</span>
                      <span
                        className={cn(
                          fourPlayerResults.reduce((sum, r) => sum + Number(r.point), 0) >= 0
                            ? "text-chart-1"
                            : "text-destructive",
                        )}
                      >
                        {fourPlayerResults.reduce((sum, r) => sum + Number(r.point), 0) >= 0 ? "+" : ""}
                        {fourPlayerResults.reduce((sum, r) => sum + Number(r.point), 0).toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">平均順位</span>
                      <span>
                        {(fourPlayerResults.reduce((sum, r) => sum + r.rank, 0) / fourPlayerResults.length).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {threePlayerResults.length > 0 && (
                <div className="p-4 border border-border rounded-lg">
                  <p className="font-semibold mb-2">三人麻雀</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">対戦数</span>
                      <span>{threePlayerResults.length}戦</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">総合pt</span>
                      <span
                        className={cn(
                          threePlayerResults.reduce((sum, r) => sum + Number(r.point), 0) >= 0
                            ? "text-chart-1"
                            : "text-destructive",
                        )}
                      >
                        {threePlayerResults.reduce((sum, r) => sum + Number(r.point), 0) >= 0 ? "+" : ""}
                        {threePlayerResults.reduce((sum, r) => sum + Number(r.point), 0).toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">平均順位</span>
                      <span>
                        {(threePlayerResults.reduce((sum, r) => sum + r.rank, 0) / threePlayerResults.length).toFixed(
                          2,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Games */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">最近の対局</CardTitle>
        </CardHeader>
        <CardContent>
          {results && results.length > 0 ? (
            <div className="space-y-3">
              {results.slice(0, 5).map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                        result.rank === 1 && "bg-accent text-accent-foreground",
                        result.rank === 2 && "bg-secondary text-secondary-foreground",
                        result.rank === 3 && "bg-muted text-muted-foreground",
                        result.rank === 4 && "bg-destructive/10 text-destructive",
                      )}
                    >
                      {result.rank}位
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(result.created_at).toLocaleDateString("ja-JP")}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{result.raw_score.toLocaleString()}点</span>
                    <span
                      className={cn("font-semibold", Number(result.point) >= 0 ? "text-chart-1" : "text-destructive")}
                    >
                      {Number(result.point) >= 0 ? "+" : ""}
                      {Number(result.point).toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">まだ対局記録がありません</p>
          )}
        </CardContent>
      </Card>
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
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg bg-muted", color)}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className={cn("text-xl font-bold", color)}>{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
