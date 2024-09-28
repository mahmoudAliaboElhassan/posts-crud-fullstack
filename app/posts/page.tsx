import React from "react";

import { Metadata } from "next";

import PostsTable from "@/components/posts/postsTable";
import PaginationBasic from "@/components/pagination";
import PagesPagination from "@/components/pagination";

export const metadata: Metadata = {
  title: "All Posts - Posts CRUD",
  description: "Browse and explore all posts with easy pagination on MyApp.",
};
interface ArticlePageNumber {
  searchParams: {
    pageNumber?: string; // `pageNumber` is optional and may be undefined
  };
}
function AllPosts({ searchParams }: ArticlePageNumber) {
  const pageNumber = searchParams.pageNumber || "1";

  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <PostsTable pageNumber={pageNumber} />
    </div>
  );
}

export default AllPosts;
