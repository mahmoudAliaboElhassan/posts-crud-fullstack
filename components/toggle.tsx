"use client"

import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { IoMdSunny, IoMdMoon } from "react-icons/io"

function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative flex items-center justify-center w-10 h-10 rounded-full 
                 bg-white/10 dark:bg-black/10 
                 hover:bg-white/20 dark:hover:bg-black/20 
                 transition-all duration-300 
                 hover:scale-110 active:scale-95
                 hover:rotate-12"
    >
      <span
        className={`absolute transition-all duration-300 ${
          isDark ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
        }`}
      >
        <IoMdSunny size={22} className="text-yellow-400" />
      </span>
      <span
        className={`absolute transition-all duration-300 ${
          isDark ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
        }`}
      >
        <IoMdMoon size={20} className="text-white dark:text-zinc-900" />
      </span>
    </button>
  )
}

export default ModeToggle
