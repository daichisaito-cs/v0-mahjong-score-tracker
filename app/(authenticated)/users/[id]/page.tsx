import { notFound, redirect } from "next/navigation"
import { createClientWithUser } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { UserProfileContent } from "@/components/user-profile-content"

export default async function UserProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ from?: string }>
}) {
  const { id: userId } = await params
  const { from } = await searchParams

  if (!userId) notFound()

  const { supabase, user } = await createClientWithUser()

  if (!user) redirect("/auth/login")

  const fromFriendsTab = from === "friends"
  const backFallback = fromFriendsTab ? "/mypage?tab=friends" : "/mypage"

  const [profileRes, resultsRes, rollupsRes, yakumanRes] = await Promise.all([
    supabase.from("profiles").select("id, display_name, avatar_url").eq("id", userId).single(),
    supabase
      .from("game_results")
      .select("id, rank, raw_score, point, created_at, games(game_type, played_at, created_at)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
    supabase
      .from("user_game_rollups")
      .select(
        "game_type, rolled_game_count, rolled_total_points, rolled_rank1_count, rolled_rank2_count, rolled_rank3_count, rolled_rank4_count, rolled_best_raw_score, rolled_low_raw_score",
      )
      .eq("user_id", userId),
    supabase
      .from("game_results")
      .select("yakuman, games(played_at, game_type)")
      .eq("user_id", userId)
      .not("yakuman", "is", null)
      .order("created_at", { ascending: false }),
  ])

  if (profileRes.error || !profileRes.data) {
    return (
      <div className="space-y-6 pb-20 md:pb-0">
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">ユーザーが見つかりません</CardContent>
        </Card>
      </div>
    )
  }

  const yakumanRecords = ((yakumanRes.data as any[]) || []).flatMap((r: any) =>
    (r.yakuman || []).map((y: string) => ({
      name: y,
      playedAt: r.games?.played_at,
      gameType: r.games?.game_type,
    }))
  )

  return (
    <UserProfileContent
      profile={profileRes.data}
      results={(resultsRes.data as any[]) || []}
      rollups={(rollupsRes.data as any[]) || []}
      yakumanRecords={yakumanRecords}
      backFallback={backFallback}
    />
  )
}
