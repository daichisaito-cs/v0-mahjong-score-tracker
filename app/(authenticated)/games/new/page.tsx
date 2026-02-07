import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { GameRecordForm } from "@/components/game-record-form"

export default async function NewGamePage({
  searchParams,
}: {
  searchParams?: Promise<{ league?: string; session?: string }>
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const leagueParam = resolvedSearchParams?.league
  const sessionParam = resolvedSearchParams?.session

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
        />
    </div>
  )
}
