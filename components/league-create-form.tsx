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
import { Users } from "lucide-react"

interface Friend {
  id: string
  display_name: string
  friend_code: string
}

interface LeagueCreateFormProps {
  userId: string
}

export function LeagueCreateForm({ userId }: LeagueCreateFormProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [gameType, setGameType] = useState<"four_player" | "three_player">("four_player")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ウマ設定
  const [umaFirst, setUmaFirst] = useState("30")
  const [umaSecond, setUmaSecond] = useState("10")
  const [umaThird, setUmaThird] = useState("-10")
  const [umaFourth, setUmaFourth] = useState("-30")
  const [startingPoints, setStartingPoints] = useState("25000")

  const [friends, setFriends] = useState<Friend[]>([])
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])
  const [loadingFriends, setLoadingFriends] = useState(true)

  useEffect(() => {
    const fetchFriends = async () => {
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

      // フレンドのIDを抽出
      const friendIds = friendships.map((f) => (f.requester_id === userId ? f.addressee_id : f.requester_id))

      // フレンドのプロフィールを取得
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, display_name, friend_code")
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

    const supabase = createClient()

    try {
      const { data: league, error: leagueError } = await supabase
        .from("leagues")
        .insert({
          name: name.trim(),
          description: description.trim() || null,
          game_type: gameType,
          uma_first: Number.parseInt(umaFirst) || 30,
          uma_second: Number.parseInt(umaSecond) || 10,
          uma_third: Number.parseInt(umaThird) || -10,
          uma_fourth: Number.parseInt(umaFourth) || -30,
          starting_points: Number.parseInt(startingPoints) || 25000,
          owner_id: userId,
        })
        .select()
        .single()

      if (leagueError) throw leagueError

      const members = [
        { league_id: league.id, user_id: userId },
        ...selectedFriends.map((friendId) => ({ league_id: league.id, user_id: friendId })),
      ]

      const { error: memberError } = await supabase.from("league_members").insert(members)
      if (memberError) throw memberError

      if (selectedFriends.length > 1) {
        const friendPairs: { requester_id: string; addressee_id: string; status: string }[] = []
        for (let i = 0; i < selectedFriends.length; i++) {
          for (let j = i + 1; j < selectedFriends.length; j++) {
            friendPairs.push({
              requester_id: selectedFriends[i],
              addressee_id: selectedFriends[j],
              status: "accepted",
            })
          }
        }
        // エラーは無視（既にフレンドの場合など）
        await supabase
          .from("friendships")
          .upsert(friendPairs, { onConflict: "requester_id,addressee_id", ignoreDuplicates: true })
      }

      setIsSubmitted(true)
      window.location.href = `/leagues/${league.id}`
    } catch (err) {
      setError(err instanceof Error ? err.message : "作成に失敗しました")
      setIsLoading(false)
    }
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
                    <div className="flex-1">
                      <p className="font-medium">{friend.display_name}</p>
                      <p className="text-xs text-muted-foreground">ID: {friend.friend_code}</p>
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

      {/* ゲームタイプ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">対局タイプ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              type="button"
              variant={gameType === "four_player" ? "default" : "outline"}
              className="flex-1"
              disabled={isLoading || isSubmitted}
              onClick={() => {
                setGameType("four_player")
                setUmaFirst("30")
                setUmaSecond("10")
                setUmaThird("-10")
                setUmaFourth("-30")
              }}
            >
              四人麻雀
            </Button>
            <Button
              type="button"
              variant={gameType === "three_player" ? "default" : "outline"}
              className="flex-1"
              disabled={isLoading || isSubmitted}
              onClick={() => {
                setGameType("three_player")
                setUmaFirst("30")
                setUmaSecond("0")
                setUmaThird("-30")
                setUmaFourth("0")
              }}
            >
              三人麻雀
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ルール設定 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ルール設定</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>ウマ</Label>
            <div className="grid grid-cols-4 gap-2">
              <div>
                <Label className="text-xs text-muted-foreground">1位</Label>
                <Input
                  type="number"
                  value={umaFirst}
                  onChange={(e) => setUmaFirst(e.target.value)}
                  disabled={isLoading || isSubmitted}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">2位</Label>
                <Input
                  type="number"
                  value={umaSecond}
                  onChange={(e) => setUmaSecond(e.target.value)}
                  disabled={isLoading || isSubmitted}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">3位</Label>
                <Input
                  type="number"
                  value={umaThird}
                  onChange={(e) => setUmaThird(e.target.value)}
                  disabled={isLoading || isSubmitted}
                />
              </div>
              {gameType === "four_player" && (
                <div>
                  <Label className="text-xs text-muted-foreground">4位</Label>
                  <Input
                    type="number"
                    value={umaFourth}
                    onChange={(e) => setUmaFourth(e.target.value)}
                    disabled={isLoading || isSubmitted}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="startingPoints">持ち点</Label>
            <Input
              id="startingPoints"
              type="number"
              value={startingPoints}
              onChange={(e) => setStartingPoints(e.target.value)}
              disabled={isLoading || isSubmitted}
            />
          </div>
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
