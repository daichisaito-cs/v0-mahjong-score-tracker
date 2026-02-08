"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { useAuthUser } from "@/lib/hooks/use-auth-user"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users } from "lucide-react"

export default function LeaguesPage() {
  const router = useRouter()
  const supabase = createClient()

  const userQuery = useAuthUser()

  const user = userQuery.data

  useEffect(() => {
    if (userQuery.isFetched && !user) router.replace("/auth/login")
  }, [router, user, userQuery.isFetched])

  const leaguesQuery = useQuery({
    queryKey: ["leagues", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const userId = user!.id
      const { data: memberships, error: membershipError } = await supabase
        .from("league_members")
        .select("league_id")
        .eq("user_id", userId)
      if (membershipError) throw membershipError

      const leagueIds = (memberships || []).map((m: any) => m.league_id).filter(Boolean)
      const query = supabase
        .from("leagues")
        .select(
          `
          *,
          league_members (count)
        `,
        )
        .order("created_at", { ascending: false })

      if (leagueIds.length > 0) {
        const { data, error } = await query.or(`owner_id.eq.${userId},id.in.(${leagueIds.join(",")})`)
        if (error) throw error
        return data || []
      }

      const { data, error } = await query.eq("owner_id", userId)
      if (error) throw error
      return data || []
    },
  })

  if (userQuery.isLoading || (userQuery.isFetched && !user)) {
    return (
      <div className="space-y-6 pb-20 md:pb-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">リーグ</h1>
            <p className="text-muted-foreground">参加中のリーグ一覧</p>
          </div>
        </div>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">読み込み中...</CardContent>
        </Card>
      </div>
    )
  }

  const leagues = (leaguesQuery.data as any[]) || []

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">リーグ</h1>
          <p className="text-muted-foreground">参加中のリーグ一覧</p>
        </div>
        <Link href="/leagues/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            新規作成
          </Button>
        </Link>
      </div>

      {leaguesQuery.isLoading ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">読み込み中...</CardContent>
        </Card>
      ) : leagues.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {leagues.map((league) => (
            <Link key={league.id} href={`/leagues/${league.id}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{league.name}</CardTitle>
                    <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
                      {league.game_type === "four_player" ? "四麻" : "三麻"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  {league.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{league.description}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{league.league_members?.[0]?.count || 1}人</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">まだリーグに参加していません</p>
            <Link href="/leagues/new">
              <Button>リーグを作成する</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
