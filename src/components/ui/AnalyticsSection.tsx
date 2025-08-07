'use client'
import React from 'react'
import PrecipitationTrendChart from './charts/precipitationtrendchart'
import PrecipitationBreakdownPie from './charts/precipitationbreakdownpie'
import TemperatureTrendChart from './charts/temperaturetrendchart'

const AnalyticsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
      
      <div className="bg-[#1e293b] p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">🌧️ Precipitation Over Time</h2>
        <PrecipitationTrendChart />
      </div>

      <div className="bg-[#1e293b] p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">💧 Precipitation Breakdown</h2>
        <PrecipitationBreakdownPie />
      </div>

      <div className="bg-[#1e293b] p-4 rounded-xl shadow-sm col-span-1 xl:col-span-2">
        <h2 className="text-lg font-semibold mb-4">🌡️ Temperature Trends</h2>
        <TemperatureTrendChart />
      </div>

    </div>
  )
}

export default AnalyticsSection
