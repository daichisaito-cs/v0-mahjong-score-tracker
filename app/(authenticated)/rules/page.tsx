"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { useAuthUser } from "@/lib/hooks/use-auth-user"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { RuleList } from "@/components/rule-list"

export default function RulesPage() {
  const router = useRouter()
  const supabase = createClient()

  const userQuery = useAuthUser()

  const user = userQuery.data

  useEffect(() => {
    if (userQuery.isFetched && !user) router.replace("/auth/login")
  }, [router, user, userQuery.isFetched])

  const rulesQuery = useQuery({
    queryKey: ["rules", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase.from("rules").select("*").order("created_at", { ascending: false })
      if (error) throw error
      return data || []
    },
  })

  if (userQuery.isLoading || (userQuery.isFetched && !user)) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">ルール</h1>
            <p className="text-muted-foreground mt-1">麻雀のルール設定を管理します</p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>読み込み中...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const rules = (rulesQuery.data as any[]) || []

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

      {rulesQuery.isLoading ? (
        <Card>
          <CardHeader>
            <CardTitle>読み込み中...</CardTitle>
          </CardHeader>
        </Card>
      ) : rules.length > 0 ? (
        <RuleList rules={rules as any} currentUserId={user!.id} />
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
