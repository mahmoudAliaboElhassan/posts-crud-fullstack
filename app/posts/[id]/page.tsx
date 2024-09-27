import PostData from "@/components/posts/postData";
import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";

interface Props {
  params: {
    id: string;
  };
}
function Post({ params }: Props) {
  return (
    <>
      <div> Post Data</div>;
      <PostData postId={params.id} />
    </>
  );
}

export default Post;
