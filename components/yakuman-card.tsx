import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { formatYakumanDate, groupYakuman, type YakumanEntry } from "@/lib/yakuman"

export function YakumanCard({ records }: { records: YakumanEntry[] }) {
  if (records.length === 0) return null

  const groups = groupYakuman(records)

  return (
    <Card className="border border-amber-200 shadow-sm bg-amber-50/30">
      <CardHeader className="pb-2 px-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          役満
          <span className="ml-auto text-sm font-semibold text-amber-700">計{records.length}回</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-4">
        <div className="space-y-2">
          {groups.map((group) => (
            <div
              key={group.name}
              className="flex items-center justify-between gap-3 rounded-lg border border-amber-200/70 bg-white px-3 py-2"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-bold text-amber-800 truncate">{group.name}</span>
                {group.count > 1 && (
                  <span className="shrink-0 rounded-full bg-amber-100 px-1.5 py-0.5 text-[11px] font-bold text-amber-700">
                    ×{group.count}
                  </span>
                )}
              </div>
              {group.dates.length > 0 && (
                <div className="flex flex-wrap justify-end gap-x-1.5 text-xs text-muted-foreground">
                  {group.dates.map((date, index) => (
                    <span key={`${date}-${index}`} className="whitespace-nowrap">
                      {formatYakumanDate(date)}
                      {index < group.dates.length - 1 && "、"}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
