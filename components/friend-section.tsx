"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Search, UserPlus, Check, X, Copy, Clock, TrendingUp, Mail } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

type Friend = {
  id: string
  display_name: string
  friend_code: string
  avatar_url?: string | null
}

type PendingRequest = {
  id: string
  requester_id: string
  requester: {
    id: string
    display_name: string
    friend_code: string
    avatar_url?: string | null
  }
}

type SentRequest = {
  id: string
  addressee_id: string
  addressee: {
    id: string
    display_name: string
    friend_code: string
    avatar_url?: string | null
  }
}

type Props = {
  currentUserId: string
  friendCode: string
  friends: Friend[]
  pendingRequests: PendingRequest[]
  sentRequests: SentRequest[]
}

export function FriendSection({ currentUserId, friendCode, friends, pendingRequests, sentRequests }: Props) {
  const [searchCode, setSearchCode] = useState("")
  const [searchResult, setSearchResult] = useState<{
    id: string
    display_name: string
    friend_code: string
    avatar_url?: string | null
  } | null>(null)
  const [searchError, setSearchError] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [copied, setCopied] = useState(false)
  const [localPendingRequests, setLocalPendingRequests] = useState(pendingRequests)
  const [localSentRequests, setLocalSentRequests] = useState(sentRequests)
  const [localFriends, setLocalFriends] = useState(friends)

  const [inviteEmail, setInviteEmail] = useState("")
  const [isInviting, setIsInviting] = useState(false)
  const [inviteMessage, setInviteMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [friendToRemove, setFriendToRemove] = useState<Friend | null>(null)
  const [isRemovingFriend, setIsRemovingFriend] = useState(false)

  const supabase = createClient()
  const notifyPendingUpdate = () => {
    window.dispatchEvent(new Event("friend-requests-updated"))
  }

  const copyFriendCode = async () => {
    await navigator.clipboard.writeText(friendCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSearch = async () => {
    if (!searchCode.trim()) return

    setIsSearching(true)
    setSearchError("")
    setSearchResult(null)

    const { data, error } = await supabase
      .from("profiles")
      .select("id, display_name, friend_code, avatar_url")
      .eq("friend_code", searchCode.toUpperCase().trim())
      .single()

    if (error || !data) {
      setSearchError("ユーザーが見つかりません")
    } else if (data.id === currentUserId) {
      setSearchError("自分自身を追加することはできません")
    } else if (localFriends.some((f) => f.id === data.id)) {
      setSearchError("すでにフレンドです")
    } else if (localSentRequests.some((r) => r.addressee_id === data.id)) {
      setSearchError("すでに申請を送信済みです")
    } else if (localPendingRequests.some((r) => r.requester_id === data.id)) {
      setSearchError("この相手から申請が届いています")
    } else {
      setSearchResult(data)
    }

    setIsSearching(false)
  }

  const sendRequest = async () => {
    if (!searchResult) return

    setIsSending(true)

    const { data, error } = await supabase
      .from("friendships")
      .insert({
        requester_id: currentUserId,
        addressee_id: searchResult.id,
        status: "pending",
      })
      .select()
      .single()

    if (!error && data) {
      setLocalSentRequests([
        ...localSentRequests,
        {
          id: data.id,
          addressee_id: searchResult.id,
          addressee: searchResult,
        },
      ])
      setSearchResult(null)
      setSearchCode("")
    }

    setIsSending(false)
  }

  const acceptRequest = async (requestId: string, requesterId: string, requester: PendingRequest["requester"]) => {
    const { error } = await supabase
      .from("friendships")
      .update({ status: "accepted", updated_at: new Date().toISOString() })
      .eq("id", requestId)

    if (!error) {
      setLocalPendingRequests(localPendingRequests.filter((r) => r.id !== requestId))
      setLocalFriends([...localFriends, requester])
      notifyPendingUpdate()
    }
  }

  const rejectRequest = async (requestId: string) => {
    const { error } = await supabase.from("friendships").delete().eq("id", requestId)

    if (!error) {
      setLocalPendingRequests(localPendingRequests.filter((r) => r.id !== requestId))
      notifyPendingUpdate()
    }
  }

  const cancelRequest = async (requestId: string) => {
    const { error } = await supabase.from("friendships").delete().eq("id", requestId)

    if (!error) {
      setLocalSentRequests(localSentRequests.filter((r) => r.id !== requestId))
    }
  }

  const removeFriend = async (friendId: string) => {
    setIsRemovingFriend(true)
    // 双方向のフレンドシップを削除
    const { error } = await supabase
      .from("friendships")
      .delete()
      .or(
        `and(requester_id.eq.${currentUserId},addressee_id.eq.${friendId}),and(requester_id.eq.${friendId},addressee_id.eq.${currentUserId})`,
      )

    if (!error) {
      setLocalFriends(localFriends.filter((f) => f.id !== friendId))
    }
    setIsRemovingFriend(false)
    setFriendToRemove(null)
  }

  const sendEmailInvite = async () => {
    if (!inviteEmail.trim()) return

    setIsInviting(true)
    setInviteMessage(null)

    try {
      const response = await fetch("/api/friend-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inviteEmail.trim(),
          inviterId: currentUserId,
        }),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error || "招待メールの送信に失敗しました")
      }

      setInviteMessage({
        type: "success",
        text: "招待メールを送信しました",
      })
      setInviteEmail("")
    } catch (error) {
      setInviteMessage({
        type: "error",
        text: error instanceof Error ? error.message : "招待メールの送信に失敗しました",
      })
    } finally {
      setIsInviting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="w-5 h-5" />
          フレンド
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 自分のフレンドコード */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <Label className="text-sm text-muted-foreground">あなたのフレンドID</Label>
          <div className="flex items-center gap-2 mt-1">
            <code className="text-xl font-mono font-bold tracking-widest">{friendCode}</code>
            <Button variant="ghost" size="sm" onClick={copyFriendCode}>
              {copied ? <Check className="w-4 h-4 text-chart-1" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">友達に共有してフレンド申請を受け取りましょう</p>
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            メールで招待
          </Label>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="friend@example.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <Button onClick={sendEmailInvite} disabled={isInviting || !inviteEmail.trim()}>
              <Mail className="w-4 h-4" />
            </Button>
          </div>
          {inviteMessage && (
            <p className={`text-sm ${inviteMessage.type === "success" ? "text-green-600" : "text-destructive"}`}>
              {inviteMessage.text}
            </p>
          )}
          <p className="text-xs text-muted-foreground">Supabase経由で招待メールを送信します。</p>
        </div>

        {/* フレンド検索 */}
        <div className="space-y-3">
          <Label>フレンドID検索</Label>
          <div className="flex gap-2">
            <Input
              placeholder="フレンドIDを入力"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
              className="font-mono tracking-widest"
              maxLength={8}
            />
            <Button onClick={handleSearch} disabled={isSearching || !searchCode.trim()}>
              <Search className="w-4 h-4" />
            </Button>
          </div>
          {searchError && <p className="text-sm text-destructive">{searchError}</p>}
          {searchResult && (
          <div className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={searchResult.avatar_url || undefined} />
                  <AvatarFallback>
                    {searchResult.display_name ? searchResult.display_name.charAt(0).toUpperCase() : "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{searchResult.display_name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{searchResult.friend_code}</p>
                </div>
              </div>
              <Button size="sm" onClick={sendRequest} disabled={isSending}>
                <UserPlus className="w-4 h-4 mr-1" />
                申請
              </Button>
            </div>
          )}
        </div>

        {/* 受信した申請 */}
        {localPendingRequests.length > 0 && (
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              フレンド申請 ({localPendingRequests.length})
            </Label>
            <div className="space-y-2">
              {localPendingRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={request.requester.avatar_url || undefined} />
                      <AvatarFallback>
                        {request.requester.display_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{request.requester.display_name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{request.requester.friend_code}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-chart-1 border-chart-1 hover:bg-chart-1 hover:text-white bg-transparent"
                      onClick={() => acceptRequest(request.id, request.requester_id, request.requester)}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive border-destructive hover:bg-destructive hover:text-white bg-transparent"
                      onClick={() => rejectRequest(request.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 送信した申請 */}
        {localSentRequests.length > 0 && (
          <div className="space-y-3">
            <Label className="text-muted-foreground">申請中 ({localSentRequests.length})</Label>
            <div className="space-y-2">
              {localSentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg opacity-70"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={request.addressee.avatar_url || undefined} />
                      <AvatarFallback>
                        {request.addressee.display_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{request.addressee.display_name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{request.addressee.friend_code}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => cancelRequest(request.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* フレンド一覧 */}
        <div className="space-y-3">
          <Label>フレンド一覧 ({localFriends.length})</Label>
          {localFriends.length === 0 ? (
            <p className="text-sm text-muted-foreground">まだフレンドがいません</p>
          ) : (
            <div className="space-y-2">
              {localFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/5 transition-colors group"
                >
                  <Link href={`/users/${friend.id}?from=friends`} className="flex-1">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={friend.avatar_url || undefined} />
                        <AvatarFallback>{friend.display_name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium group-hover:text-chart-1 transition-colors">{friend.display_name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{friend.friend_code}</p>
                      </div>
                      <TrendingUp className="w-4 h-4 text-muted-foreground group-hover:text-chart-1 transition-colors" />
                    </div>
                  </Link>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => setFriendToRemove(friend)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <AlertDialog open={Boolean(friendToRemove)} onOpenChange={(open) => !open && setFriendToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              {friendToRemove?.display_name} さんをフレンドから削除します。この操作は元に戻せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemovingFriend}>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              disabled={isRemovingFriend}
              onClick={() => friendToRemove && removeFriend(friendToRemove.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isRemovingFriend ? "削除中..." : "削除する"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
