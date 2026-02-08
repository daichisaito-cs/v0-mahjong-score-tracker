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

      const orConditions: string[] = []
      orConditions.push(`created_by.eq.${userId}`)
      if (gameIds.length > 0) orConditions.push(`id.in.(${gameIds.join(",")})`)
      if (leagueIds.length > 0) orConditions.push(`league_id.in.(${leagueIds.join(",")})`)

      if (orConditions.length === 0) return []

      const { data, error } = await supabase
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
        .limit(50)

      if (error) throw error
      return data || []
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
