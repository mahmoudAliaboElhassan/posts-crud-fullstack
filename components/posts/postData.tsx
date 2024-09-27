"use client";
import React, { useEffect, useState } from "react";

import axiosInstance from "@/utils/axiosInstance";
import { SinglePost } from "@/utils/types";
import ModalUpdateComment from "../modalComment";
import { Button } from "react-bootstrap";
import { Comment } from "@prisma/client";

interface Props {
  postId: string;
}

function PostData({ postId }: Props) {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const [postData, setPostData] = useState<SinglePost>();

  const [commentId, setCommentId] = useState<number>();
  const [commentData, setCommentData] = useState<Comment>();
  const handleComment = (id: number) => {
    setCommentId(id);
    setShow(true);
    const comment = postData?.comments.find((comment) => comment.id === id);
    setCommentData(comment);
  };
  console.log("commentData", commentData);
  useEffect(() => {
    const getPostData = async () => {
      try {
        const res = await axiosInstance.get(`/api/posts/${postId}`);
        setPostData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPostData();
  }, []);
  return (
    <div>
      <div>{postData?.title}</div>
      <div>{postData?.description}</div>
      <div>
        {" "}
        {postData?.comments?.map((comment) => (
          <>
            <div>{comment.text}</div>
            <div>{comment.user.username}</div>
            <div>{comment.user.email}</div>
            <Button onClick={() => handleComment(comment.id)}>
              update comment data
            </Button>
          </>
        ))}
      </div>
      <ModalUpdateComment
        show={show}
        handleClose={handleClose}
        commentData={commentData}
      />
    </div>
  );
}

export default PostData;
