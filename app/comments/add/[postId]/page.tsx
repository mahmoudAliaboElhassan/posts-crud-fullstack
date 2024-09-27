import React from "react";
import AddCommentForm from "@/components/comments/addComment";
import { Metadata } from "next";

interface Props {
  params: {
    postId: string;
  };
}
export const metadata: Metadata = {
  title: "Add Comment - Posts CRUD",
  description:
    "Join the conversation by adding your thoughts and feedback to the post.",
};

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
