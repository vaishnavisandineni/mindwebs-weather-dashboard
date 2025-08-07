'use client'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import type { ChartOptions } from 'chart.js'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

const data = {
  labels: ['Jul 8', 'Jul 15', 'Jul 22', 'Jul 29', 'Aug 5'],
  datasets: [
    {
      label: 'Precipitation (mm)',
      data: [12, 5, 20, 8, 15],
      fill: false,
      borderColor: '#3b82f6', // blue for precipitation
      tension: 0.4,
    }
  ]
}

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: { legend: { display: true } },
  scales: {
    y: {
      ticks: {
        callback: (v: any) => `${v} mm`
      }
    }
  }
}

export default function PrecipitationTrendChart() {
  return <Line data={data} options={options} />
}
