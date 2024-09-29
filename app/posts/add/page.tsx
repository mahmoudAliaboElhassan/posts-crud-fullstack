import AddPostForm from "@/components/posts/addPost";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add New Post - Posts CRUD",
  description:
    "Create and share your new post with the community on Posts CRUD.",
};
function AddPost() {
  return (
    <>
      <AddPostForm />
    </>
  );
}

export default AddPost;
