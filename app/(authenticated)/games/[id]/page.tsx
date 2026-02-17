"use client"

import { useEffect, useMemo } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { useAuthUser } from "@/lib/hooks/use-auth-user"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

export default function GameDetailPage() {
  const router = useRouter()
  const params = useParams()
  const supabase = createClient()

  const gameId = useMemo(() => {
    const raw = params?.id
    return Array.isArray(raw) ? raw[0] : raw
  }, [params])

  const userQuery = useAuthUser()

  const user = userQuery.data

  useEffect(() => {
    if (userQuery.isFetched && !user) router.replace("/auth/login")
  }, [router, user, userQuery.isFetched])

  const gameQuery = useQuery({
    queryKey: ["game", gameId, user?.id],
    enabled: Boolean(user?.id && gameId && isValidUUID(gameId)),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("games")
        .select(
          `
          *,
          creator:profiles!games_created_by_fkey (
            display_name,
            avatar_url
          ),
          leagues (name),
          game_results (
            id,
            game_id,
            seat_index,
            user_id,
            player_name,
            rank,
            raw_score,
            point,
            bonus_points,
            created_at,
            profiles (display_name, avatar_url)
          )
        `,
        )
        .eq("id", gameId!)
        .single()

      if (error) throw error
      return data || null
    },
  })

  if (userQuery.isLoading || (userQuery.isFetched && !user)) {
    return (
      <div className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">読み込み中...</CardContent>
        </Card>
      </div>
    )
  }

  if (!gameId || !isValidUUID(gameId)) {
    return (
      <div className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">対局が見つかりませんでした</p>
            <Link href="/games">
              <Button>対局一覧に戻る</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameQuery.isLoading) {
    return (
      <div className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">読み込み中...</CardContent>
        </Card>
      </div>
    )
  }

  const game = gameQuery.data as any
  if (!game) {
    return (
      <div className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">対局が見つかりませんでした</p>
            <Link href="/games">
              <Button>対局一覧に戻る</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const sortedResults = [...(game.game_results || [])].sort((a, b) => {
    if (a.rank !== b.rank) return a.rank - b.rank
    const seatA = Number(a.seat_index ?? 999)
    const seatB = Number(b.seat_index ?? 999)
    if (seatA !== seatB) return seatA - seatB
    return 0
  })
  const creatorName = game.creator?.display_name || "不明"
  const isOwner = game.created_by === user?.id

  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/games">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">対局詳細</h1>
            <p className="text-muted-foreground">
              {new Date(game.played_at).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-xs text-muted-foreground">作成者: {creatorName}</p>
          </div>
        </div>
        {isOwner && (
          <Link href={`/games/${gameId}/edit`}>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Edit className="h-4 w-4" />
              編集
            </Button>
          </Link>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">対局情報</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
                {game.game_type === "four_player" ? "四人麻雀" : "三人麻雀"}
              </span>
              {game.leagues && (
                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">{game.leagues.name}</span>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedResults.map((result, index) => (
              <div
                key={result.id}
                className={cn(
                  "flex items-center gap-1 py-4 px-3 rounded-lg",
                  index === 0 ? "bg-accent/20" : "bg-muted/50",
                )}
              >
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <div
                    className={cn(
                      "w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold",
                      result.rank === 1 && "bg-accent text-accent-foreground",
                      result.rank === 2 && "bg-secondary text-secondary-foreground",
                      result.rank === 3 && "bg-muted text-muted-foreground",
                      result.rank === 4 && "bg-destructive/10 text-destructive",
                    )}
                  >
                    {result.rank === 1 ? <Trophy className="h-5 w-5" /> : `${result.rank}位`}
                  </div>
                  <Avatar className="h-8.5 w-8.5 shrink-0">
                    <AvatarImage src={(result.profiles as any)?.avatar_url || undefined} />
                    <AvatarFallback>
                      {(result.player_name || result.profiles?.display_name || "?").charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-semibold truncate leading-tight" title={result.player_name || result.profiles?.display_name || "Unknown"}>
                      {result.player_name || result.profiles?.display_name || "Unknown"}
                    </p>
                    <p className="text-xs text-muted-foreground">席{result.seat_index ?? "-"}</p>
                    <p className="text-sm text-muted-foreground font-bold">{result.raw_score.toLocaleString()}点</p>
                    {Number(result.bonus_points) !== 0 && (
                      <p className="text-xs text-muted-foreground">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-[10px] font-semibold leading-none whitespace-nowrap",
                            Number(result.bonus_points) > 0
                              ? "border-chart-1/40 bg-chart-1/10 text-chart-1"
                              : "border-destructive/40 bg-destructive/10 text-destructive",
                          )}
                        >
                          {Number(result.bonus_points) > 0 ? "飛び賞" : "飛び"}{" "}
                          {Number(result.bonus_points) > 0 ? "+" : ""}
                          {Number(result.bonus_points).toFixed(2)}pt
                        </span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0 w-[85px]">
                  <p
                    className={cn("text-xl font-bold", Number(result.point) >= 0 ? "text-chart-1" : "text-destructive")}
                  >
                    {Number(result.point) >= 0 ? "+" : ""}
                    {Number(result.point).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">ポイント</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
