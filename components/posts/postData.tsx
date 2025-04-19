"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Button, Container } from "react-bootstrap";
import { Comment } from "@prisma/client";
import Link from "next/link";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import axiosInstance from "@/utils/axiosInstance";
import { CommentWithUser, JWTPayload, SinglePost } from "@/utils/types";
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
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const handleClose = useCallback(() => setShow(false), []);
  const [postData, setPostData] = useState<SinglePost>();
  const [CommentUpdate, setCommentUpdate] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<number>();
  const [commentIdDelete, setCommentIdDelete] = useState<number | null>(null);
  const [commentData, setCommentData] = useState<Comment>();

  const memoizedCommentData = useMemo(() => commentData, [commentData]);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this comment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete Comment",
      cancelButtonText: "Cancel Delete",
      customClass: {
        confirmButton: "red-confirm-button swal2-confirm",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Start the deletion process, disable the button
        setLoadingDelete(true);
        setCommentIdDelete(id);

        try {
          // Call backend to delete the comment
          await axiosInstance.delete(`/api/comments/${id}`);

          // Update post data to reflect the comment deletion
          setPostData((prevPostData) => {
            if (prevPostData) {
              const updatedComments = prevPostData.comments.filter(
                (comment) => comment.id !== id
              );
              return { ...prevPostData, comments: updatedComments };
            }
            return prevPostData; // Ensure no undefined return value
          });

          toast.success("Comment has been deleted successfully!");
        } catch (error: any) {
          Swal.fire({
            title: "Error in Deleting Comment",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
          });
          console.log(error);
        }

        // Re-enable the delete button
        setLoadingDelete(false);
        setCommentIdDelete(null); // Reset the commentIdDelete after deletion
      } else {
        Swal.fire({
          title: "Comment Still Exists",
          icon: "info",
          confirmButtonText: "Ok",
        });
      }
    });
  };

  const handleUpdate = useCallback(() => {
    setCommentUpdate((prev) => !prev);
  }, []);

  const handleComment = (id: number) => {
    setShow(true);
    const comment = postData?.comments.find((comment) => comment.id === id);
    setCommentData(comment);
  };

  useEffect(() => {
    const getPostData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/api/posts/${postId}`);
        setPostData(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getPostData();
  }, [CommentUpdate]);

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
            {postData?.comments?.length === 0 ? (
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
                        disabled={
                          loadingDelete && commentIdDelete === comment.id
                        }
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
                      {comment.user.username}
                    </Link>
                  </div>
                  <div className="comment-email text-md-start text-center ms-md-2">
                    {comment.user.email}
                  </div>
                </div>
              ))
            )}
          </Container>
          <ModalUpdateComment
            show={show}
            handleClose={handleClose}
            commentData={memoizedCommentData}
            handleUpdate={handleUpdate}
          />
        </div>
      )}
    </div>
  );
}

export default PostData;
