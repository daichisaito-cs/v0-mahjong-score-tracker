"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

interface SessionSummaryDialogProps {
  open: boolean
  sessionResults: Array<{
    players: string[]
    points: number[]
  }>
  onClose: () => void
}

export function SessionSummaryDialog({ open, sessionResults, onClose }: SessionSummaryDialogProps) {
  // プレイヤー名のリストを取得（user_idがないプレイヤーは名前で同一人物と判断）
  const allPlayerNames = Array.from(new Set(sessionResults.flatMap((result) => result.players)))

  // 各プレイヤーの合計ポイントを計算
  const playerTotals = allPlayerNames.map((name) => {
    const total = sessionResults.reduce((sum, result) => {
      const playerIndex = result.players.indexOf(name)
      return sum + (playerIndex !== -1 ? result.points[playerIndex] : 0)
    }, 0)
    return { name, total }
  })

  // 合計ポイントでソート
  const sortedPlayers = [...playerTotals].sort((a, b) => b.total - a.total)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>セッション合計結果</DialogTitle>
          <DialogDescription>{sessionResults.length}回の対局の合計ポイントです</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {sortedPlayers.map((player, index) => (
            <Card key={player.name}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-muted-foreground">{index + 1}</div>
                  <div>
                    <div className="font-medium">{player.name}</div>
                  </div>
                </div>
                <div
                  className={`text-xl font-bold ${
                    player.total > 0 ? "text-green-600" : player.total < 0 ? "text-red-600" : ""
                  }`}
                >
                  {player.total > 0 ? "+" : ""}
                  {player.total.toFixed(1)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            対局一覧に戻る
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
