import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users } from "lucide-react"

export default async function LeaguesPage() {
  console.log("[v0] LeaguesPage: Start rendering")

  const supabase = await createClient()

  const { data: userData, error } = await supabase.auth.getUser()
  console.log("[v0] LeaguesPage: Auth check", { userId: userData?.user?.id, error: error?.message })

  if (error || !userData?.user) {
    console.log("[v0] LeaguesPage: No user, redirecting to login")
    redirect("/auth/login")
  }

  // 自分が参加しているリーグを取得
  console.log("[v0] LeaguesPage: Fetching memberships")
  const { data: memberships, error: membershipError } = await supabase
    .from("league_members")
    .select("league_id")
    .eq("user_id", userData.user.id)

  console.log("[v0] LeaguesPage: Memberships result", { count: memberships?.length, error: membershipError?.message })

  const leagueIds = memberships?.map((m) => m.league_id) || []

  let leagues: any[] = []

  if (leagueIds.length > 0) {
    // 参加しているリーグがある場合
    console.log("[v0] LeaguesPage: Fetching leagues with OR condition")
    const { data, error: leaguesError } = await supabase
      .from("leagues")
      .select(`
        *,
        league_members (count)
      `)
      .or(`owner_id.eq.${userData.user.id},id.in.(${leagueIds.join(",")})`)
      .order("created_at", { ascending: false })
    console.log("[v0] LeaguesPage: Leagues result", { count: data?.length, error: leaguesError?.message })
    leagues = data || []
  } else {
    // 参加しているリーグがない場合は自分がオーナーのリーグのみ
    console.log("[v0] LeaguesPage: Fetching owner leagues only")
    const { data, error: leaguesError } = await supabase
      .from("leagues")
      .select(`
        *,
        league_members (count)
      `)
      .eq("owner_id", userData.user.id)
      .order("created_at", { ascending: false })
    console.log("[v0] LeaguesPage: Owner leagues result", { count: data?.length, error: leaguesError?.message })
    leagues = data || []
  }

  console.log("[v0] LeaguesPage: Rendering with", leagues.length, "leagues")

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

      {leagues && leagues.length > 0 ? (
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
