import PostData from "@/components/posts/postData";
import axiosInstance from "@/utils/axiosInstance";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { Button } from "react-bootstrap";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const res = await axiosInstance.get(`/api/posts/${params.id}`);

    return {
      title: res.data.title,
      description: res.data.description,
    };
  } catch (error) {
    notFound();
  }
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
