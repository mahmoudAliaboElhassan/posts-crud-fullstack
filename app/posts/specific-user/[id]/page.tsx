import React from "react"

import { Metadata } from "next"
import { notFound } from "next/navigation"

import SpecificUserPostsComponent from "@/components/posts/specificUserPosts"
import axiosInstance from "@/utils/axiosInstance"

interface Props {
  params: {
    id: string
  }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const res = await axiosInstance.get(`/api/posts/specifc-user/${params.id}`)
    console.log("res.data.username")
    console.log(res.data.username)
    return {
      title: `${res.data.username} Posts`,
      description: "getting specified user posts",
    }
  } catch (error) {
    notFound()
  }
}
function SpecificUserPosts({ params }: Props) {
  return (
    <div>
      <SpecificUserPostsComponent id={params.id} />
    </div>
  )
}

export default SpecificUserPosts
