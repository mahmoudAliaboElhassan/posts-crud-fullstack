"use client";
import React, { useEffect, useState } from "react";

import axiosInstance from "@/utils/axiosInstance";
import { SinglePost } from "@/utils/types";
import { Button } from "react-bootstrap";
import { Comment } from "@prisma/client";
import ModalUpdateComment from "../comments/modalComment";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import "../alert.css";
import { useRouter } from "next/navigation";
import LoadingFetching from "../loadingData";

interface Props {
  postId: string;
}

function PostData({ postId }: Props) {
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const [postData, setPostData] = useState<SinglePost>();
  const router = useRouter();
  const [commentId, setCommentId] = useState<number>();
  const [commentData, setCommentData] = useState<Comment>();

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure",
      text: "do you want to delete this Comment",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete Comment",
      cancelButtonText: "Cancel Delete",
      customClass: {
        confirmButton: "red-confirm-button swal2-confirm",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosInstance.delete(`/api/comments/${id}`);
          router.refresh();
          toast.success("Comment has been Deleted Successfully!");
        } catch (error: any) {
          Swal.fire({
            title: "Error in Adding Post",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "ok",
          });
          console.log(error);
        }
      } else {
        Swal.fire({
          title: "Comment Still Exists",
          icon: "info",
          confirmButtonText: "Ok",
        });
      }
    });
  };

  const handleComment = (id: number) => {
    setCommentId(id);
    setShow(true);
    const comment = postData?.comments.find((comment) => comment.id === id);
    setCommentData(comment);
  };
  console.log("commentData", commentData);
  useEffect(() => {
    const getPostData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/api/posts/${postId}`);
        setPostData(res.data);
        setLoading(false);

        console.log(res.data);
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    };
    getPostData();
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingFetching>Wait for Post Data to Load ...</LoadingFetching>
      ) : (
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
                <Button
                  variant="danger"
                  onClick={() => handleDelete(comment.id)}
                >
                  Delete Comment
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
      )}
    </div>
  );
}

export default PostData;
