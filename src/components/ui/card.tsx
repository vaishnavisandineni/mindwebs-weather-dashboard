// src/components/ui/card.tsx
import React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`rounded-xl border border-gray-700 bg-[#1e293b] p-4 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = "" }) => {
  return (
    <div className={`mt-2 ${className}`}>
      {children}
    </div>
  )
}



