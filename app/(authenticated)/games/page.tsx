import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { GamesList } from "@/components/games-list"

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

      <GamesList games={games} />
    </div>
  )
}
