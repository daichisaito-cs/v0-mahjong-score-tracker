import type { SessionResult } from "@/components/session-summary-dialog"

export interface CarryoverResultRow {
  seat_index?: number | null
  user_id: string | null
  player_name: string | null
  rank: number
  point: number | string
  profiles?: { display_name?: string | null; avatar_url?: string | null } | null
}

export interface CarryoverGame {
  id: string
  played_at: string
  game_type: string
  league_id: string | null
  applied_rule_id?: string | null
  results: CarryoverResultRow[]
}

export function carryoverPlayerName(row: CarryoverResultRow) {
  return row.player_name || row.profiles?.display_name || "不明"
}

export function sortCarryoverRows(rows: CarryoverResultRow[]) {
  return rows
    .slice()
    .sort((a, b) => (Number(a.seat_index ?? a.rank) - Number(b.seat_index ?? b.rank)) || a.rank - b.rank)
}

/** 過去の対局1局を、セッション合計に足し込める形（SessionResult）へ変換する */
export function buildSessionResultFromGame(game: CarryoverGame): SessionResult {
  const rows = sortCarryoverRows(game.results || [])
  return {
    players: rows.map((row) => ({
      name: carryoverPlayerName(row),
      userId: row.user_id || undefined,
      avatarUrl: row.profiles?.avatar_url || null,
      isManual: !row.user_id,
    })),
    points: rows.map((row) => Number(row.point) || 0),
  }
}

/** 過去の対局のメンバー構成を、新規入力フォームの席（素点は空）として引き継ぐ */
export function buildSeatsFromGame(game: CarryoverGame) {
  const seatBuckets = new Map<number, CarryoverResultRow[]>()

  sortCarryoverRows(game.results || []).forEach((row) => {
    const seat = Number(row.seat_index ?? row.rank)
    if (!Number.isFinite(seat) || seat < 1) return
    if (!seatBuckets.has(seat)) seatBuckets.set(seat, [])
    seatBuckets.get(seat)!.push(row)
  })

  return Array.from(seatBuckets.keys())
    .sort((a, b) => a - b)
    .map((seat, index) => ({
      seatIndex: index + 1,
      score: "",
      bonusPoints: 0,
      members: (seatBuckets.get(seat) || []).slice(0, 2).map((row) => ({
        name: carryoverPlayerName(row),
        userId: row.user_id || undefined,
        avatarUrl: row.profiles?.avatar_url || null,
        isManual: !row.user_id,
      })),
    }))
}

/** 選択した対局の合計ポイント（プレイヤーごと） */
export function summarizeCarryover(games: CarryoverGame[]) {
  const totals: Record<string, { name: string; total: number }> = {}

  games.forEach((game) => {
    ;(game.results || []).forEach((row) => {
      const key = row.user_id || `name_${carryoverPlayerName(row)}`
      if (!totals[key]) totals[key] = { name: carryoverPlayerName(row), total: 0 }
      totals[key].total += Number(row.point) || 0
    })
  })

  return Object.values(totals)
    .map((entry) => ({ ...entry, total: Number(entry.total.toFixed(2)) }))
    .sort((a, b) => b.total - a.total)
}
