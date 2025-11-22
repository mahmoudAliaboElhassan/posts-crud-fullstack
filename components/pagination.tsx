"use client"

import { POSTS_PER_PAGE } from "@/utils/constants"
import { useSearchParams, useRouter } from "next/navigation"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

interface Props {
  count: number
  search: string
}

function PagesPagination({ count, search }: Props) {
  const countOfPages = Math.ceil(count / POSTS_PER_PAGE)
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentPage = parseInt(searchParams.get("pageNumber") || "1")

  const handlePageClick = (number: number) => {
    router.push(`/posts?pageNumber=${number}&searchText=${search}`)
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < countOfPages) {
      handlePageClick(currentPage + 1)
    }
  }

  // Don't show pagination if there's only one page or no pages
  if (countOfPages <= 1) return null

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5 // Maximum number of page buttons to show

    if (countOfPages <= maxVisible) {
      // Show all pages if total is less than max
      for (let i = 1; i <= countOfPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push("...")
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(countOfPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < countOfPages - 2) {
        pages.push("...")
      }

      // Always show last page
      pages.push(countOfPages)
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        <FaChevronLeft className="text-sm" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-zinc-500 dark:text-zinc-400"
            >
              ...
            </span>
          )
        }

        const pageNumber = page as number
        const isActive = pageNumber === currentPage

        return (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={`min-w-[44px] px-4 py-2 rounded-lg font-medium transition-all ${
              isActive
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                : "bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-700"
            }`}
          >
            {pageNumber}
          </button>
        )
      })}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === countOfPages}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        <span className="hidden sm:inline">Next</span>
        <FaChevronRight className="text-sm" />
      </button>
    </div>
  )
}

export default PagesPagination
