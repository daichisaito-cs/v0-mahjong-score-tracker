export const YAKUMAN_LIST = [
  "天和",
  "地和",
  "国士無双",
  "四暗刻",
  "大三元",
  "字一色",
  "小四喜",
  "大四喜",
  "緑一色",
  "清老頭",
  "九蓮宝燈",
  "四槓子",
] as const

export type YakumanType = (typeof YAKUMAN_LIST)[number]

export interface YakumanEntry {
  name: string
  playedAt: string | null
}

export interface GroupedYakuman {
  name: string
  count: number
  /** 新しい順の達成日 (playedAt が null のものは除外) */
  dates: string[]
}

/** 同じ役満名をまとめる。多い順 → 直近順 */
export function groupYakuman(records: YakumanEntry[]): GroupedYakuman[] {
  const map = new Map<string, GroupedYakuman>()
  for (const record of records) {
    const group = map.get(record.name) || { name: record.name, count: 0, dates: [] }
    group.count += 1
    if (record.playedAt) group.dates.push(record.playedAt)
    map.set(record.name, group)
  }
  const groups = Array.from(map.values())
  for (const group of groups) {
    group.dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  }
  groups.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count
    const aLatest = a.dates[0] ? new Date(a.dates[0]).getTime() : 0
    const bLatest = b.dates[0] ? new Date(b.dates[0]).getTime() : 0
    return bLatest - aLatest
  })
  return groups
}

export function formatYakumanDate(date: string): string {
  return new Date(date).toLocaleDateString("ja-JP", { year: "numeric", month: "numeric", day: "numeric" })
}
