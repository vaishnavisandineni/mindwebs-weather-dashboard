"use client"

import React from "react"

interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  min?: number
  max?: number
  className?: string
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  className = ""
}) => {
  return (
    <input
      type="range"
      className={`w-full ${className}`}
      value={value[0]}
      onChange={(e) => onValueChange([Number(e.target.value)])}
      min={min}
      max={max}
    />
  )
}
