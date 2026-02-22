import { redirect } from "next/navigation"
import { createClientWithUser } from "@/lib/supabase/server"
import { DashboardContent } from "@/components/dashboard-content"

export default async function DashboardPage() {
  const { supabase, user } = await createClientWithUser()

  if (!user) redirect("/auth/login")

  const userId = user.id

  const [profileRes, resultsRes, rollupsRes] = await Promise.all([
    supabase.from("profiles").select("id, display_name").eq("id", userId).single(),
    supabase
      .from("game_results")
      .select("id, rank, raw_score, point, created_at, games(game_type, played_at, created_at)")
      .eq("user_id", userId)
      .order("created_at", { ascending: true }),
    supabase
      .from("user_game_rollups")
      .select(
        "game_type, rolled_game_count, rolled_total_points, rolled_rank1_count, rolled_rank2_count, rolled_rank3_count, rolled_rank4_count, rolled_best_raw_score, rolled_low_raw_score",
      )
      .eq("user_id", userId),
  ])

  if (profileRes.error) throw profileRes.error
  if (resultsRes.error) throw resultsRes.error

  return (
    <DashboardContent
      displayName={profileRes.data?.display_name ?? null}
      results={(resultsRes.data as any[]) || []}
      rollups={(rollupsRes.data as any[]) || []}
    />
  )
}
