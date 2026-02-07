"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Friend {
  id: string
  display_name: string
  friend_code: string
  avatar_url?: string | null
}

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
}

interface LeagueCreateFormProps {
  userId: string
}

export function LeagueCreateForm({ userId }: LeagueCreateFormProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [rules, setRules] = useState<Rule[]>([])
  const [selectedRuleId, setSelectedRuleId] = useState<string>("")
  const [loadingRules, setLoadingRules] = useState(true)

  const [friends, setFriends] = useState<Friend[]>([])
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])
  const [loadingFriends, setLoadingFriends] = useState(true)

  useEffect(() => {
    const fetchRules = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("rules").select("*").order("created_at", { ascending: false })

      setRules(data || [])
      if (data && data.length > 0) {
        setSelectedRuleId(data[0].id)
      }
      setLoadingRules(false)
    }

    fetchRules()
  }, [])

  useEffect(() => {
    const fetchFriends = async () => {
      const supabase = createClient()

      const { data: friendships } = await supabase
        .from("friendships")
        .select("requester_id, addressee_id")
        .eq("status", "accepted")
        .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)

      if (!friendships || friendships.length === 0) {
        setLoadingFriends(false)
        return
      }

      const friendIds = friendships.map((f) => (f.requester_id === userId ? f.addressee_id : f.requester_id))

      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, display_name, friend_code, avatar_url")
        .in("id", friendIds)

      setFriends(profiles || [])
      setLoadingFriends(false)
    }

    fetchFriends()
  }, [userId])

  const toggleFriend = (friendId: string) => {
    setSelectedFriends((prev) => (prev.includes(friendId) ? prev.filter((id) => id !== friendId) : [...prev, friendId]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitted || isLoading) return

    setIsLoading(true)
    setError(null)

    if (!name.trim()) {
      setError("リーグ名を入力してください")
      setIsLoading(false)
      return
    }

    if (!selectedRuleId) {
      setError("ルールを選択してください")
      setIsLoading(false)
      return
    }

    const supabase = createClient()

    try {
      const selectedRule = rules.find((r) => r.id === selectedRuleId)
      if (!selectedRule) {
        throw new Error("ルールが見つかりません")
      }

      console.log("[v0] Creating league with:", {
        name: name.trim(),
        description: description.trim(),
        rule_id: selectedRuleId,
        game_type: selectedRule.game_type,
        owner_id: userId,
      })

      const { data: league, error: leagueError } = await supabase
        .from("leagues")
        .insert({
          name: name.trim(),
          description: description.trim() || null,
          rule_id: selectedRuleId,
          game_type: selectedRule.game_type, // game_typeを追加
          owner_id: userId,
        })
        .select()
        .single()

      if (leagueError) {
        console.error("[v0] League creation error:", leagueError)
        throw leagueError
      }

      console.log("[v0] League created:", league)

      const members = [
        { league_id: league.id, user_id: userId },
        ...selectedFriends.map((friendId) => ({ league_id: league.id, user_id: friendId })),
      ]

      console.log("[v0] Inserting members:", members)

      const { error: memberError } = await supabase.from("league_members").insert(members)
      if (memberError) {
        console.error("[v0] Member insertion error:", memberError)
        throw memberError
      }

      if (selectedFriends.length > 0) {
        const allMemberIds = [userId, ...selectedFriends]
        const friendPairs: { requester_id: string; addressee_id: string; status: string }[] = []

        // すべてのメンバーペアを作成
        for (let i = 0; i < allMemberIds.length; i++) {
          for (let j = i + 1; j < allMemberIds.length; j++) {
            const [smaller, larger] =
              allMemberIds[i] < allMemberIds[j]
                ? [allMemberIds[i], allMemberIds[j]]
                : [allMemberIds[j], allMemberIds[i]]

            friendPairs.push({
              requester_id: smaller,
              addressee_id: larger,
              status: "accepted",
            })
          }
        }

        if (friendPairs.length > 0) {
          await supabase.from("friendships").upsert(friendPairs, {
            onConflict: "requester_id,addressee_id",
            ignoreDuplicates: true,
          })
        }
      }

      setIsSubmitted(true)
      window.location.href = `/leagues/${league.id}`
    } catch (err) {
      console.error("[v0] League creation full error:", err)
      setError(err instanceof Error ? err.message : "作成に失敗しました")
      setIsLoading(false)
    }
  }

  if (loadingRules) {
    return <p className="text-muted-foreground">読み込み中...</p>
  }

  if (rules.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="space-y-3">
          <p>リーグを作成するには、先にルールを作成する必要があります。</p>
          <Link href="/rules/new">
            <Button>ルールを作成</Button>
          </Link>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 基本情報 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">基本情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">リーグ名 *</Label>
            <Input
              id="name"
              placeholder="例: 週末麻雀リーグ"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading || isSubmitted}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">説明</Label>
            <Textarea
              id="description"
              placeholder="リーグの説明やルールなど"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              disabled={isLoading || isSubmitted}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ルール選択</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="rule">使用するルール *</Label>
            <select
              id="rule"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={selectedRuleId}
              onChange={(e) => setSelectedRuleId(e.target.value)}
              disabled={isLoading || isSubmitted}
            >
              {rules.map((rule) => (
                <option key={rule.id} value={rule.id}>
                  {rule.name} ({rule.game_type === "four_player" ? "四麻" : "三麻"})
                </option>
              ))}
            </select>
          </div>

          {/* ルール詳細プレビュー */}
          {selectedRuleId && (
            <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-2">
              <p className="text-sm font-medium">ルール詳細</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  ウマ: {rules.find((r) => r.id === selectedRuleId)?.uma_first} /{" "}
                  {rules.find((r) => r.id === selectedRuleId)?.uma_second} /{" "}
                  {rules.find((r) => r.id === selectedRuleId)?.uma_third}
                  {rules.find((r) => r.id === selectedRuleId)?.game_type === "four_player" &&
                    ` / ${rules.find((r) => r.id === selectedRuleId)?.uma_fourth ?? "-"}`}
                </p>
                <p>
                  持ち点: {rules.find((r) => r.id === selectedRuleId)?.starting_points.toLocaleString()} 返し:{" "}
                  {rules.find((r) => r.id === selectedRuleId)?.return_points.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            参加メンバー
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingFriends ? (
            <p className="text-muted-foreground text-sm">読み込み中...</p>
          ) : friends.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                フレンドを選択してリーグに参加させることができます（あなたは自動で参加します）
              </p>
              <div className="grid gap-2">
                {friends.map((friend) => (
                  <label
                    key={friend.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <Checkbox
                      checked={selectedFriends.includes(friend.id)}
                      onCheckedChange={() => toggleFriend(friend.id)}
                      disabled={isLoading || isSubmitted}
                    />
                    <div className="flex items-center gap-3 flex-1">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={friend.avatar_url || undefined} />
                        <AvatarFallback>{friend.display_name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{friend.display_name}</p>
                        <p className="text-xs text-muted-foreground">ID: {friend.friend_code}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              {selectedFriends.length > 0 && (
                <p className="text-sm text-muted-foreground">{selectedFriends.length}人のフレンドを選択中</p>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              フレンドがいません。マイページからフレンドを追加してください。
            </p>
          )}
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1 bg-transparent"
          onClick={() => window.history.back()}
          disabled={isLoading || isSubmitted}
        >
          キャンセル
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading || isSubmitted}>
          {isLoading || isSubmitted ? "作成中..." : "作成する"}
        </Button>
      </div>
    </form>
  )
}
