'use client'

import { motion } from 'framer-motion'

interface PhoenixLogoProps {
  size?: number
  animated?: boolean
}

export default function PhoenixLogo({ size = 60, animated = false }: PhoenixLogoProps) {
  return (
    <motion.div
      className="relative"
      initial={animated ? { y: 100, opacity: 0, scale: 0.8 } : {}}
      animate={animated ? { y: 0, opacity: 1, scale: 1 } : {}}
      transition={animated ? { duration: 2, ease: 'easeOut' } : {}}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="phoenix-glow"
      >
        {/* Phoenix body */}
        <motion.path
          d="M50 10 C30 20, 20 40, 20 60 C20 75, 30 85, 50 90 C70 85, 80 75, 80 60 C80 40, 70 20, 50 10Z"
          fill="url(#phoenixGradient)"
          animate={animated ? {
            scale: [1, 1.05, 1],
          } : {}}
          transition={animated ? {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          } : {}}
        />
        
        {/* Wings */}
        <motion.path
          d="M20 50 C10 45, 5 40, 10 35 C15 30, 20 35, 25 40"
          stroke="url(#wingGradient)"
          strokeWidth="3"
          fill="none"
          animate={animated ? {
            strokeWidth: [3, 5, 3],
            opacity: [0.7, 1, 0.7],
          } : {}}
          transition={animated ? {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          } : {}}
        />
        <motion.path
          d="M80 50 C90 45, 95 40, 90 35 C85 30, 80 35, 75 40"
          stroke="url(#wingGradient)"
          strokeWidth="3"
          fill="none"
          animate={animated ? {
            strokeWidth: [3, 5, 3],
            opacity: [0.7, 1, 0.7],
          } : {}}
          transition={animated ? {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.2,
          } : {}}
        />

        {/* Flames */}
        <motion.path
          d="M50 85 L45 95 L50 90 L55 95 Z"
          fill="#fb923c"
          animate={animated ? {
            scaleY: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          } : {}}
          transition={animated ? {
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
          } : {}}
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="phoenixGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fdba74" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}
