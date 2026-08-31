export interface SeatMemberInput {
  name: string
  userId?: string
  avatarUrl?: string | null
  isManual?: boolean
  yakuman?: string[]
}

export interface SeatInput {
  seatIndex: number
  score: string
  bonusPoints: number
  members: SeatMemberInput[]
}

export type SeatCalcResult = {
  rank: number
  seatPoint: number
}

export const EPSILON = 0.01

export function round2(num: number) {
  return Number(num.toFixed(2))
}

/** 入力欄は100点単位（例: 250 → 25000点） */
export function parseRawScore(value: string): number | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  const parsed = Number.parseInt(trimmed, 10)
  if (Number.isNaN(parsed)) return null
  return parsed * 100
}

/** 素点(25000)を入力欄の表記(250)に戻す */
export function formatRawScore(rawScore: number | null | undefined): string {
  if (rawScore === null || rawScore === undefined) return ""
  return String(Math.round(Number(rawScore) / 100))
}

export function calculateSeatPoints(
  seats: SeatInput[],
  playerCount: number,
  uma: number[],
  startingPoints: number,
  returnPoints: number,
): SeatCalcResult[] {
  const sorted = seats
    .slice(0, playerCount)
    .map((seat, originalIndex) => ({
      originalIndex,
      scoreNum: parseRawScore(seat.score) || 0,
    }))
    .sort((a, b) => b.scoreNum - a.scoreNum)

  const okaPoints = ((returnPoints - startingPoints) * playerCount) / 1000

  const groups: Array<typeof sorted> = []
  let currentGroup: typeof sorted = [sorted[0]]

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].scoreNum === sorted[i - 1].scoreNum) {
      currentGroup.push(sorted[i])
    } else {
      groups.push(currentGroup)
      currentGroup = [sorted[i]]
    }
  }
  groups.push(currentGroup)

  const calculated: Array<{ originalIndex: number; rank: number; seatPoint: number }> = []
  let currentRank = 1

  for (const group of groups) {
    const rankStart = currentRank
    const rankEnd = currentRank + group.length - 1

    let totalUma = 0
    for (let rank = rankStart; rank <= rankEnd; rank++) {
      totalUma += uma[rank - 1] || 0
    }

    const averageUma = totalUma / group.length
    const averageOka = rankStart === 1 ? okaPoints / group.length : 0

    group.forEach((seat) => {
      const basePoint = (seat.scoreNum - returnPoints) / 1000
      calculated.push({
        originalIndex: seat.originalIndex,
        rank: rankStart,
        seatPoint: basePoint + averageUma + averageOka,
      })
    })

    currentRank += group.length
  }

  const finalResults = new Array(playerCount)
  calculated.forEach((entry) => {
    finalResults[entry.originalIndex] = {
      rank: entry.rank,
      seatPoint: entry.seatPoint,
    }
  })

  return finalResults
}
