"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { FaSearch } from "react-icons/fa"
import { X } from "lucide-react"

interface Props {
  searchVal: string
}

function Search({ searchVal }: Props) {
  const [searchValue, setSearchValue] = useState<string>(searchVal)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)

    if (value === "") {
      router.push(`?pageNumber=1&searchText=${value}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleClickSearch()
    }
  }

  const handleClickSearch = () => {
    router.push(`?pageNumber=1&searchText=${searchValue}`)
  }
  const handleClear = () => {
    setSearchValue("")
    router.push(`?pageNumber=1&searchText=`)
  }
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for posts..."
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full px-6 py-4 pr-28 text-lg bg-white dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-600 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors shadow-lg"
        />
        {searchValue && (
          <button
            onClick={handleClear}
            className="absolute right-16 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={handleClickSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          aria-label="Search"
        >
          <FaSearch className="text-xl" />
        </button>
      </div>
    </div>
  )
}

export default Search
