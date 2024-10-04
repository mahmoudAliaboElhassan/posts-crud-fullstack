"use client";
import React, { useEffect, useState } from "react";

import { Button, Container } from "react-bootstrap";
import { Comment } from "@prisma/client";
import Link from "next/link";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import axiosInstance from "@/utils/axiosInstance";
import { JWTPayload, SinglePost } from "@/utils/types";
import ModalUpdateComment from "../comments/modalComment";
import LoadingFetching from "../loadingData";
import "./postData.css";
import "../alert.css";
import NoCount from "./noCount";

interface Props {
  postId: string;
  jwtPayload: JWTPayload | null;
}

function PostData({ postId, jwtPayload }: Props) {
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
    <div style={{ minHeight: "100vh" }}>
      {loading ? (
        <LoadingFetching>Wait for Post Data to Load ...</LoadingFetching>
      ) : (
        <div>
          <div className="post-title">{postData?.title}</div>
          <div className="post-description">{postData?.description}</div>

          <Container className="comment-container">
            {jwtPayload && (
              <Button className="my-3">
                <Link href={`/comments/add/${postData?.id}`}>
                  Add Comment for this Post
                </Link>
              </Button>
            )}
            {postData?.comments.length === 0 ? (
              <NoCount>No Comments for this Post</NoCount>
            ) : (
              postData?.comments?.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment-text">{comment.text}</div>
                  {jwtPayload && jwtPayload.id === comment.user.id && (
                    <div className="comment-buttons">
                      <Button onClick={() => handleComment(comment.id)}>
                        Update Comment Data
                      </Button>
                      <Button
                        className="mx-2"
                        variant="danger"
                        onClick={() => handleDelete(comment.id)}
                      >
                        Delete Comment
                      </Button>
                    </div>
                  )}
                  <div className="comment-user text-md-start text-center ms-md-2">
                    <Link
                      href={`/posts/specific-user/${comment.userId}`}
                      title="go to user posts"
                    >
                      {" "}
                      {comment.user.username}
                    </Link>
                  </div>
                  <div className="comment-email  text-md-start text-center ms-md-2">
                    {comment.user.email}
                  </div>
                </div>
              ))
            )}
          </Container>
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
