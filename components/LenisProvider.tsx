"use client"

import { useEffect } from "react"
import { initSmoothScroll } from "@/app/utils/smoothScroll"

export default function LenisProvider() {
  useEffect(() => {
    const lenis = initSmoothScroll()
    ;(window as any).lenis = lenis
    console.log("Lenis initialized and assigned to window.lenis", window.lenis)
  }, [])

  return null
}
