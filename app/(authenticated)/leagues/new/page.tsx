import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { LeagueCreateForm } from "@/components/league-create-form"

export default async function NewLeaguePage() {
  console.log("[v0] NewLeaguePage: Start rendering")
  const supabase = await createClient()

  const { data: userData, error } = await supabase.auth.getUser()
  console.log("[v0] NewLeaguePage: Auth check", { userId: userData?.user?.id, error: error?.message })

  if (error || !userData?.user) {
    console.log("[v0] NewLeaguePage: Redirecting to login")
    redirect("/auth/login")
  }

  console.log("[v0] NewLeaguePage: Rendering form for user", userData.user.id)
  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">リーグを作成</h1>
        <p className="text-muted-foreground">新しいリーグの設定を入力してください</p>
      </div>

      <LeagueCreateForm userId={userData.user.id} />
    </div>
  )
}
