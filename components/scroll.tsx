"use client"

import React, { useEffect, useState } from "react"
import { FaArrowUp } from "react-icons/fa"

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide button
      setShowButton(window.scrollY > 100)

      // Calculate scroll progress
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / scrollHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // SVG circle properties
  const size = 48
  const strokeWidth = 3
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (scrollProgress / 100) * circumference

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed right-5 z-50 
        w-12 h-12
        flex items-center justify-center
        transition-all duration-500 ease-out
        hover:scale-110
        active:scale-95
        group
        ${
          showButton
            ? "bottom-5 opacity-100 translate-y-0"
            : "bottom-5 opacity-0 translate-y-16 pointer-events-none"
        }
      `}
    >
      {/* Progress Ring */}
      <svg
        className="absolute inset-0 -rotate-90 transition-transform duration-300 group-hover:rotate-0"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-zinc-200 dark:text-zinc-700"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-150"
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background fill */}
      <div className="absolute inset-1 rounded-full bg-white dark:bg-zinc-800 shadow-lg" />

      {/* Icon */}
      <FaArrowUp
        size={18}
        className="relative z-10 text-zinc-700 dark:text-zinc-200 transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </button>
  )
}

export default ScrollToTopButton
