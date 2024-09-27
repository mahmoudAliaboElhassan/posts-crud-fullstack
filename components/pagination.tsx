"use client";
import Link from "next/link";
import Pagination from "react-bootstrap/Pagination";

interface Props {
  pageNumber: string;
}

function PagesPagination({ pageNumber }: Props) {
  let active = 2;
  let items: any[] = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item active={number === parseInt(pageNumber)}>
        {/* <Link key={number} href={`/posts?pageNumber=${number}`} passHref> */}
        {number}
        {/* </Link> */}
      </Pagination.Item>
    );
  }
  return (
    <div>
      <Pagination>{items}</Pagination>
      <br />
    </div>
  );
}

export default PagesPagination;
