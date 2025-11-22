"use client"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { FaUser, FaChevronDown, FaChevronUp, FaComment } from "react-icons/fa"

import axiosInstance from "@/utils/axiosInstance"
import { SinglePost } from "@/utils/types"
import LoadingFetching from "../loadingData"
import HeadingText from "./heading"
import NoCount from "./noCount"

interface Props {
  id: string
}

function SpecificUserPostsComponent({ id }: Props) {
  const [posts, setPosts] = useState<SinglePost[]>([])
  const [loading, setLoading] = useState(false)
  const [username, setUserName] = useState<string>()
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true)
      try {
        const res = await axiosInstance.get(`/api/posts/specifc-user/${id}`)
        setPosts(res.data.postsData)
        setUserName(res.data.username)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getPosts()
  }, [id])

  const togglePost = (idx: number) => {
    setActive(active === idx ? null : idx)
  }

  return (
    <div className="min-h-screen py-12 px-4">
      {loading ? (
        <LoadingFetching>Wait for your posts to load...</LoadingFetching>
      ) : (
        <div className="max-w-4xl mx-auto">
          <HeadingText username={username} />

          <div className="mt-8 space-y-4">
            {posts.length === 0 ? (
              <NoCount>This user has no posts</NoCount>
            ) : (
              posts.map((userPost, idx) => (
                <motion.div
                  key={userPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden"
                >
                  {/* Post Header */}
                  <button
                    onClick={() => togglePost(idx)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors"
                  >
                    <h2 className="text-xl font-semibold text-left flex-1">
                      {userPost.title}
                    </h2>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                        <FaComment className="text-xs" />
                        {userPost.comments.length}
                      </span>
                      {active === idx ? (
                        <FaChevronUp className="text-zinc-400" />
                      ) : (
                        <FaChevronDown className="text-zinc-400" />
                      )}
                    </div>
                  </button>

                  {/* Post Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: active === idx ? "auto" : 0,
                      opacity: active === idx ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4">
                      {/* Description */}
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {userPost.description}
                      </p>

                      {/* Comments Section */}
                      <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
                        <h3 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-3 flex items-center gap-2">
                          <FaComment className="text-xs" />
                          Comments ({userPost.comments.length})
                        </h3>

                        {userPost.comments.length > 0 ? (
                          <div className="space-y-3">
                            {userPost.comments.map(
                              (userComment: {
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
                                userId: any
                                user: {
                                  username:
                                    | string
                                    | number
                                    | bigint
                                    | boolean
                                    | React.ReactElement<
                                        any,
                                        | string
                                        | React.JSXElementConstructor<any>
                                      >
                                    | Iterable<React.ReactNode>
                                    | React.ReactPortal
                                    | Promise<React.AwaitedReactNode>
                                    | null
                                    | undefined
                                }
                              }) => (
                                <div
                                  key={userComment.id}
                                  className="bg-zinc-50 dark:bg-zinc-700/50 rounded-lg p-4"
                                >
                                  <p className="text-zinc-700 dark:text-zinc-300 mb-2">
                                    {userComment.text}
                                  </p>
                                  <Link
                                    href={`/posts/specific-user/${userComment.userId}`}
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                  >
                                    <FaUser className="text-xs" />
                                    {userComment.user?.username}
                                  </Link>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
                            No comments for this post yet
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SpecificUserPostsComponent
