import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { RuleEditForm } from "@/components/rule-edit-form"

function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

export default async function EditRulePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (!isValidUUID(id)) {
    redirect("/rules")
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: rule, error } = await supabase
    .from("rules")
    .select("id, name, game_type, starting_points, return_points, uma_first, uma_second, uma_third, uma_fourth, created_by")
    .eq("id", id)
    .single()

  if (error || !rule || rule.created_by !== user.id) {
    redirect("/rules")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">ルールを編集</h1>
      <RuleEditForm
        rule={{
          id: rule.id,
          name: rule.name,
          game_type: rule.game_type,
          starting_points: rule.starting_points,
          return_points: rule.return_points,
          uma_first: rule.uma_first,
          uma_second: rule.uma_second,
          uma_third: rule.uma_third,
          uma_fourth: rule.uma_fourth,
        }}
      />
    </div>
  )
}
