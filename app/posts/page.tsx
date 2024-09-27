import React from "react";

import { Metadata } from "next";

import PostsTable from "@/components/posts/postsTable";
import PaginationBasic from "@/components/pagination";
import PagesPagination from "@/components/pagination";

export const metadata: Metadata = {
  title: "All Posts - Posts CRUD",
  description: "Browse and explore all posts with easy pagination on MyApp.",
};

function AllPosts() {
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <PostsTable />
      <PagesPagination pageNumber={"3"} />
    </div>
  );
}

export default AllPosts;
