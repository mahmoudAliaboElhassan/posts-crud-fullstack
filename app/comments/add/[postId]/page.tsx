import React from "react";
import AddCommentForm from "@/components/comments/addComment";
import { Metadata } from "next";
import axiosInstance from "@/utils/axiosInstance";
import { notFound } from "next/navigation";

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

async function AddComment({ params }: Props) {
  console.log("post postId from server", params.postId);
  try {
    const post = await axiosInstance.get(`/api/posts/${params.postId}`);
  } catch (error: any) {
    if (error.status === 404) {
      notFound();
    }
  }

  return (
    <>
      <div>AddComment</div>
      <AddCommentForm postId={parseInt(params.postId)} />
    </>
  );
}

export default AddComment;
