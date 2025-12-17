"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UserPlus } from "lucide-react"

interface Friend {
  id: string
  display_name: string
  friend_code: string
}

interface LeagueMemberAddProps {
  leagueId: string
  userId: string
  existingMemberIds: string[]
  onMembersAdded?: () => void
}

export function LeagueMemberAdd({ leagueId, userId, existingMemberIds, onMembersAdded }: LeagueMemberAddProps) {
  const [open, setOpen] = useState(false)
  const [friends, setFriends] = useState<Friend[]>([])
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingFriends, setLoadingFriends] = useState(true)

  useEffect(() => {
    if (!open) return

    const fetchFriends = async () => {
      setLoadingFriends(true)
      const supabase = createClient()

      // 承認済みフレンドを取得
      const { data: friendships } = await supabase
        .from("friendships")
        .select("requester_id, addressee_id")
        .eq("status", "accepted")
        .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)

      if (!friendships || friendships.length === 0) {
        setLoadingFriends(false)
        return
      }

      // フレンドのIDを抽出（既にメンバーのフレンドは除外）
      const friendIds = friendships
        .map((f) => (f.requester_id === userId ? f.addressee_id : f.requester_id))
        .filter((id) => !existingMemberIds.includes(id))

      if (friendIds.length === 0) {
        setFriends([])
        setLoadingFriends(false)
        return
      }

      // フレンドのプロフィールを取得
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, display_name, friend_code")
        .in("id", friendIds)

      setFriends(profiles || [])
      setLoadingFriends(false)
    }

    fetchFriends()
  }, [open, userId, existingMemberIds])

  const toggleFriend = (friendId: string) => {
    setSelectedFriends((prev) => (prev.includes(friendId) ? prev.filter((id) => id !== friendId) : [...prev, friendId]))
  }

  const handleAdd = async () => {
    if (selectedFriends.length === 0) return

    setIsLoading(true)
    const supabase = createClient()

    try {
      // メンバーを追加
      const members = selectedFriends.map((friendId) => ({
        league_id: leagueId,
        user_id: friendId,
      }))

      const { error } = await supabase.from("league_members").insert(members)
      if (error) throw error

      // リーグメンバー同士を自動でフレンド追加
      const allMemberIds = [...existingMemberIds, ...selectedFriends]
      const friendPairs: { requester_id: string; addressee_id: string; status: string }[] = []

      for (const newMemberId of selectedFriends) {
        for (const existingId of existingMemberIds) {
          if (newMemberId !== existingId) {
            friendPairs.push({
              requester_id: newMemberId < existingId ? newMemberId : existingId,
              addressee_id: newMemberId < existingId ? existingId : newMemberId,
              status: "accepted",
            })
          }
        }
      }

      if (friendPairs.length > 0) {
        await supabase.from("friendships").upsert(friendPairs, {
          onConflict: "requester_id,addressee_id",
          ignoreDuplicates: true,
        })
      }

      setSelectedFriends([])
      setOpen(false)
      onMembersAdded?.()
      window.location.reload()
    } catch (err) {
      console.error("メンバー追加エラー:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <UserPlus className="h-4 w-4" />
          メンバー追加
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>フレンドをリーグに追加</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {loadingFriends ? (
            <p className="text-muted-foreground text-sm">読み込み中...</p>
          ) : friends.length > 0 ? (
            <>
              <div className="grid gap-2 max-h-64 overflow-y-auto">
                {friends.map((friend) => (
                  <label
                    key={friend.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <Checkbox
                      checked={selectedFriends.includes(friend.id)}
                      onCheckedChange={() => toggleFriend(friend.id)}
                      disabled={isLoading}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{friend.display_name}</p>
                      <p className="text-xs text-muted-foreground">ID: {friend.friend_code}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
                  キャンセル
                </Button>
                <Button onClick={handleAdd} disabled={isLoading || selectedFriends.length === 0}>
                  {isLoading ? "追加中..." : `${selectedFriends.length}人を追加`}
                </Button>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground text-sm py-4 text-center">
              追加できるフレンドがいません。
              <br />
              全員すでにリーグに参加しているか、フレンドがいません。
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
