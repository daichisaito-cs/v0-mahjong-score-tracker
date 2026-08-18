import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { GameRecordForm } from "@/components/game-record-form"
import type { CarryoverGame } from "@/lib/session-carryover"

export default async function NewGamePage({
  searchParams,
}: {
  searchParams?: Promise<{ league?: string; session?: string; carry?: string }>
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const leagueParam = resolvedSearchParams?.league
  const sessionParam = resolvedSearchParams?.session
  const carryParam = resolvedSearchParams?.carry
  const carryGameIds = carryParam
    ? Array.from(new Set(carryParam.split(",").map((id) => id.trim()).filter(Boolean))).slice(0, 50)
    : []

  let sessionData = null
  if (sessionParam) {
    try {
      sessionData = JSON.parse(decodeURIComponent(sessionParam))
    } catch (err) {
      console.error("[v0] Failed to parse session data:", err)
    }
  }
  const supabase = await createClient()

  const { data: userData, error } = await supabase.auth.getUser()
  if (error || !userData?.user) {
    redirect("/auth/login")
  }

  // 自分のプロフィール取得
  const { data: myProfile } = await supabase.from("profiles").select("*").eq("id", userData.user.id).single()

  const friends: { id: string; display_name: string; avatar_url?: string | null }[] = []

  try {
    const { data: friendships, error: friendshipsError } = await supabase
      .from("friendships")
      .select("requester_id, addressee_id")
      .eq("status", "accepted")
      .or(`requester_id.eq.${userData.user.id},addressee_id.eq.${userData.user.id}`)

    if (friendshipsError) {
      console.error("[v0] Failed to fetch friendships:", friendshipsError)
    } else if (friendships && friendships.length > 0) {
      const friendIds = friendships.map((fs) => {
        return fs.requester_id === userData.user.id ? fs.addressee_id : fs.requester_id
      })

      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url")
        .in("id", friendIds)

      if (profilesError) {
        console.error("[v0] Failed to fetch friend profiles:", profilesError)
      } else if (profiles) {
        friends.push(...profiles)
      }
    }
  } catch (err) {
    console.error("[v0] Error fetching friends:", err)
  }

  // 自分がオーナーまたはメンバーのリーグを取得
  const { data: ownedLeagues } = await supabase.from("leagues").select("*").eq("owner_id", userData.user.id)

  const { data: memberships } = await supabase
    .from("league_members")
    .select("leagues(*)")
    .eq("user_id", userData.user.id)

  // リーグをマージして重複を除去
  const memberLeagues = memberships?.map((m) => m.leagues).filter(Boolean) || []
  const allLeagues = [...(ownedLeagues || []), ...memberLeagues]
  const uniqueLeagues = allLeagues.filter(
    (league, index, self) => league && index === self.findIndex((l) => l?.id === league?.id),
  )

  // 引き継ぎ用: 自分が参加した直近の対局とその結果
  const fetchGamesWithResults = async (ids: string[], withProfiles: boolean): Promise<CarryoverGame[]> => {
    if (ids.length === 0) return []

    const { data: games, error: gamesError } = await supabase
      .from("games")
      .select("id, played_at, game_type, league_id, applied_rule_id")
      .in("id", ids)
      .order("played_at", { ascending: false })

    if (gamesError || !games || games.length === 0) {
      if (gamesError) console.error("[v0] Failed to fetch carryover games:", gamesError)
      return []
    }

    const { data: rows, error: rowsError } = await supabase
      .from("game_results")
      .select(
        `game_id, seat_index, user_id, player_name, rank, point${withProfiles ? ", profiles (display_name, avatar_url)" : ""}`,
      )
      .in(
        "game_id",
        games.map((game) => game.id),
      )

    if (rowsError) {
      console.error("[v0] Failed to fetch carryover results:", rowsError)
      return []
    }

    const byGame = new Map<string, any[]>()
    for (const row of (rows as any[]) || []) {
      const list = byGame.get(row.game_id) || []
      list.push(row)
      byGame.set(row.game_id, list)
    }

    return games.map((game) => ({ ...game, results: byGame.get(game.id) || [] })) as CarryoverGame[]
  }

  const { data: myResultRows } = await supabase
    .from("game_results")
    .select("game_id, created_at")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false })
    .limit(150)

  const recentGameIds = Array.from(
    new Set(((myResultRows as any[]) || []).map((row) => row.game_id).filter(Boolean)),
  ).slice(0, 30)

  const [recentGames, carriedGamesDesc] = await Promise.all([
    fetchGamesWithResults(recentGameIds, false),
    fetchGamesWithResults(carryGameIds, true),
  ])

  // セッションには古い順に積む
  const carriedGames = carriedGamesDesc
    .slice()
    .sort((a, b) => new Date(a.played_at).getTime() - new Date(b.played_at).getTime())

  const { data: rules } = await supabase
    .from("rules")
    .select("id, name, game_type, starting_points, return_points, uma_first, uma_second, uma_third, uma_fourth")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">対局を記録</h1>
        <p className="text-muted-foreground">対局結果を入力してください</p>
      </div>

        <GameRecordForm
          currentUserId={userData.user.id}
          currentUserName={myProfile?.display_name || "自分"}
          currentUserAvatarUrl={myProfile?.avatar_url || null}
          leagues={(uniqueLeagues as any[]) || []}
          rules={(rules as any[]) || []}
          friends={friends}
          defaultLeagueId={sessionData?.leagueId || leagueParam}
          sessionData={sessionData || undefined}
          recentGames={recentGames}
          carriedGames={carriedGames}
        />
    </div>
  )
}
