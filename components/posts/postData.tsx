"use client"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Comment } from "@prisma/client"
import Link from "next/link"
import Swal from "sweetalert2"
import toast from "react-hot-toast"
import {
  FaUser,
  FaEnvelope,
  FaPlus,
  FaEdit,
  FaTrash,
  FaComment,
} from "react-icons/fa"

import axiosInstance from "@/utils/axiosInstance"
import { JWTPayload, SinglePost } from "@/utils/types"
import ModalUpdateComment from "../comments/modalComment"
import LoadingFetching from "../loadingData"
import NoCount from "./noCount"

interface Props {
  postId: string
  jwtPayload: JWTPayload | null
}

function PostData({ postId, jwtPayload }: Props) {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const handleClose = useCallback(() => setShow(false), [])
  const [postData, setPostData] = useState<SinglePost>()
  const [commentUpdate, setCommentUpdate] = useState(false)
  const [commentIdDelete, setCommentIdDelete] = useState<number | null>(null)
  const [commentData, setCommentData] = useState<Comment>()

  const memoizedCommentData = useMemo(() => commentData, [commentData])

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this comment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete Comment",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      customClass: {
        confirmButton: "px-4 py-2 font-medium rounded-md text-white",
        cancelButton: "px-4 py-2 font-medium rounded-md text-white",
        actions: "gap-4",
      },
      buttonsStyling: false,
      didRender: () => {
        const confirmBtn = Swal.getConfirmButton()
        const cancelBtn = Swal.getCancelButton()

        if (confirmBtn) confirmBtn.style.backgroundColor = "#e14d4d"
        if (cancelBtn) cancelBtn.style.backgroundColor = "#6b7280"
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoadingDelete(true)
        setCommentIdDelete(id)

        try {
          await axiosInstance.delete(`/api/comments/${id}`)

          setPostData((prevPostData) => {
            if (!prevPostData || !prevPostData.comments) {
              return prevPostData
            }

            const updatedComments = prevPostData.comments.filter(
              (comment) => comment.id !== id
            )

            return {
              ...prevPostData,
              comments: updatedComments,
            }
          })

          toast.success("Comment deleted successfully!")
        } catch (error: any) {
          Swal.fire({
            title: "Delete Failed",
            text: error.response?.data?.message || "Something went wrong",
            icon: "error",
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "px-4 py-2 font-medium rounded-md text-white",
              cancelButton: "px-4 py-2 font-medium rounded-md text-white",
              actions: "gap-4",
            },
            buttonsStyling: false,
            didRender: () => {
              const confirmBtn = Swal.getConfirmButton()
              const cancelBtn = Swal.getCancelButton()

              if (confirmBtn) confirmBtn.style.backgroundColor = "#e14d4d"
              if (cancelBtn) cancelBtn.style.backgroundColor = "#6b7280"
            },
          })
        } finally {
          setLoadingDelete(false)
          setCommentIdDelete(null)
        }
      }
    })
  }

  const handleUpdate = useCallback(() => {
    setCommentUpdate((prev) => !prev)
  }, [])

  const handleComment = (id: number) => {
    setShow(true)
    const comment = postData?.comments.find(
      (comment: { id: number }) => comment.id === id
    )
    setCommentData(comment)
  }

  useEffect(() => {
    const getPostData = async () => {
      setLoading(true)
      try {
        const res = await axiosInstance.get(`/api/posts/${postId}`)
        setPostData(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getPostData()
  }, [postId, commentUpdate])

  return (
    <div className="min-h-screen py-12 px-4">
      {loading ? (
        <LoadingFetching>Wait for post data to load...</LoadingFetching>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Post Header */}
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
              <h1 className="text-3xl font-bold text-white">
                {postData?.title}
              </h1>
            </div>
            <div className="p-8">
              <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {postData?.description}
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <div className="px-8 py-6 border-b border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FaComment className="text-blue-600 dark:text-blue-400" />
                  Comments ({postData?.comments?.length || 0})
                </h2>
                {jwtPayload && (
                  <Link
                    href={`/comments/add/${postData?.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    <FaPlus className="text-sm" />
                    Add Comment
                  </Link>
                )}
              </div>
            </div>

            <div className="p-8">
              {postData?.comments?.length === 0 ? (
                <NoCount>No comments for this post yet</NoCount>
              ) : (
                <div className="space-y-4">
                  {postData?.comments?.map(
                    (comment: {
                      id: React.Key | null | undefined
                      text:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<React.AwaitedReactNode>
                        | null
                        | undefined
                      user: {
                        id: number
                        username:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | null
                          | undefined
                        email:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | null
                          | undefined
                      }
                      userId: any
                    }) => (
                      <div
                        key={comment.id}
                        className="bg-zinc-50 dark:bg-zinc-700/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-600"
                      >
                        {/* Comment Text */}
                        <p className="text-zinc-800 dark:text-zinc-200 mb-4 leading-relaxed">
                          {comment.text}
                        </p>

                        {/* Comment Actions */}
                        {jwtPayload && jwtPayload.id === comment.user.id && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            <button
                              onClick={() =>
                                comment.id != null &&
                                handleComment(comment.id as number)
                              }
                              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                              <FaEdit />
                              Update
                            </button>
                            <button
                              onClick={() =>
                                comment.id != null &&
                                handleDelete(comment.id as number)
                              }
                              disabled={
                                loadingDelete &&
                                commentIdDelete === (comment.id as number)
                              }
                              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <FaTrash />
                              {loadingDelete &&
                              commentIdDelete === (comment.id as number)
                                ? "Deleting..."
                                : "Delete"}
                            </button>
                          </div>
                        )}

                        {/* Comment Author Info */}
                        <div className="flex flex-col gap-2 text-sm">
                          <Link
                            href={`/posts/specific-user/${comment.userId}`}
                            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                          >
                            <FaUser className="text-xs" />
                            {comment.user.username}
                          </Link>
                          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                            <FaEnvelope className="text-xs" />
                            {comment.user.email}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          <ModalUpdateComment
            show={show}
            handleClose={handleClose}
            commentData={memoizedCommentData}
            handleUpdate={handleUpdate}
          />
        </div>
      )}
    </div>
  )
}

export default PostData
