import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function GamesPage() {
  const supabase = await createClient()

  const { data: userData, error } = await supabase.auth.getUser()
  if (error || !userData?.user) {
    redirect("/auth/login")
  }

  const { data: myResults } = await supabase.from("game_results").select("game_id").eq("user_id", userData.user.id)

  const gameIds = myResults?.map((r) => r.game_id) || []

  let games: any[] = []
  if (gameIds.length > 0) {
    const { data } = await supabase
      .from("games")
      .select(`
        *,
        game_results (
          id,
          game_id,
          user_id,
          player_name,
          rank,
          raw_score,
          point,
          created_at
        )
      `)
      .in("id", gameIds)
      .order("played_at", { ascending: false })
    games = data || []
  }

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">対局一覧</h1>
          <p className="text-muted-foreground">過去の対局履歴</p>
        </div>
        <Link href="/games/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            新規記録
          </Button>
        </Link>
      </div>

      {games && games.length > 0 ? (
        <div className="space-y-4">
          {games.map((game) => {
            const sortedResults = [...(game.game_results || [])].sort((a, b) => a.rank - b.rank)
            return (
              <Link key={game.id} href={`/games/${game.id}`}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
                          {game.game_type === "four_player" ? "四麻" : "三麻"}
                        </span>
                        {game.league_id && (
                          <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">リーグ戦</span>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(game.played_at).toLocaleDateString("ja-JP")}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {sortedResults.map((result) => (
                        <div key={result.id} className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">{result.rank}位</div>
                          <div className="text-sm font-medium truncate">{result.player_name || "Unknown"}</div>
                          <div className={`text-xs ${Number(result.point) >= 0 ? "text-chart-1" : "text-destructive"}`}>
                            {Number(result.point) >= 0 ? "+" : ""}
                            {Number(result.point).toFixed(1)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">まだ対局記録がありません</p>
            <Link href="/games/new">
              <Button>最初の対局を記録する</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
