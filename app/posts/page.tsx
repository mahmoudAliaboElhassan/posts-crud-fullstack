import React from "react"

import { Metadata } from "next"
import { cookies } from "next/headers"

import PostsTable from "@/components/posts/postsTable"
import { verifyTokenForPage } from "@/utils/verifyToken"

export const metadata: Metadata = {
  title: "All Posts - Posts CRUD",
  description: "Browse and explore all posts with easy pagination on MyApp.",
}
interface ArticlePageNumber {
  searchParams: {
    pageNumber?: string
    searchText?: string
  }
}
function AllPosts({ searchParams }: ArticlePageNumber) {
  const pageNumber = searchParams.pageNumber || "1"
  const searchText = searchParams.searchText || ""
  const cookie = cookies().get("jwtToken")?.value || ""
  const jwtPayload = verifyTokenForPage(cookie)
  return (
    <div>
      <PostsTable
        pageNumber={pageNumber}
        searchText={searchText}
        jwtPayload={jwtPayload}
      />
    </div>
  )
}

export default AllPosts
