"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Rule {
  id: string
  name: string
  game_type: string
  starting_points: number
  return_points: number
  uma_first: number
  uma_second: number
  uma_third: number
  uma_fourth: number | null
  created_by: string
}

export function RuleList({ rules, currentUserId }: { rules: Rule[]; currentUserId: string }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (ruleId: string) => {
    if (!confirm("このルールを削除しますか？")) return

    setDeleting(ruleId)
    const supabase = createClient()
    const { error } = await supabase.from("rules").delete().eq("id", ruleId)

    if (error) {
      console.error("Error deleting rule:", error)
      alert("削除に失敗しました")
      setDeleting(null)
      return
    }

    router.push("/rules")
    router.refresh()
  }

  const getGameTypeLabel = (type: string) => {
    return type === "four_player" ? "四麻" : "三麻"
  }

  return (
    <div className="grid gap-4">
      {rules.map((rule) => (
        <Card key={rule.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{rule.name}</CardTitle>
                <CardDescription className="mt-1">{getGameTypeLabel(rule.game_type)}</CardDescription>
              </div>
              {rule.created_by === currentUserId && (
                <div className="flex gap-2">
                  <Link href={`/rules/${rule.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(rule.id)}
                    disabled={deleting === rule.id}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">持ち点</div>
                <div className="font-medium">{rule.starting_points.toLocaleString()}点</div>
              </div>
              <div>
                <div className="text-muted-foreground">返し</div>
                <div className="font-medium">{rule.return_points.toLocaleString()}点</div>
              </div>
              <div>
                <div className="text-muted-foreground">ウマ</div>
                <div className="font-medium">
                  {rule.game_type === "four_player"
                    ? `${rule.uma_first} / ${rule.uma_second} / ${rule.uma_third} / ${rule.uma_fourth ?? "-"}`
                    : `${rule.uma_first} / ${rule.uma_second} / ${rule.uma_third}`}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">オカ</div>
                <div className="font-medium">
                  {((rule.return_points - rule.starting_points) * (rule.game_type === "four_player" ? 4 : 3)) / 1000}
                  pt
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
