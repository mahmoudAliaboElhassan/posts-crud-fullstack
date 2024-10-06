import UserPosts from "@/components/posts/user-posts";
import { Metadata } from "next";
import React, { useEffect } from "react";

export const metadata: Metadata = {
  title: "User Posts - Posts CRUD",
  description: "View and manage all posts created by the user on Posts CRUD.",
};

function UserPostsPage() {
  return <UserPosts />;
}

export default UserPostsPage;
