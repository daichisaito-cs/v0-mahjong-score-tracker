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
  const { data: memberLeagues } = await supabase
    .from("league_members")
    .select("league_id")
    .eq("user_id", userData.user.id)
  const { data: ownedLeagues } = await supabase.from("leagues").select("id").eq("owner_id", userData.user.id)

  const gameIds = myResults?.map((r) => r.game_id) || []
  const leagueIds = Array.from(
    new Set([...(memberLeagues?.map((m) => m.league_id) || []), ...(ownedLeagues?.map((l) => l.id) || [])]),
  )

  let games: any[] = []
  const orConditions: string[] = []
  orConditions.push(`created_by.eq.${userData.user.id}`)
  if (gameIds.length > 0) {
    orConditions.push(`id.in.(${gameIds.join(",")})`)
  }
  if (leagueIds.length > 0) {
    orConditions.push(`league_id.in.(${leagueIds.join(",")})`)
  }

  if (orConditions.length > 0) {
    const { data } = await supabase
      .from("games")
      .select(`
        *,
        creator:profiles!games_created_by_fkey (
          display_name,
          avatar_url
        ),
        game_results (
          id,
          game_id,
          user_id,
          player_name,
          rank,
          raw_score,
          point,
          bonus_points,
          created_at,
          profiles (display_name, avatar_url)
        )
      `)
      .or(orConditions.join(","))
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
