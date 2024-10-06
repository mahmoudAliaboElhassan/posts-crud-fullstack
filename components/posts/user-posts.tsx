"use client";
import React, { useEffect, useState } from "react";

import { Metadata } from "next";
import { motion } from "framer-motion";
import Link from "next/link";

import axiosInstance from "@/utils/axiosInstance";
import { SinglePost } from "@/utils/types";
import LoadingFetching from "../loadingData";
import styles from "./user-posts.module.css";
import HeadingText from "./heading";
import NoCount from "./noCount";

export const metadata: Metadata = {
  title: "User Posts - Posts CRUD",
  description: "View and manage all posts created by the user on Posts CRUD.",
};

function UserPosts() {
  const [userPosts, setUserPosts] = useState<SinglePost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [active, setActive] = useState<number>(0);
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
    <div style={{ minHeight: "94vh" }}>
      {loading ? (
        <LoadingFetching>Wait for your Posts to Load ...</LoadingFetching>
      ) : (
        <div className={`text-md-start text-center`}>
          <HeadingText text="Here is Your Posts" />
          <div style={{ height: "35px" }}></div>
          <div className={styles.container}>
            {userPosts.length === 0 ? (
              <NoCount>you did not add posts </NoCount>
            ) : (
              userPosts?.map((userPost, idx) => (
                <div
                  key={userPost.id}
                  className={styles.postCard}
                  onClick={() => setActive(idx)}
                >
                  <h2 className={styles.postTitle}>{userPost.title}</h2>
                  <motion.div
                    style={{
                      overflow: "hidden",
                    }}
                    animate={{ height: active === idx ? "auto" : 0 }}
                  >
                    <p className={styles.postDescription}>
                      {userPost.description}
                    </p>
                    <div className={styles.commentsSection}>
                      {userPost.comments.length > 0 ? (
                        userPost.comments.map((userComment) => (
                          <div
                            key={userComment.id}
                            className={styles.commentCard}
                          >
                            <p className={styles.commentText}>
                              {userComment?.text}
                            </p>
                            <p className={styles.commentUser}>
                              -{" "}
                              <Link
                                href={`/posts/specific-user/${userComment.userId}`}
                                title="go to user posts"
                              >
                                {userComment?.user?.username}
                              </Link>
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className={styles.commentsInfo}>
                          no Comments for this post
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default UserPosts;
