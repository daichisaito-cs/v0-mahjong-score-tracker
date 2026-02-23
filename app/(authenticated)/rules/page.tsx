import Link from "next/link"
import { redirect } from "next/navigation"
import { createClientWithUser } from "@/lib/supabase/server"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { RuleList } from "@/components/rule-list"

export default async function RulesPage() {
  const { supabase, user } = await createClientWithUser()

  if (!user) redirect("/auth/login")

  const { data, error } = await supabase.from("rules").select("*").order("created_at", { ascending: false })
  if (error) throw error
  const rules = (data as any[]) || []

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ルール</h1>
          <p className="text-muted-foreground mt-1">麻雀のルール設定を管理します</p>
        </div>
        <Link href="/rules/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            新規作成
          </Button>
        </Link>
      </div>

      {rules.length > 0 ? (
        <RuleList rules={rules as any} currentUserId={user.id} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>ルールがありません</CardTitle>
            <CardDescription>新しいルールを作成してください</CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
