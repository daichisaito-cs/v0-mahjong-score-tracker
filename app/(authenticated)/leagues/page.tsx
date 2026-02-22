import Link from "next/link"
import { redirect } from "next/navigation"
import { createClientWithUser } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, Plus, Users } from "lucide-react"

export default async function LeaguesPage() {
  const { supabase, user } = await createClientWithUser()

  if (!user) redirect("/auth/login")

  const userId = user.id

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
      id,
      name,
      description,
      game_type,
      owner_id,
      created_at,
      league_members (count),
      rules (name)
    `,
    )
    .order("created_at", { ascending: false })

  const leaguesRes =
    leagueIds.length > 0
      ? await query.or(`owner_id.eq.${userId},id.in.(${leagueIds.join(",")})`)
      : await query.eq("owner_id", userId)
  if (leaguesRes.error) throw leaguesRes.error
  const leaguesRaw = (leaguesRes.data as any[]) || []

  let leagues: any[] = leaguesRaw

  if (leaguesRaw.length > 0) {
    const leagueIdsForGames = leaguesRaw.map((league) => league.id)
    const { data: gamesData, error: gamesError } = await supabase
      .from("games")
      .select("league_id, played_at")
      .in("league_id", leagueIdsForGames)

    if (!gamesError) {
      const statsMap = new Map<string, { count: number; start: string | null; end: string | null }>()
      ;(gamesData || []).forEach((game: any) => {
        if (!game.league_id) return
        const current = statsMap.get(game.league_id) || { count: 0, start: null, end: null }
        current.count += 1
        const playedAt = game.played_at as string | null
        if (playedAt) {
          if (!current.start || playedAt < current.start) current.start = playedAt
          if (!current.end || playedAt > current.end) current.end = playedAt
        }
        statsMap.set(game.league_id, current)
      })

      leagues = leaguesRaw.map((league) => {
        const stats = statsMap.get(league.id) || { count: 0, start: null, end: null }
        return { ...league, matchCount: stats.count, periodStart: stats.start, periodEnd: stats.end }
      })
    }
  }

  const formatDate = (value?: string | null) => (value ? new Date(value).toLocaleDateString("ja-JP") : "")
  const formatPeriod = (start?: string | null, end?: string | null) => {
    if (!start && !end) return "期間未設定"
    if (start && end) return `${formatDate(start)}〜${formatDate(end)}`
    if (start) return `${formatDate(start)}〜`
    return `〜${formatDate(end)}`
  }

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

      {leagues.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {leagues.map((league) => (
            <Link key={league.id} href={`/leagues/${league.id}`}>
              <Card className="hover:bg-muted/40 transition-colors cursor-pointer h-full py-4 gap-0 border-border/70">
                <CardHeader className="pt-1 pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <CardTitle className="text-2xl tracking-tight">{league.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-emerald-600">{league.matchCount ?? 0}</span>
                      <span className="text-xs">戦</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatPeriod(league.periodStart, league.periodEnd)}</span>
                    </div>
                    {league.rules?.name ? (
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>{league.rules.name}</span>
                      </div>
                    ) : league.description ? (
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span className="line-clamp-1">{league.description}</span>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                      {league.game_type === "four_player" ? "四人麻雀" : "三人麻雀"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                      <Users className="h-4 w-4" />
                      {league.league_members?.[0]?.count || 1}人
                    </span>
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
