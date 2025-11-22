"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"

import HeartImage from "@/assets/heart.png"

const Footer = () => {
  const pathname = usePathname()
  const year = new Date().getFullYear()

  return (
    <footer
      className={`${
        pathname === "/" ? "mt-20" : "mt-36"
      } bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-100 py-8`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-white dark:text-zinc-900 text-lg flex items-center justify-center gap-2 flex-wrap">
          Made with
          <span className="inline-block hover:scale-125 transition-transform duration-200">
            <Image
              src={HeartImage}
              width={28}
              height={28}
              alt="heart"
              className="animate-pulse"
            />
          </span>
          by
          <span className="font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            Mahmoud
          </span>
          <span className="text-zinc-400 dark:text-zinc-600">© {year}</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
