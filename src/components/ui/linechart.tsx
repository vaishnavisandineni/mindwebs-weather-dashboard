"use client"

import React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const data = [
  { date: "Aug 1", temperature: 28.5, precipitation: 2.4 },
  { date: "Aug 2", temperature: 30.1, precipitation: 1.2 },
  { date: "Aug 3", temperature: 31.8, precipitation: 0 },
  { date: "Aug 4", temperature: 29.2, precipitation: 3.1 },
  { date: "Aug 5", temperature: 27.4, precipitation: 5.0 }
]

export default function AnalyticsChart() {
  return (
    <div className="bg-[#1e293b] rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">📈  Temperature & Precipitation Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#334155" />
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line type="monotone" dataKey="temperature" stroke="#38bdf8" />
          <Line type="monotone" dataKey="precipitation" stroke="#facc15" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
