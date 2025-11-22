"use client"

import React from "react"
import { useFormikContext } from "formik"

interface Props {
  children: React.ReactNode
  loading: boolean
  variant?: "primary" | "secondary" | "danger"
  fullWidth?: boolean
}

const ButtonWrapper = ({
  children,
  loading,
  variant = "primary",
  fullWidth = true,
}: Props) => {
  const { submitForm } = useFormikContext()

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    submitForm()
  }

  const baseStyles = `
    relative px-6 py-3 rounded-lg font-semibold
    transition-all duration-200
    disabled:opacity-60 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
    ${fullWidth ? "w-full" : ""}
  `

  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 to-purple-600
      hover:from-blue-700 hover:to-purple-700
      text-white shadow-lg shadow-blue-500/25
      hover:shadow-xl hover:shadow-blue-500/30
      hover:-translate-y-0.5
      active:translate-y-0
    `,
    secondary: `
      bg-zinc-200 dark:bg-zinc-700
      hover:bg-zinc-300 dark:hover:bg-zinc-600
      text-zinc-900 dark:text-zinc-100
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-pink-600
      hover:from-red-700 hover:to-pink-700
      text-white shadow-lg shadow-red-500/25
      hover:shadow-xl hover:shadow-red-500/30
      hover:-translate-y-0.5
      active:translate-y-0
    `,
  }

  return (
    <button
      type="submit"
      disabled={loading}
      onClick={handleSubmit}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {loading ? (
        <>
          {/* Spinner */}
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Please wait...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default ButtonWrapper
