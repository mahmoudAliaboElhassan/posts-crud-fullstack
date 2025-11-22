"use client"

import React, { useCallback, useMemo, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Post } from "@prisma/client"
import Link from "next/link"
import { FaEye, FaComment, FaEdit, FaTrash } from "react-icons/fa"

import axiosInstance from "@/utils/axiosInstance"
import ModalUpdatePost from "./modalPost"
import PagesPagination from "../pagination"
import LoadingFetching from "../loadingData"
import { JWTPayload } from "@/utils/types"
import Search from "./search"
import NoCount from "./noCount"
import Swal from "sweetalert2"

interface Props {
  pageNumber: string
  jwtPayload: JWTPayload | null
  searchText: string
}

function PostsTable({ pageNumber, jwtPayload, searchText }: Props) {
  const [posts, setPosts] = useState<Post[]>()
  const [count, setCount] = useState<number>(1)
  const [loading, setLoading] = useState(false)
  const [postUpdatedId, setPostUpdatedId] = useState(false)
  const [postIdDelete, setPostIdDelete] = useState<number>(0)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [postData, setPostData] = useState<Post | undefined>()
  const router = useRouter()
  const [show, setShow] = useState(false)

  const handleClose = useCallback(() => {
    setShow(false)
  }, [])

  const handleShow = useCallback((id: number) => {
    setShow(true)
    getPostData(id)
  }, [])

  const handleUpdate = useCallback(() => {
    setPostUpdatedId((prev) => !prev)
  }, [])

  const getPostData = useCallback(async (id: number) => {
    setPostData(undefined)
    try {
      const res = await axiosInstance.get(`/api/posts/${id}`)
      setPostData(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete Post",
      cancelButtonText: "Cancel",

      customClass: {
        confirmButton: "px-4 py-2 font-medium rounded-md text-white",
        cancelButton: "px-4 py-2 font-medium rounded-md text-white",
        actions: "gap-4",
      },

      buttonsStyling: false,

      didRender: () => {
        const confirmBtn = Swal.getConfirmButton()
        const cancelBtn = Swal.getCancelButton()

        // إضافة الخلفيات المطلوبة
        if (confirmBtn) confirmBtn.style.backgroundColor = "#e14d4d"
        if (cancelBtn) cancelBtn.style.backgroundColor = "#6b7280" // gray-500 تقريباً
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        setPostIdDelete(id)
        setLoadingDelete(true)
        try {
          await axiosInstance.delete(`/api/posts/${id}`)
          toast.success("Post deleted successfully!")
          router.refresh()

          const postsAfterDeleting = posts?.filter((post) => post.id !== id)
          setPosts(postsAfterDeleting)
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

              // إضافة الخلفيات المطلوبة
              if (confirmBtn) confirmBtn.style.backgroundColor = "#e14d4d"
              if (cancelBtn) cancelBtn.style.backgroundColor = "#6b7280" // gray-500 تقريباً
            },
          })
        } finally {
          setLoadingDelete(false)
          setPostIdDelete(0)
        }
      }
    })
  }

  const memoizedPostData = useMemo(() => postData, [postData])

  const getPosts = async () => {
    setLoading(true)
    try {
      const posts = await axiosInstance.get(
        `api/posts?pageNumber=${pageNumber}&searchText=${searchText}`
      )
      setPosts(posts.data.posts)
      setCount(posts.data.count)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPosts()
  }, [searchText, pageNumber, postUpdatedId])

  return (
    <div className="min-h-screen py-12 px-4">
      {loading ? (
        <LoadingFetching>Wait for all posts to load...</LoadingFetching>
      ) : (
        <>
          <Search searchVal={searchText} />
          <div className="h-12"></div>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            >
              {!posts?.length ? (
                <div className="min-h-[calc(100vh-200px)]">
                  <NoCount>No Posts</NoCount>
                </div>
              ) : (
                <>
                  {/* Mobile Card View */}
                  <div className="lg:hidden space-y-4">
                    {posts?.map((post) => (
                      <div
                        key={post.id}
                        className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 p-6"
                      >
                        <h3 className="text-xl font-bold mb-4">{post.title}</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            href={`/posts/${post.id}`}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            <FaEye />
                            View
                          </Link>
                          <Link
                            href={`/comments/add/${post.id}`}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              !jwtPayload
                                ? "bg-zinc-300 dark:bg-zinc-700 text-zinc-500 cursor-not-allowed"
                                : "bg-zinc-600 text-white hover:bg-zinc-700"
                            }`}
                          >
                            <FaComment />
                            Comment
                          </Link>
                          <button
                            onClick={() => handleShow(post.id)}
                            disabled={
                              !jwtPayload || jwtPayload.id !== post.userId
                            }
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FaEdit />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            disabled={
                              !jwtPayload ||
                              jwtPayload.id !== post.userId ||
                              (postIdDelete === post.id && loadingDelete)
                            }
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FaTrash />
                            {postIdDelete === post.id && loadingDelete
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden lg:block overflow-x-auto bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700">
                    <table className="w-full">
                      <thead className="bg-zinc-50 dark:bg-zinc-700/50">
                        <tr>
                          <th className="px-6 py-4 text-center font-semibold">
                            Title
                          </th>
                          <th className="px-6 py-4 text-center font-semibold">
                            View
                          </th>
                          <th className="px-6 py-4 text-center font-semibold">
                            Add Comment
                          </th>
                          <th className="px-6 py-4 text-center font-semibold">
                            Edit
                          </th>
                          <th className="px-6 py-4 text-center font-semibold">
                            Delete
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                        {posts?.map((post) => (
                          <tr
                            key={post.id}
                            className="hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors"
                          >
                            <td className="px-6 py-4 text-center">
                              <h5 className="font-semibold">{post.title}</h5>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <Link
                                href={`/posts/${post.id}`}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                              >
                                <FaEye />
                                View
                              </Link>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <Link
                                href={`/comments/add/${post.id}`}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                                  !jwtPayload
                                    ? "bg-zinc-300 dark:bg-zinc-700 text-zinc-500 cursor-not-allowed"
                                    : "bg-zinc-600 text-white hover:bg-zinc-700"
                                }`}
                              >
                                <FaComment />
                                Add Comment
                              </Link>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => handleShow(post.id)}
                                disabled={
                                  !jwtPayload || jwtPayload.id !== post.userId
                                }
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <FaEdit />
                                Edit
                              </button>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => handleDelete(post.id)}
                                disabled={
                                  !jwtPayload ||
                                  jwtPayload.id !== post.userId ||
                                  (postIdDelete === post.id && loadingDelete)
                                }
                                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <FaTrash />
                                {postIdDelete === post.id && loadingDelete
                                  ? "Deleting..."
                                  : "Delete"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <ModalUpdatePost
                    show={show}
                    handleUpdate={handleUpdate}
                    handleClose={handleClose}
                    postData={memoizedPostData}
                  />
                </>
              )}
            </motion.div>
            <PagesPagination count={count} search={searchText} />
          </div>
        </>
      )}
    </div>
  )
}

export default PostsTable
