import Link from "next/link"
import { redirect } from "next/navigation"
import { createClientWithUser } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { GamesList } from "@/components/games-list"

export default async function GamesPage() {
  const { supabase, user } = await createClientWithUser()

  if (!user) redirect("/auth/login")

  const userId = user.id
  const gameSelect = `
    *,
    creator:profiles!games_created_by_fkey (
      display_name
    )
  `
  const chunk = <T,>(items: T[], size: number) =>
    items.reduce<T[][]>((acc, item, idx) => {
      const i = Math.floor(idx / size)
      if (!acc[i]) acc[i] = []
      acc[i].push(item)
      return acc
    }, [])

  const [myResultsRes, createdGamesRes] = await Promise.all([
    supabase.from("game_results").select("game_id").eq("user_id", userId),
    supabase
      .from("games")
      .select(gameSelect)
      .eq("created_by", userId)
      .order("played_at", { ascending: false })
      .limit(30),
  ])

  if (myResultsRes.error) throw myResultsRes.error
  if (createdGamesRes.error) throw createdGamesRes.error

  const gameIds = (myResultsRes.data || []).map((r: any) => r.game_id).filter(Boolean)
  const uniqueGameIds = Array.from(new Set(gameIds))

  const participantGamePromises = chunk(uniqueGameIds, 20).map((ids) =>
    supabase.from("games").select(gameSelect).in("id", ids).order("played_at", { ascending: false }).limit(30),
  )

  const participantResults = await Promise.all(participantGamePromises)
  for (const res of participantResults) {
    if (res.error) throw res.error
  }

  const allGames = [
    ...((createdGamesRes.data as any[]) || []),
    ...participantResults.flatMap((res) => (res.data as any[]) || []),
  ]

  const deduped = new Map<string, any>()
  for (const game of allGames) {
    if (!deduped.has(game.id)) {
      deduped.set(game.id, game)
    }
  }

  const sortedGames = Array.from(deduped.values())
    .sort((a, b) => new Date(b.played_at).getTime() - new Date(a.played_at).getTime())
    .slice(0, 30)

  let gamesWithResults: any[] = []

  if (sortedGames.length > 0) {
    const sortedGameIds = sortedGames.map((g) => g.id)
    const gameResultsChunks = chunk(sortedGameIds, 50)
    const gameResultsResponses = await Promise.all(
      gameResultsChunks.map((ids) =>
        supabase
          .from("game_results")
          .select(
            `
            id,
            game_id,
            seat_index,
            user_id,
            player_name,
            rank,
            raw_score,
            point,
            bonus_points,
            created_at,
            profiles (display_name)
          `,
          )
          .in("game_id", ids),
      ),
    )

    for (const res of gameResultsResponses) {
      if (res.error) throw res.error
    }

    const gameResults = gameResultsResponses.flatMap((res) => (res.data as any[]) || [])
    const resultMap = new Map<string, any[]>()
    for (const row of gameResults) {
      const list = resultMap.get(row.game_id) || []
      list.push(row)
      resultMap.set(row.game_id, list)
    }

    gamesWithResults = sortedGames.map((game) => ({
      ...game,
      game_results: resultMap.get(game.id) || [],
    }))
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

      <GamesList games={gamesWithResults} />
    </div>
  )
}
