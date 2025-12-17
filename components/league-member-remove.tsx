"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { UserMinus } from "lucide-react"

interface LeagueMemberRemoveProps {
  leagueId: string
  memberId: string
  memberName: string
  currentUserId: string
  isOwner: boolean
}

export function LeagueMemberRemove({
  leagueId,
  memberId,
  memberName,
  currentUserId,
  isOwner,
}: LeagueMemberRemoveProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // オーナーは削除できない
  if (isOwner) {
    return null
  }

  // 自分自身は削除できない（退出は別機能で実装する場合を想定）
  if (memberId === currentUserId) {
    return null
  }

  const handleRemove = async () => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("league_members").delete().eq("league_id", leagueId).eq("user_id", memberId)

      if (error) throw error

      setOpen(false)
      window.location.reload()
    } catch (err) {
      console.error("メンバー削除エラー:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <UserMinus className="h-3 w-3" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>メンバーを削除</AlertDialogTitle>
          <AlertDialogDescription>
            {memberName}をこのリーグから削除しますか？この操作は取り消せません。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemove} disabled={isLoading}>
            {isLoading ? "削除中..." : "削除"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
