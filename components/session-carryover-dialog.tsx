"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  carryoverPlayerName,
  sortCarryoverRows,
  summarizeCarryover,
  type CarryoverGame,
} from "@/lib/session-carryover"

interface SessionCarryoverDialogProps {
  open: boolean
  games: CarryoverGame[]
  selectedIds: string[]
  onOpenChange: (open: boolean) => void
  onConfirm: (gameIds: string[]) => void
}

const formatPoint = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}`

export function SessionCarryoverDialog({
  open,
  games,
  selectedIds,
  onOpenChange,
  onConfirm,
}: SessionCarryoverDialogProps) {
  const [selected, setSelected] = useState<string[]>(selectedIds)

  useEffect(() => {
    if (open) setSelected(selectedIds)
  }, [open, selectedIds])

  const toggle = (gameId: string) => {
    setSelected((prev) => (prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]))
  }

  const selectedGames = useMemo(
    () => games.filter((game) => selected.includes(game.id)),
    [games, selected],
  )
  const totals = useMemo(() => summarizeCarryover(selectedGames), [selectedGames])

  // 選択した対局は古い順にセッションへ積む
  const orderedSelectedIds = useMemo(
    () =>
      selectedGames
        .slice()
        .sort((a, b) => new Date(a.played_at).getTime() - new Date(b.played_at).getTime())
        .map((game) => game.id),
    [selectedGames],
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>過去の対局を引き継ぐ</DialogTitle>
          <DialogDescription>
            選んだ対局の合計ポイントを引き継いで、その続きとして記録できます
          </DialogDescription>
        </DialogHeader>

        {games.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">引き継げる対局がありません</p>
        ) : (
          <div className="max-h-[45vh] space-y-2 overflow-y-auto pr-1">
            {games.map((game) => {
              const isSelected = selected.includes(game.id)
              const rows = sortCarryoverRows(game.results || [])
              const playedAt = new Date(game.played_at)

              return (
                <Card
                  key={game.id}
                  onClick={() => toggle(game.id)}
                  className={cn(
                    "cursor-pointer py-3 transition-colors",
                    isSelected ? "border-primary bg-primary/5" : "border-border/70 hover:bg-muted/40",
                  )}
                >
                  <CardContent className="px-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded-full border",
                            isSelected ? "border-primary bg-primary" : "border-muted-foreground/40",
                          )}
                        >
                          {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                        </div>
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground">
                          {game.game_type === "four_player" ? "四麻" : "三麻"}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {playedAt.toLocaleString("ja-JP", {
                          month: "numeric",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                      {rows.map((row, index) => {
                        const point = Number(row.point) || 0
                        return (
                          <span key={`${game.id}-${index}`} className="whitespace-nowrap">
                            <span className="font-medium">{carryoverPlayerName(row)}</span>{" "}
                            <span className={point >= 0 ? "text-chart-1" : "text-destructive"}>
                              {formatPoint(point)}
                            </span>
                          </span>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {totals.length > 0 && (
          <div className="rounded-lg border bg-muted/40 p-3">
            <div className="mb-1 text-xs font-semibold text-muted-foreground">
              引き継ぐ合計（{selected.length}戦）
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {totals.map((player) => (
                <span key={player.name} className="whitespace-nowrap">
                  {player.name}{" "}
                  <span className={cn("font-bold", player.total >= 0 ? "text-chart-1" : "text-destructive")}>
                    {formatPoint(player.total)}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}

        <DialogFooter>
          <div className="flex w-full flex-col gap-2">
            <Button className="w-full" disabled={games.length === 0} onClick={() => onConfirm(orderedSelectedIds)}>
              {selected.length > 0 ? `${selected.length}戦を引き継ぐ` : "引き継ぎをやめる"}
            </Button>
            <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
              キャンセル
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
