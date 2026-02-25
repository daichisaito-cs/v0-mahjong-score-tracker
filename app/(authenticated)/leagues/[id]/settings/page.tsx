import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { LeagueSettingsForm } from "@/components/league-settings-form"

function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

export default async function LeagueSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (id === "new") {
    redirect("/leagues/new")
  }

  if (!isValidUUID(id)) {
    notFound()
  }

  const supabase = await createClient()

  const { data: userData, error } = await supabase.auth.getUser()
  if (error || !userData?.user) {
    redirect("/auth/login")
  }

  const [leagueRes, membersRes] = await Promise.all([
    supabase.from("leagues").select("*").eq("id", id).single(),
    supabase
      .from("league_members")
      .select("user_id, profiles(id, display_name, avatar_url)")
      .eq("league_id", id),
  ])

  const league = leagueRes.data

  if (!league) {
    notFound()
  }

  // オーナーのみアクセス可能
  if (league.owner_id !== userData.user.id) {
    redirect(`/leagues/${id}`)
  }

  const members = (membersRes.data || []).map((m: any) => ({
    userId: m.user_id as string,
    displayName: (m.profiles as any)?.display_name || "メンバー",
    avatarUrl: (m.profiles as any)?.avatar_url || null,
  }))

  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">リーグ設定</h1>
        <p className="text-muted-foreground">{league.name}</p>
      </div>

      <LeagueSettingsForm league={league} members={members} />
    </div>
  )
}
