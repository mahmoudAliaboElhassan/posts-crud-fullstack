"use client"

import React, { useState } from "react"
import { useField } from "formik"
import { FaEye, FaEyeSlash } from "react-icons/fa"

interface Props {
  name: string
  type?: string
  label: string
  icon?: React.ReactNode
  placeholder?: string
}

const TextFieldWrapper = ({
  name,
  type = "text",
  label,
  icon,
  placeholder,
}: Props) => {
  const [field, meta] = useField(name)
  const [showPassword, setShowPassword] = useState(false)

  const hasError = meta.touched && meta.error
  const isPassword = type === "password"
  const inputType = isPassword ? (showPassword ? "text" : "password") : type

  return (
    <div className="space-y-2">
      {/* Label */}
      <label
        htmlFor={name}
        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </label>

      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
            {icon}
          </div>
        )}

        {/* Input Field */}
        <input
          id={name}
          type={inputType}
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          {...field}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-zinc-50 dark:bg-zinc-900
            border-2 transition-all duration-200
            text-zinc-900 dark:text-zinc-100
            placeholder:text-zinc-400 dark:placeholder:text-zinc-600
            focus:outline-none focus:ring-0
            ${icon ? "pl-10" : ""}
            ${isPassword ? "pr-12" : ""}
            ${
              hasError
                ? "border-red-500 focus:border-red-500 bg-red-50 dark:bg-red-900/10"
                : "border-zinc-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-400"
            }
          `}
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <p
          id={`${name}-error`}
          className="text-red-500 text-sm flex items-center gap-1 animate-shake"
        >
          <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
          {meta.error}
        </p>
      )}
    </div>
  )
}

export default TextFieldWrapper
