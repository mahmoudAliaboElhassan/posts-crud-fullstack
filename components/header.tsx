"use client"

import React, { useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Swal from "sweetalert2"
import toast from "react-hot-toast"
import "@fontsource/montez"

import { JWTPayload } from "@/utils/types"
import { FaUserCircle } from "react-icons/fa"
import { HiMenu, HiX } from "react-icons/hi"
import UseHeaderElements from "@/hooks/use-header-elements"
import axiosInstance from "@/utils/axiosInstance"
import ModeToggle from "./toggle"

interface Props {
  payload: JWTPayload | null
}

const Header = ({ payload }: Props) => {
  const { headerElementsUser, headerElementNotUser } = UseHeaderElements()
  const headerElements = payload ? headerElementsUser : headerElementNotUser
  const pathname = usePathname()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogOut = async () => {
    setLoading(true)
    try {
      await axiosInstance.get("/api/users/logout")
      toast.success("You have logged out successfully!")
      router.push("/")
      router.refresh()
      closeMenus()
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Logout failed",
        icon: "error",
        confirmButtonText: "OK",
      })
    } finally {
      setLoading(false)
    }
  }

  const closeMenus = () => {
    setMobileMenuOpen(false)
    setDropdownOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              onClick={closeMenus}
              className="font-montez text-3xl text-white dark:text-zinc-900 hover:scale-105 transition-transform duration-200"
              style={{ fontFamily: "Montez, cursive" }}
            >
              Posts CRUD
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {headerElements.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 rounded-lg text-white dark:text-zinc-900 transition-all duration-200 hover:bg-white/10 dark:hover:bg-black/10 ${
                    pathname === href
                      ? "font-bold bg-white/20 dark:bg-black/20"
                      : ""
                  }`}
                >
                  {label}
                </Link>
              ))}

              {/* Theme Toggle */}
              <div className="ml-2">
                <ModeToggle />
              </div>

              {/* User Dropdown */}
              <div className="relative ml-2" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="p-2 rounded-full text-white dark:text-zinc-900 hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-200 hover:scale-110"
                >
                  <FaUserCircle size={26} />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden transition-all duration-200 origin-top-right ${
                    dropdownOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {payload ? (
                    <>
                      <Link
                        href="/change-password"
                        onClick={closeMenus}
                        className="block px-4 py-3 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                      >
                        Change Password
                      </Link>
                      <hr className="border-zinc-200 dark:border-zinc-700" />
                      <button
                        onClick={handleLogOut}
                        disabled={loading}
                        className="w-full text-left px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                      >
                        {loading ? "Logging out..." : "Logout"}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={closeMenus}
                        className="block px-4 py-3 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                      >
                        Login
                      </Link>
                      <hr className="border-zinc-200 dark:border-zinc-700" />
                      <Link
                        href="/signup"
                        onClick={closeMenus}
                        className="block px-4 py-3 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white dark:text-zinc-900 hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
            >
              {mobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="px-4 pb-6 pt-2 space-y-1 bg-zinc-800/50 dark:bg-zinc-300/50 backdrop-blur-sm">
            {headerElements.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenus}
                className={`block px-4 py-3 rounded-lg text-white dark:text-zinc-900 transition-all duration-200 hover:bg-white/10 dark:hover:bg-black/10 ${
                  pathname === href
                    ? "font-bold bg-white/20 dark:bg-black/20"
                    : ""
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Theme Toggle */}
            <div className="flex items-center gap-3 px-4 py-3">
              <span className="text-white/70 dark:text-zinc-900/70 text-sm">
                Theme
              </span>
              <ModeToggle />
            </div>

            <hr className="border-white/20 dark:border-black/20 my-2" />

            {/* Auth Links */}
            {payload ? (
              <>
                <Link
                  href="/change-password"
                  onClick={closeMenus}
                  className="block px-4 py-3 rounded-lg text-white dark:text-zinc-900 hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
                >
                  Change Password
                </Link>
                <button
                  onClick={handleLogOut}
                  disabled={loading}
                  className="w-full text-left px-4 py-3 rounded-lg text-red-400 dark:text-red-600 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                >
                  {loading ? "Logging out..." : "Logout"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="block px-4 py-3 rounded-lg text-white dark:text-zinc-900 hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMenus}
                  className="block px-4 py-3 rounded-lg text-white dark:text-zinc-900 hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  )
}

export default Header
