"use client"

import { useRef, useState } from "react"
import { toPng } from "html-to-image"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

export type SessionPlayer = {
  name: string
  userId?: string
  avatarUrl?: string | null
}

export type SessionResult = {
  players: SessionPlayer[]
  points: number[]
}

interface SessionSummaryDialogProps {
  open: boolean
  sessionResults: SessionResult[]
  leagueName?: string
  onClose: () => void
}

export function SessionSummaryDialog({ open, sessionResults, leagueName, onClose }: SessionSummaryDialogProps) {
  const captureRef = useRef<HTMLDivElement | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const dateStr = new Date().toISOString().slice(0, 10)

  const totals = sessionResults.reduce<Record<string, { name: string; avatarUrl?: string | null; total: number }>>(
    (acc, result) => {
      result.players.forEach((player, idx) => {
        const key = player.userId || player.name
        const avatarUrl = player.avatarUrl || null
        const points = result.points[idx] || 0

        if (!acc[key]) {
          acc[key] = { name: player.name, avatarUrl, total: 0 }
        }

        acc[key].total += points
        if (!acc[key].avatarUrl && avatarUrl) {
          acc[key].avatarUrl = avatarUrl
        }
      })

      return acc
    },
    {},
  )

  const sortedPlayers = Object.values(totals).sort((a, b) => b.total - a.total)
  let lastTotal: number | null = null
  let lastRank = 0
  const rankedPlayers = sortedPlayers.map((player, index) => {
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
      link.download = `session-total.png`
      link.click()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("[v0] failed to export session summary image:", error)
    } finally {
      setIsCapturing(false)
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div ref={captureRef} className="space-y-3">
          <DialogHeader>
            <DialogTitle>セッション合計結果</DialogTitle>
            <DialogDescription>{sessionResults.length}回の対局の合計ポイントです</DialogDescription>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              {leagueName && (
                <span className="inline-flex items-center rounded-full bg-muted px-2 py-1">
                  {leagueName}
                </span>
              )}
              <span className="inline-flex items-center rounded-full bg-muted px-2 py-1">{dateStr}</span>
            </div>
          </DialogHeader>
          <div className={cn("space-y-3 pr-1", !isCapturing && "max-h-[60vh] overflow-y-auto")}>
            {rankedPlayers.map((player, index) => (
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
            <Button onClick={handleSaveImage} variant="outline" className="w-full" data-ignore="true" disabled={isSaving}>
              {isSaving ? "画像を作成中..." : "画像で保存"}
            </Button>
            <Button onClick={onClose} className="w-full" data-ignore="true">
              対局一覧に戻る
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
