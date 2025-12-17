import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Trophy, Settings, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { LeagueCreateForm } from "@/components/league-create-form"
import { LeagueMemberAdd } from "@/components/league-member-add"
import { LeagueMemberRemove } from "@/components/league-member-remove"

function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

export default async function LeagueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: userData, error } = await supabase.auth.getUser()

  if (error || !userData?.user) {
    redirect("/auth/login")
  }

  if (id === "new") {
    return (
      <div className="space-y-6 pb-20 md:pb-0 max-w-xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-foreground">リーグを作成</h1>
          <p className="text-muted-foreground">新しいリーグの設定を入力してください</p>
        </div>
        <LeagueCreateForm userId={userData.user.id} />
      </div>
    )
  }

  if (!isValidUUID(id)) {
    notFound()
  }

  // リーグデータ取得
  const { data: league } = await supabase.from("leagues").select("*").eq("id", id).single()

  if (!league) {
    notFound()
  }

  const { data: members } = await supabase
    .from("league_members")
    .select("user_id, profiles(id, display_name, friend_code)")
    .eq("league_id", id)

  const memberIds = members?.map((m) => m.user_id) || []

  // リーグの対局を取得
  const { data: games } = await supabase
    .from("games")
    .select(`
      *,
      game_results (
        *,
        profiles (display_name)
      )
    `)
    .eq("league_id", id)
    .order("played_at", { ascending: false })

  // ランキング集計
  const playerStats: Record<
    string,
    {
      odIndex: string
      name: string
      totalPoints: number
      gameCount: number
      ranks: number[]
    }
  > = {}

  games?.forEach((game) => {
    game.game_results?.forEach((result) => {
      const odIndex = result.user_id || result.player_name || "unknown"
      const name = result.player_name || result.profiles?.display_name || "Unknown"

      if (!playerStats[odIndex]) {
        playerStats[odIndex] = {
          odIndex,
          name,
          totalPoints: 0,
          gameCount: 0,
          ranks: [],
        }
      }

      playerStats[odIndex].totalPoints += Number(result.point)
      playerStats[odIndex].gameCount += 1
      playerStats[odIndex].ranks.push(result.rank)
    })
  })

  const ranking = Object.values(playerStats).sort((a, b) => b.totalPoints - a.totalPoints)

  const isOwner = league.owner_id === userData.user.id
  const isMember = memberIds.includes(userData.user.id)

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/leagues">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">{league.name}</h1>
              <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
                {league.game_type === "four_player" ? "四麻" : "三麻"}
              </span>
            </div>
            {league.description && <p className="text-muted-foreground text-sm mt-1">{league.description}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isOwner && (
            <Link href={`/leagues/${id}/settings`}>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
          )}
          <Link href={`/games/new?league=${id}`}>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              対局を記録
            </Button>
          </Link>
        </div>
      </div>

      {/* ルール情報 */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">ウマ: </span>
              <span className="font-medium">
                {league.uma_first} / {league.uma_second} / {league.uma_third}
                {league.game_type === "four_player" && ` / ${league.uma_fourth}`}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">持ち点: </span>
              <span className="font-medium">{league.starting_points.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-muted-foreground">返し: </span>
              <span className="font-medium">{league.return_points?.toLocaleString() || "30,000"}</span>
            </div>
            <div>
              <span className="text-muted-foreground">対局数: </span>
              <span className="font-medium">{games?.length || 0}戦</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              メンバー ({members?.length || 0}人)
            </CardTitle>
            {isOwner && <LeagueMemberAdd leagueId={id} userId={userData.user.id} existingMemberIds={memberIds} />}
          </div>
        </CardHeader>
        <CardContent>
          {members && members.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {members.map((member) => (
                <div
                  key={member.user_id}
                  className="group px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm flex items-center gap-2"
                >
                  <span>
                    {(member.profiles as any)?.display_name || "Unknown"}
                    {member.user_id === league.owner_id && (
                      <span className="ml-1 text-xs text-muted-foreground">(オーナー)</span>
                    )}
                  </span>
                  {isOwner && (
                    <LeagueMemberRemove
                      leagueId={id}
                      memberId={member.user_id}
                      memberName={(member.profiles as any)?.display_name || "Unknown"}
                      currentUserId={userData.user.id}
                      isOwner={member.user_id === league.owner_id}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">メンバーがいません</p>
          )}
        </CardContent>
      </Card>

      {/* ランキング */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-accent" />
            ランキング
          </CardTitle>
        </CardHeader>
        <CardContent>
          {ranking.length > 0 ? (
            <div className="space-y-3">
              {ranking.map((player, index) => {
                const avgRank = player.ranks.reduce((a, b) => a + b, 0) / player.ranks.length
                return (
                  <div
                    key={player.odIndex}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg",
                      index === 0 && "bg-accent/20",
                      index === 1 && "bg-secondary/50",
                      index === 2 && "bg-muted/50",
                      index > 2 && "border border-border",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                          index === 0 && "bg-accent text-accent-foreground",
                          index === 1 && "bg-secondary text-secondary-foreground",
                          index === 2 && "bg-muted text-muted-foreground",
                          index > 2 && "bg-background text-foreground border border-border",
                        )}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {player.gameCount}戦 / 平均{avgRank.toFixed(2)}位
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

      {/* 対局履歴 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">対局履歴</CardTitle>
        </CardHeader>
        <CardContent>
          {games && games.length > 0 ? (
            <div className="space-y-3">
              {games.map((game) => {
                const sortedResults = [...(game.game_results || [])].sort((a, b) => a.rank - b.rank)
                return (
                  <Link key={game.id} href={`/games/${game.id}`}>
                    <div className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          {new Date(game.played_at).toLocaleDateString("ja-JP")}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {sortedResults.map((result) => (
                          <div key={result.id} className="text-center">
                            <div className="text-xs text-muted-foreground">{result.rank}位</div>
                            <div className="text-sm font-medium truncate">
                              {result.player_name || result.profiles?.display_name || "Unknown"}
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
              <Link href={`/games/new?league=${id}`}>
                <Button>最初の対局を記録</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
