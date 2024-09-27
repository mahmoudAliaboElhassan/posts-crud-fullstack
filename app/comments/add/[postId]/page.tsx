import React from "react";
import AddCommentForm from "@/components/comments/addComment";

interface Props {
  params: {
    postId: string;
  };
}

function AddComment({ params }: Props) {
  console.log("post postId from server", params.postId);
  return (
    <>
      <div>AddComment</div>
      <AddCommentForm postId={parseInt(params.postId)} />
    </>
  );
}

export default AddComment;
