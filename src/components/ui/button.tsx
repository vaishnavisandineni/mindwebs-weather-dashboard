import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  const baseStyles = 'px-4 py-2 rounded font-medium transition-colors'
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    ghost: 'bg-transparent text-white border border-white hover:bg-white hover:text-blue-600'
  }

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
}

