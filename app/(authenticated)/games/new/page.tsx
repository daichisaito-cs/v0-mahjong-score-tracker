import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { GameRecordForm } from "@/components/game-record-form"

export default async function NewGamePage() {
  const supabase = await createClient()

  const { data: userData, error } = await supabase.auth.getUser()
  if (error || !userData?.user) {
    redirect("/auth/login")
  }

  // 自分のプロフィール取得
  const { data: myProfile } = await supabase.from("profiles").select("*").eq("id", userData.user.id).single()

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

  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">対局を記録</h1>
        <p className="text-muted-foreground">対局結果を入力してください</p>
      </div>

      <GameRecordForm
        currentUserId={userData.user.id}
        currentUserName={myProfile?.display_name || "自分"}
        leagues={(uniqueLeagues as any[]) || []}
      />
    </div>
  )
}
