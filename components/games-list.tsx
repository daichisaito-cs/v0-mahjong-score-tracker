"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calculator, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toPng } from "html-to-image"

interface Game {
  id: string
  game_type: string
  league_id: string | null
  played_at: string
  creator?: {
    display_name?: string | null
    avatar_url?: string | null
  } | null
  game_results: Array<{
    id: string
    user_id: string | null
    player_name: string
    rank: number
    point: number
    bonus_points?: number | null
    profiles?: {
      avatar_url?: string | null
      display_name?: string | null
    } | null
  }>
}

interface GamesListProps {
  games: Game[]
}

export function GamesList({ games }: GamesListProps) {
  const [selectedGames, setSelectedGames] = useState<string[]>([])
  const [isTotalOpen, setIsTotalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const captureRef = useRef<HTMLDivElement | null>(null)
  const dateStr = new Date().toISOString().slice(0, 10)

  const toggleGameSelection = (gameId: string) => {
    setSelectedGames((prev) => (prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]))
  }

  // 選択した対局の合計ポイントを計算
  const calculateTotalPoints = () => {
    const playerTotals: Record<string, { name: string; total: number; avatarUrl?: string | null }> = {}

    selectedGames.forEach((gameId) => {
      const game = games.find((g) => g.id === gameId)
      if (!game) return

      game.game_results.forEach((result) => {
        // user_idがある場合はそれをキーに、ない場合は名前をキーにする
        const key = result.user_id || `name_${result.player_name}`
        const displayName = result.player_name || result.profiles?.display_name || "Unknown"
        const avatarUrl = result.profiles?.avatar_url || null

        if (!playerTotals[key]) {
          playerTotals[key] = { name: displayName, total: 0, avatarUrl }
        }
        playerTotals[key].total += Number(result.point)
        if (!playerTotals[key].avatarUrl && avatarUrl) {
          playerTotals[key].avatarUrl = avatarUrl
        }
      })
    })

    return Object.values(playerTotals).sort((a, b) => b.total - a.total)
  }

  const totalPoints = selectedGames.length > 0 ? calculateTotalPoints() : []
  let lastTotal: number | null = null
  let lastRank = 0
  const rankedTotals = totalPoints.map((player, index) => {
    if (lastTotal === null || player.total !== lastTotal) {
      lastRank = index + 1
      lastTotal = player.total
    }
    return { ...player, rankLabel: lastRank }
  })

  const handleSaveImage = async () => {
    if (!captureRef.current || isSaving) return
    try {
      setIsSaving(true)
      setIsCapturing(true)
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)))
      const dataUrl = await toPng(captureRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 2,
        filter: (node) => !(node instanceof HTMLElement && node.dataset?.ignore === "true"),
      })
      const link = document.createElement("a")
      link.href = dataUrl
      link.download = `total-points.png`
      link.click()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("[v0] failed to export total points image:", error)
    } finally {
      setIsCapturing(false)
      setIsSaving(false)
    }
  }

  if (games.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground mb-4">まだ対局記録がありません</p>
          <Link href="/games/new">
            <Button>最初の対局を記録する</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {selectedGames.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
          <div className="flex items-center gap-2 text-sm">
            <Calculator className="h-4 w-4 text-primary" />
            <span className="font-semibold">選択中: {selectedGames.length}戦</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => setIsTotalOpen(true)}>
              合計を見る
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent" onClick={() => setSelectedGames([])}>
              選択をクリア
            </Button>
          </div>
        </div>
      )}

      <Dialog open={isTotalOpen} onOpenChange={setIsTotalOpen}>
        <DialogContent className="max-w-md">
          <div ref={captureRef} className="space-y-3">
            <DialogHeader>
              <DialogTitle>合計ポイント</DialogTitle>
              <DialogDescription>選択した{selectedGames.length}戦の合計ポイントです</DialogDescription>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center rounded-full bg-muted px-2 py-1">{dateStr}</span>
              </div>
            </DialogHeader>
            <div className={cn("space-y-3 pr-1", !isCapturing && "max-h-[60vh] overflow-y-auto")}>
              {rankedTotals.map((player, index) => (
                <Card
                  key={player.name}
                  className={cn(
                    "border border-border/80 shadow-sm",
                    player.rankLabel === 1 && "bg-amber-50/70 border-amber-200",
                  )}
                >
                  <CardContent className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "h-9 w-9 rounded-full flex items-center justify-center font-semibold text-sm",
                          player.rankLabel === 1 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground",
                        )}
                      >
                        {player.rankLabel === 1 ? <Trophy className="h-4 w-4" /> : player.rankLabel}
                      </div>
                      <div className="flex items-center gap-2">
                        {player.avatarUrl && (
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={player.avatarUrl} />
                            <AvatarFallback>{player.name.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        )}
                        <div className="font-semibold text-sm">{player.name}</div>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "text-xl font-bold tabular-nums",
                        player.total > 0 && "text-chart-1",
                        player.total < 0 && "text-destructive",
                      )}
                    >
                      {player.total > 0 ? "+" : ""}
                      {player.total.toFixed(1)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <DialogFooter>
            <div className="flex w-full flex-col gap-2">
              <Button
                onClick={handleSaveImage}
                variant="outline"
                className="w-full"
                data-ignore="true"
                disabled={isSaving}
              >
                {isSaving ? "画像を作成中..." : "画像で保存"}
              </Button>
              <Button onClick={() => setIsTotalOpen(false)} className="w-full" data-ignore="true">
                閉じる
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {games.map((game) => {
        const sortedResults = [...(game.game_results || [])].sort((a, b) => a.rank - b.rank)
        const isSelected = selectedGames.includes(game.id)

        return (
          <div key={game.id} className="flex gap-3 items-center">
            <div className="self-start pt-2">
              <Checkbox checked={isSelected} onCheckedChange={() => toggleGameSelection(game.id)} />
            </div>
            <Link href={`/games/${game.id}`} className="flex-1">
              <Card className="hover:bg-muted/40 transition-colors cursor-pointer py-4 gap-3 border-border/70">
                <CardContent className="px-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                        {game.game_type === "four_player" ? "四麻" : "三麻"}
                      </span>
                      {game.league_id && (
                        <span className="text-[11px] px-2 py-1 rounded-full bg-primary/10 text-primary">リーグ戦</span>
                      )}
                    </div>
                    <div className="text-right text-xs text-muted-foreground leading-tight">
                      <div>
                        {new Date(game.played_at).toLocaleDateString("ja-JP")}
                      </div>
                      <div>作成者: {game.creator?.display_name || "不明"}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-3 mt-3">
                    {sortedResults.map((result) => (
                      <div key={result.id} className="text-center min-w-0">
                        <div className="text-[11px] text-muted-foreground">{result.rank}位</div>
                        <div className="text-sm font-semibold truncate w-full">
                          {result.player_name || "Unknown"}
                        </div>
                        <div className={`text-xs ${Number(result.point) >= 0 ? "text-chart-1" : "text-destructive"}`}>
                          {Number(result.point) >= 0 ? "+" : ""}
                          {Number(result.point).toFixed(1)}
                        </div>
                        {Number(result.bonus_points) !== 0 && (
                          <div className="text-[10px] text-muted-foreground">
                            {Number(result.bonus_points) > 0 ? "飛び賞" : "飛ばされたプレイヤー"}{" "}
                            {Number(result.bonus_points) > 0 ? "+" : ""}
                            {Number(result.bonus_points).toFixed(1)}pt
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
