import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { GameEditForm } from "@/components/game-edit-form"

function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

export default async function GameEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (id === "new") {
    redirect("/games/new")
  }

  if (!isValidUUID(id)) {
    notFound()
  }

  const supabase = await createClient()

  const { data: userData, error } = await supabase.auth.getUser()
  if (error || !userData?.user) {
    redirect("/auth/login")
  }

  const userId = userData.user.id

  // 対局データ取得
  const { data: game } = await supabase
    .from("games")
    .select(`
      *,
      game_results (
        *,
        profiles (display_name)
      )
    `)
    .eq("id", id)
    .single()

  if (!game) {
    notFound()
  }

  // オーナーのみ編集可能
  if (game.created_by !== userId) {
    redirect(`/games/${id}`)
  }

  const [profileRes, friendshipsRes, ownedLeaguesRes, membershipsRes, rulesRes] = await Promise.all([
    supabase.from("profiles").select("id, display_name, avatar_url").eq("id", userId).single(),
    supabase
      .from("friendships")
      .select("requester_id, addressee_id")
      .eq("status", "accepted")
      .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`),
    supabase.from("leagues").select("*").eq("owner_id", userId),
    supabase.from("league_members").select("leagues(*)").eq("user_id", userId),
    supabase
      .from("rules")
      .select("id, name, game_type, starting_points, return_points, uma_first, uma_second, uma_third, uma_fourth")
      .order("created_at", { ascending: false }),
  ])

  const friendIds = (friendshipsRes.data || []).map((fs: any) =>
    fs.requester_id === userId ? fs.addressee_id : fs.requester_id,
  )

  // 対局に出ている（フレンド以外の）参加者も選択肢に出せるよう合わせて取得する
  const participantIds = ((game.game_results as any[]) || [])
    .map((r: any) => r.user_id)
    .filter((uid: string | null): uid is string => Boolean(uid) && uid !== userId)

  const selectableIds = Array.from(new Set([...friendIds, ...participantIds]))

  const { data: friendProfiles } = selectableIds.length
    ? await supabase.from("profiles").select("id, display_name, avatar_url").in("id", selectableIds)
    : { data: [] as any[] }

  const memberLeagues = (membershipsRes.data || []).map((m: any) => m.leagues).filter(Boolean)
  const allLeagues = [...((ownedLeaguesRes.data as any[]) || []), ...memberLeagues]
  const uniqueLeagues = allLeagues.filter(
    (league: any, index: number, self: any[]) => league && index === self.findIndex((l: any) => l?.id === league?.id),
  )

  const sortedResults = [...((game.game_results as any[]) || [])].sort((a: any, b: any) => {
    const seatA = Number(a.seat_index ?? 999)
    const seatB = Number(b.seat_index ?? 999)
    if (seatA !== seatB) return seatA - seatB
    return a.rank - b.rank
  })

  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">対局を編集</h1>
        <p className="text-muted-foreground">
          {new Date(game.played_at).toLocaleDateString("ja-JP")}の対局
        </p>
      </div>

      <GameEditForm
        gameId={game.id}
        gameType={game.game_type === "three_player" ? "three_player" : "four_player"}
        playedAt={game.played_at}
        leagueId={game.league_id}
        ruleId={game.applied_rule_id ?? game.rule_id ?? null}
        leagues={uniqueLeagues as any[]}
        rules={(rulesRes.data as any[]) || []}
        friends={(friendProfiles as any[]) || []}
        currentUserId={userId}
        currentUserName={profileRes.data?.display_name || "自分"}
        currentUserAvatarUrl={profileRes.data?.avatar_url || null}
        existingRows={sortedResults.map((r: any, index: number) => ({
          id: r.id,
          seatIndex: Number(r.seat_index ?? index + 1),
          userId: r.user_id,
          name: r.player_name || r.profiles?.display_name || "",
          rawScore: Number(r.raw_score),
          bonusPoints: Number(r.bonus_points || 0),
          yakuman: Array.isArray(r.yakuman) ? r.yakuman : [],
        }))}
      />
    </div>
  )
}
