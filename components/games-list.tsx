"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Calculator } from "lucide-react"

interface Game {
  id: string
  game_type: string
  league_id: string | null
  played_at: string
  game_results: Array<{
    id: string
    user_id: string | null
    player_name: string
    rank: number
    point: number
  }>
}

interface GamesListProps {
  games: Game[]
}

export function GamesList({ games }: GamesListProps) {
  const [selectedGames, setSelectedGames] = useState<string[]>([])

  const toggleGameSelection = (gameId: string) => {
    setSelectedGames((prev) => (prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]))
  }

  // 選択した対局の合計ポイントを計算
  const calculateTotalPoints = () => {
    const playerTotals: Record<string, { name: string; total: number }> = {}

    selectedGames.forEach((gameId) => {
      const game = games.find((g) => g.id === gameId)
      if (!game) return

      game.game_results.forEach((result) => {
        // user_idがある場合はそれをキーに、ない場合は名前をキーにする
        const key = result.user_id || `name_${result.player_name}`

        if (!playerTotals[key]) {
          playerTotals[key] = { name: result.player_name, total: 0 }
        }
        playerTotals[key].total += Number(result.point)
      })
    })

    return Object.values(playerTotals).sort((a, b) => b.total - a.total)
  }

  const totalPoints = selectedGames.length > 0 ? calculateTotalPoints() : []

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
    <div className="space-y-4">
      {selectedGames.length > 0 && (
        <Card className="bg-primary/5 border-primary">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm">選択した{selectedGames.length}戦の合計ポイント</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {totalPoints.map((player, index) => (
                <div key={index} className="text-center p-2 bg-background rounded border">
                  <div className="text-sm font-medium truncate">{player.name}</div>
                  <div className={`text-lg font-bold ${player.total >= 0 ? "text-chart-1" : "text-destructive"}`}>
                    {player.total >= 0 ? "+" : ""}
                    {player.total.toFixed(1)}
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 w-full bg-transparent"
              onClick={() => setSelectedGames([])}
            >
              選択をクリア
            </Button>
          </CardContent>
        </Card>
      )}

      {games.map((game) => {
        const sortedResults = [...(game.game_results || [])].sort((a, b) => a.rank - b.rank)
        const isSelected = selectedGames.includes(game.id)

        return (
          <div key={game.id} className="flex gap-2 items-start">
            <div className="pt-4">
              <Checkbox checked={isSelected} onCheckedChange={() => toggleGameSelection(game.id)} />
            </div>
            <Link href={`/games/${game.id}`} className="flex-1">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
                        {game.game_type === "four_player" ? "四麻" : "三麻"}
                      </span>
                      {game.league_id && (
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">リーグ戦</span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(game.played_at).toLocaleDateString("ja-JP")}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {sortedResults.map((result) => (
                      <div key={result.id} className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">{result.rank}位</div>
                        <div className="text-sm font-medium truncate">{result.player_name || "Unknown"}</div>
                        <div className={`text-xs ${Number(result.point) >= 0 ? "text-chart-1" : "text-destructive"}`}>
                          {Number(result.point) >= 0 ? "+" : ""}
                          {Number(result.point).toFixed(1)}
                        </div>
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
