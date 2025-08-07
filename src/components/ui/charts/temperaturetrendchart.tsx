'use client'
import { Line } from 'react-chartjs-2'

const data = {
  labels: ['Jul 18', 'Jul 21', 'Jul 24', 'Jul 27', 'Jul 30'],
  datasets: [
    {
      label: 'Max Temperature (°C)',
      data: [34, 36, 35, 33, 32],
      borderColor: '#ef4444', // red
      tension: 0.4,
    },
    {
      label: 'Min Temperature (°C)',
      data: [24, 23, 25, 22, 21],
      borderColor: '#3b82f6', // blue
      tension: 0.4,
    }
  ]
}

const options = {
  responsive: true,
  plugins: { legend: { position: 'bottom' as const } },
  scales: {
    y: {
      ticks: {
        callback: function (tickValue: string | number) {
          return `${tickValue}°C`
        }
      }
    }
  }
}

export default function TemperatureTrendChart() {
  return <Line data={data} options={options} />
}
