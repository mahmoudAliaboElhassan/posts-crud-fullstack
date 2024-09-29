import React from "react";

import { Metadata } from "next";

import PostsTable from "@/components/posts/postsTable";

export const metadata: Metadata = {
  title: "All Posts - Posts CRUD",
  description: "Browse and explore all posts with easy pagination on MyApp.",
};
interface ArticlePageNumber {
  searchParams: {
    pageNumber?: string;
  };
}
function AllPosts({ searchParams }: ArticlePageNumber) {
  const pageNumber = searchParams.pageNumber || "1";

  return (
    <div>
      <PostsTable pageNumber={pageNumber} />
    </div>
  );
}

export default AllPosts;
