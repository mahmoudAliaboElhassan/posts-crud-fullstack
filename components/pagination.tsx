"use client";
import { POSTS_PER_PAGE } from "@/utils/constants";
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "react-bootstrap/Pagination";

interface Props {
  count: number;
  search: string;
}

function PagesPagination({ count, search }: Props) {
  const countOfPosts = Math.ceil(count / POSTS_PER_PAGE);

  let items: any[] = [];
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(searchParams.get("pageNumber") || "1");

  const handlePageClick = (number: number): any => {
    router.push(`/posts?pageNumber=${number}&searchText=${search}`);
  };

  for (let number = 1; number <= countOfPosts; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageClick(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination style={{ width: "fit-content", margin: "auto" }}>
      {items}
    </Pagination>
  );
}

export default PagesPagination;
