"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const chartColors = [
  "#10b981",
  "#f97316",
  "#3b82f6",
  "#8b5cf6",
  "#ef4444",
  "#14b8a6",
  "#eab308",
  "#6366f1",
  "#ec4899",
  "#22c55e",
]

interface ChartPlayer {
  odIndex: string
  name: string
}

interface LeagueDetailChartProps {
  chartPlayers: ChartPlayer[]
  pointsTimeline: Record<string, number>[]
}

export function LeagueDetailChart({ chartPlayers, pointsTimeline }: LeagueDetailChartProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">総合pt推移</CardTitle>
      </CardHeader>
      <CardContent>
        {chartPlayers.length > 0 && pointsTimeline.length > 0 ? (
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pointsTimeline} margin={{ top: 8, right: 12, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                <XAxis
                  dataKey="game"
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                />
                <YAxis
                  width={32}
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                  labelFormatter={(value) => `${value}戦目`}
                  formatter={(value: any, name: any) => [`${value >= 0 ? "+" : ""}${value}pt`, name]}
                />
                <Legend
                  wrapperStyle={{ paddingTop: 8 }}
                  content={({ payload }) => (
                    <div className="flex flex-wrap items-center gap-3">
                      {(payload || []).map((entry: any) => {
                        const id = entry.dataKey as string
                        const isSelected = selectedPlayerId === id
                        const isDimmed = selectedPlayerId && !isSelected
                        return (
                          <button
                            type="button"
                            key={id}
                            onClick={() => setSelectedPlayerId(isSelected ? null : id)}
                            className={cn(
                              "flex items-center gap-1 text-xs font-semibold transition-opacity max-w-[160px]",
                              isDimmed && "opacity-40",
                            )}
                            style={{ color: entry.color }}
                            title={String(entry.value)}
                          >
                            <span
                              className="inline-block h-2.5 w-2.5 rounded-full border"
                              style={{ borderColor: entry.color }}
                            />
                            <span className="truncate">{entry.value}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                />
                {chartPlayers.map((player, index) => {
                  const isSelected = selectedPlayerId === player.odIndex
                  const isDimmed = selectedPlayerId && !isSelected
                  const stroke = chartColors[index % chartColors.length]
                  return (
                    <Line
                      key={player.odIndex}
                      type="linear"
                      dataKey={player.odIndex}
                      name={player.name}
                      stroke={stroke}
                      strokeWidth={isSelected ? 3 : 2}
                      dot={false}
                      strokeOpacity={isDimmed ? 0.2 : 1}
                      connectNulls
                    />
                  )
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-4">まだ対局がありません</p>
        )}
      </CardContent>
    </Card>
  )
}
