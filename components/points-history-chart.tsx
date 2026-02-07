"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

type PointsHistory = Array<{
  game: number
  points: number
  date: string
}>

type PointsHistoryChartProps = {
  data: PointsHistory
  stroke: string
}

export function PointsHistoryChart({ data, stroke }: PointsHistoryChartProps) {
  return (
    <ResponsiveContainer width="100%" height={205}>
      <LineChart data={data} margin={{ top: 6, right: 10, bottom: 6, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
        <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
          formatter={(value: any) => [`${value >= 0 ? "+" : ""}${value}pt`, "累計pt"]}
        />
        <Line
          type="linear"
          dataKey="points"
          stroke={stroke}
          strokeWidth={2}
          dot={{ r: 4, fill: stroke, strokeWidth: 0 }}
          activeDot={{ r: 6, fill: stroke }}
          connectNulls
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
