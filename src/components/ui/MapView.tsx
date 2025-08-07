'use client'

import { useEffect, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Polygon,
  Popup,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

//  Import type if needed
// Adjust the import path if you have defined WeatherData in a types file
// import { WeatherData } from '@/types'

const getColor = (temp: number) =>
  temp < 10 ? 'red' : temp < 25 ? 'blue' : 'green'

interface MapViewProps {
  range: number[] // Slider range [start, end]
  unit: 'Day' | 'Week' | 'Month'
  //  Add this only if you're planning to pass it from parent
  // weatherData: WeatherData | null
}

export default function MapView({ range, unit }: MapViewProps) {
  const [polygons, setPolygons] = useState<any[]>([])
  const [weatherData, setWeatherData] = useState<number[]>([])

  const lat = 17.385
  const lon = 78.4867

  // Utility to get date from today by offset
  const getDateFromToday = (offset: number) => {
    if (typeof offset !== 'number' || isNaN(offset)) offset = 0
    const d = new Date()
    d.setDate(d.getDate() + offset)
    return d.toISOString().split('T')[0]
  }

  const startDate = getDateFromToday(range?.[0] ?? 0)
  const endDate = getDateFromToday(range?.[1] ?? 0)

  // Fetch weather data using Open-Meteo API
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&hourly=temperature_2m`
        )
        const data = await res.json()
        setWeatherData(data?.hourly?.temperature_2m ?? [])
      } catch (err) {
        console.error('Weather fetch failed:', err)
      }
    }

    fetchWeather()
  }, [startDate, endDate])

  //  Handle polygon drawing and temperature
  function DrawHandler() {
    useMapEvents({
      click() {
        const avgTemp =
          weatherData.reduce((sum, val) => sum + val, 0) / weatherData.length || 0

        const triangle = [
          [lat, lon],
          [lat + 0.02, lon + 0.04],
          [lat - 0.02, lon + 0.04],
        ]

        setPolygons((prev) => [
          ...prev,
          {
            coords: triangle,
            avgTemp: parseFloat(avgTemp.toFixed(1)),
          },
        ])
      },
    })

    return null
  }

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border border-gray-700">
      <MapContainer
        center={[lat, lon]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        <DrawHandler />

        {polygons.map((poly, i) => (
          <Polygon
            key={i}
            positions={poly.coords}
            pathOptions={{
              fillColor: getColor(poly.avgTemp),
              color: getColor(poly.avgTemp),
              fillOpacity: 0.5,
              weight: 2,
            }}
          >
            <Popup>
              <strong>Avg. Temperature:</strong> {poly.avgTemp}°C
            </Popup>
          </Polygon>
        ))}
      </MapContainer>
    </div>
  )
}
