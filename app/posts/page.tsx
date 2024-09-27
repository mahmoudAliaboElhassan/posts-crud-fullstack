import React from "react";
import PostsTable from "@/components/posts/postsTable";
import PaginationBasic from "@/components/pagination";
import PagesPagination from "@/components/pagination";

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
