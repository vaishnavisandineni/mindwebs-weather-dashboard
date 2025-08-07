'use client'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'

// Register required chart elements
ChartJS.register(ArcElement, Tooltip, Legend)

const data = {
  labels: ['Rain', 'Snow', 'Hail'],
  datasets: [
    {
      data: [60, 30, 10], // Example values
      backgroundColor: ['#3b82f6', '#e5e7eb', '#f59e0b'], // blue, grey, amber
      borderWidth: 1,
    }
  ]
}

const options: ChartOptions<'pie'> = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' }
  }
}

export default function PrecipitationBreakdownPie() {
  return <Pie data={data} options={options} />
}

