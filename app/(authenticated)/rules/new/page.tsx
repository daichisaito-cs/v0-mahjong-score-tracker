import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { RuleCreateForm } from "@/components/rule-create-form"

export default async function NewRulePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">ルールを作成</h1>
      <RuleCreateForm currentUserId={user.id} />
    </div>
  )
}
