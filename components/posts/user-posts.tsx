"use client";

import axiosInstance from "@/utils/axiosInstance";
import { SinglePost } from "@/utils/types";
import { Metadata } from "next";
import React, { useEffect, useState } from "react";
import LoadingFetching from "../loadingData";

export const metadata: Metadata = {
  title: "User Posts - Posts CRUD",
  description: "View and manage all posts created by the user on Posts CRUD.",
};

function UserPosts() {
  const [userPosts, setUserPosts] = useState<SinglePost[]>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getUserPosts = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/api/posts/user");
        setUserPosts(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getUserPosts();
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingFetching>Wait for your Posts to Load ...</LoadingFetching>
      ) : (
        <div style={{ minHeight: "100vh" }}>
          {userPosts?.map((userPost) => (
            <div>
              <div>{userPost.title}</div>
              <div>{userPost.description}</div>
              <div>
                {userPost.comments.map((userComment) => (
                  <>
                    <div>{userComment?.text}</div>
                    <div>{userComment?.user?.username}</div>
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserPosts;
