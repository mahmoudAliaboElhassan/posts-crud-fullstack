import PostData from "@/components/posts/postData";
import axiosInstance from "@/utils/axiosInstance";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Metadata } from "next";
import { cookies } from "next/headers";
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
    console.log(res);
    return {
      title: res.data.title,
      description: res.data.description,
    };
  } catch (error) {
    notFound();
  }
}

function Post({ params }: Props) {
  const cookie = cookies().get("jwtToken")?.value || "";
  const jwtPayload = verifyTokenForPage(cookie);
  return (
    <>
      <PostData postId={params.id} jwtPayload={jwtPayload} />
    </>
  );
}

export default Post;
