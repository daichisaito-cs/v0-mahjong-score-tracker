"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { useAuthUser } from "@/lib/hooks/use-auth-user"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { GamesList } from "@/components/games-list"
import { Card, CardContent } from "@/components/ui/card"

export default function GamesPage() {
  const router = useRouter()
  const supabase = createClient()

  const userQuery = useAuthUser()

  const user = userQuery.data

  useEffect(() => {
    if (userQuery.isFetched && !user) router.replace("/auth/login")
  }, [router, user, userQuery.isFetched])

  const gamesQuery = useQuery({
    queryKey: ["games", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const userId = user!.id
      const gameSelect = `
          *,
          creator:profiles!games_created_by_fkey (
            display_name,
            avatar_url
          ),
          game_results (
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
            profiles (display_name, avatar_url)
          )
        `
      const chunk = <T,>(items: T[], size: number) =>
        items.reduce<T[][]>((acc, item, idx) => {
          const i = Math.floor(idx / size)
          if (!acc[i]) acc[i] = []
          acc[i].push(item)
          return acc
        }, [])

      const [myResultsRes, memberLeaguesRes, ownedLeaguesRes] = await Promise.all([
        supabase.from("game_results").select("game_id").eq("user_id", userId),
        supabase.from("league_members").select("league_id").eq("user_id", userId),
        supabase.from("leagues").select("id").eq("owner_id", userId),
      ])

      if (myResultsRes.error) throw myResultsRes.error
      if (memberLeaguesRes.error) throw memberLeaguesRes.error
      if (ownedLeaguesRes.error) throw ownedLeaguesRes.error

      const gameIds = (myResultsRes.data || []).map((r: any) => r.game_id).filter(Boolean)
      const leagueIds = Array.from(
        new Set([...(memberLeaguesRes.data || []).map((m: any) => m.league_id), ...(ownedLeaguesRes.data || []).map((l: any) => l.id)]),
      ).filter(Boolean)
      const uniqueGameIds = Array.from(new Set(gameIds))
      const uniqueLeagueIds = Array.from(new Set(leagueIds))

      const createdGamesPromise = supabase
        .from("games")
        .select(gameSelect)
        .eq("created_by", userId)
        .order("played_at", { ascending: false })
        .limit(50)

      const participantGamePromises = chunk(uniqueGameIds, 20).map((ids) =>
        supabase.from("games").select(gameSelect).in("id", ids).order("played_at", { ascending: false }).limit(50),
      )

      const leagueGamePromises = chunk(uniqueLeagueIds, 20).map((ids) =>
        supabase
          .from("games")
          .select(gameSelect)
          .in("league_id", ids)
          .order("played_at", { ascending: false })
          .limit(50),
      )

      const [createdGamesRes, ...rest] = await Promise.all([createdGamesPromise, ...participantGamePromises, ...leagueGamePromises])
      if (createdGamesRes.error) throw createdGamesRes.error

      for (const res of rest) {
        if (res.error) throw res.error
      }

      const allGames = [
        ...((createdGamesRes.data as any[]) || []),
        ...rest.flatMap((res) => (res.data as any[]) || []),
      ]

      const deduped = new Map<string, any>()
      for (const game of allGames) {
        if (!deduped.has(game.id)) {
          deduped.set(game.id, game)
        }
      }

      return Array.from(deduped.values())
        .sort((a, b) => new Date(b.played_at).getTime() - new Date(a.played_at).getTime())
        .slice(0, 50)
    },
  })

  if (userQuery.isLoading || (userQuery.isFetched && !user)) {
    return (
      <div className="space-y-6 pb-20 md:pb-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">対局一覧</h1>
            <p className="text-muted-foreground">過去の対局履歴</p>
          </div>
        </div>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">読み込み中...</CardContent>
        </Card>
      </div>
    )
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

      {gamesQuery.isLoading ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">読み込み中...</CardContent>
        </Card>
      ) : (
        <GamesList games={(gamesQuery.data as any[]) || []} />
      )}
    </div>
  )
}
