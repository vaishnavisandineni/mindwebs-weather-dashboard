'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import AnalyticsChart from '@/components/ui/linechart'
import AnalyticsSection from '@/components/ui/AnalyticsSection'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'

// Lazy load MapView client-side only
const MapView = dynamic(() => import('@/components/ui/MapView'), { ssr: false })

const timeUnitToHours = {
  Day: 24,
  Week: 7 * 24,
  Month: 30 * 24,
}

const dayRanges = [
  { start: 'Jul 18', end: 'Jul 24', range: [0, 6] },
  { start: 'Jul 25', end: 'Jul 31', range: [7, 13] },
  { start: 'Aug 1', end: 'Aug 7', range: [14, 20] },
]

function getDateRangeLabel(step: number): string {
  for (const item of dayRanges) {
    if (step >= item.range[0] && step <= item.range[1]) {
      return `${item.start} – ${item.end}`
    }
  }
  return 'Custom Range'
}

type WeatherData = {
  time: string[]
  temperature_2m: number[]
}

export default function Dashboard() {
  const [range, setRange] = useState([0])
  const [isRange, setIsRange] = useState(false)
  const [playing, setPlaying] = useState(false)
  const timeUnitOptions = ['Day', 'Week', 'Month'] as const
  type TimeUnit = typeof timeUnitOptions[number]
  const [unit, setUnit] = useState<TimeUnit>('Day')
  const [maxRange, setMaxRange] = useState(timeUnitToHours[unit])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  useEffect(() => {
    const hours = timeUnitToHours[unit]
    setMaxRange(hours)
    setRange([0])
    setPlaying(false)
  }, [unit])

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setRange(prev => {
          const next = prev[0] + 1
          if (next >= maxRange) {
            clearInterval(intervalRef.current!)
            setPlaying(false)
            return [maxRange]
          }
          return [next]
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current!)
    }
    return () => clearInterval(intervalRef.current!)
  }, [playing, maxRange])

  useEffect(() => {
    fetch('https://archive-api.open-meteo.com/v1/archive?latitude=17.385&longitude=78.4867&start_date=2025-07-18&end_date=2025-08-01&hourly=temperature_2m')
      .then(res => res.json())
      .then(data => {
        if (data?.hourly?.temperature_2m && data?.hourly?.time) {
          setWeatherData(data.hourly)
        }
      })
      .catch(err => console.error('Failed to fetch weather data', err))
  }, [])

  const generateMockData = (step: number) => [
    { title: 'Avg. Temperature', value: `${(25 + step * 0.2).toFixed(1)}°C`, icon: '🌡️' },
    { title: 'Humidity', value: `${(60 + step).toFixed(0)}%`, icon: '💧' },
    { title: 'Wind Speed', value: `${(5 + step * 0.1).toFixed(1)} km/h`, icon: '🌬️' },
    { title: 'Precipitation', value: `${(2 + step * 0.05).toFixed(1)} mm`, icon: '🌧️' },
    { title: 'Sunlight Hours', value: `${(8 + step * 0.1).toFixed(1)} hrs`, icon: '☀️' },
  ]

  const metricData = generateMockData(range[0])
  const currentDateRange = unit === 'Day' ? getDateRangeLabel(range[0]) : 'Jul 18 – Aug 1'

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-6 space-y-8">
<h1 className="text-3xl font-bold text-white mb-2">
  🌦️ Weather Trends – MindWebs Dashboard
</h1>
<p className="text-sm text-slate-400 mb-6">
  Built by Vaishnavi Sandineni </p>
   <p>[vaishnavisandineni@gmail.com]</p>

      {/* Time Unit Selector */}
      <div className="flex gap-2">
        {timeUnitOptions.map(u => (
          <Button key={u} variant={unit === u ? 'default' : 'ghost'} onClick={() => setUnit(u)}>
            {u}
          </Button>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-[#1e293b] p-6 rounded-xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-medium">🗓️ {unit} View • {currentDateRange}</div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => setRange([0])}>⏮️</Button>
            <Button variant="default" onClick={() => setPlaying(p => !p)}>
              {playing ? '⏸️' : '▶️'}
            </Button>
            <Button variant="ghost" onClick={() => setRange([maxRange])}>⏭️</Button>
            <span className="text-sm text-gray-300">{playing ? 'Playing' : 'Paused'}</span>
          </div>
        </div>

        <Slider value={range} onValueChange={setRange} max={maxRange} className="w-full" />

        <div className="flex items-center gap-2">
          <span className="text-sm">Single Point</span>
          <Switch checked={isRange} onCheckedChange={setIsRange} />
          <span className="text-sm">Range</span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {metricData.map(item => (
          <Card key={item.title} className="bg-[#1e293b] border-none">
            <CardContent className="p-4">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-sm text-gray-400">{item.title}</div>
              <div className="text-xl font-bold">{item.value}</div>
              <div className="text-xs text-gray-500">Auto-updates while playing</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interactive Map */}
      <div className="bg-[#1e293b] p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">🗺️ Geo Analytics</h2>
        <MapView range={range} unit={unit} weatherData={weatherData} />
      </div>

      {/* Line Chart */}
      <AnalyticsChart />

      {/* Additional Sections */}
      <AnalyticsSection />
    </main>
  )
}
