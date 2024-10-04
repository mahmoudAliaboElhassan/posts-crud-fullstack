"use client";

import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Container } from "react-bootstrap";
import { Post } from "@prisma/client";
import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";
import ModalUpdatePost from "./modalPost";
import PagesPagination from "../pagination";
import LoadingFetching from "../loadingData";
import { JWTPayload } from "@/utils/types";
import HeadingText from "./heading";
import "../alert.css";
import Search from "./search";

interface Props {
  pageNumber: string;
  jwtPayload: JWTPayload | null;
  searchText: string;
}

function PostsTable({ pageNumber, jwtPayload, searchText }: Props) {
  const [posts, setPosts] = useState<Post[]>();
  const [count, setCount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [postId, setPostId] = useState<number>();
  const [postData, setPostData] = useState<Post | undefined>();
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = (id: number) => {
    setPostId(id);
    setShow(true);
    getPostData(id);
  };

  const getPostData = async (id: number) => {
    setPostData(undefined);
    try {
      const res = await axiosInstance.get(`/api/posts/${id}`);
      setPostData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete Post",
      cancelButtonText: "Cancel Delete",
      customClass: {
        confirmButton: "red-confirm-button swal2-confirm",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosInstance.delete(`/api/posts/${id}`);
          router.refresh();
          toast.success("Post has been deleted successfully!");
        } catch (error: any) {
          console.log(error);
          Swal.fire({
            title: "Error in deleting post",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      } else {
        Swal.fire({
          title: "Post still exists",
          icon: "info",
          confirmButtonText: "Ok",
        });
      }
    });
  };

  const getPosts = async () => {
    setLoading(true);
    try {
      const posts = await axiosInstance.get(
        `api/posts?pageNumber=${pageNumber}&searchText=${searchText}`
      );
      setPosts(posts.data.posts);
      setCount(posts.data.count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getPostsSearch = async () => {
    setLoading(true);
    try {
      const posts = await axiosInstance.get(
        `api/posts?pageNumber=${pageNumber}&searchText=${searchText}`
      );
      setPosts(posts.data.posts);
      setCount(posts.data.count);
      setLoading(false);
      router.refresh();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [searchText, pageNumber]);

  return (
    <div style={{ minHeight: "100vh" }}>
      {loading ? (
        <LoadingFetching>Wait for all Posts to Load ...</LoadingFetching>
      ) : (
        <>
          {/* <div className="d-flex"> */}
          {/* <HeadingText text="Manage Posts" /> */}
          <Search />
          {/* </div> */}

          <div style={{ height: "46px" }}></div>
          <Container fluid="lg">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            >
              <Table
                striped="columns"
                bordered
                hover
                size="md"
                style={{ overflowX: "auto" }}
              >
                <thead>
                  <tr>
                    <th
                      className="text-center"
                      style={{ verticalAlign: "middle" }}
                    >
                      Title
                    </th>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      View
                    </th>{" "}
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      Add Comment
                    </th>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      Edit
                    </th>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts?.map((post) => (
                    <tr key={post.id}>
                      <td
                        className="text-center"
                        style={{ verticalAlign: "middle" }}
                      >
                        <h5>{post.title}</h5>
                      </td>
                      <td colSpan={2} style={{ textAlign: "center" }}>
                        <Button
                          variant="success"
                          href={`/posts/${post.id}`}
                          size="lg"
                        >
                          <Link
                            href={`/posts/${post.id}`}
                            style={{ width: "100%", height: "100%" }}
                          >
                            View
                          </Link>
                        </Button>
                      </td>
                      <td colSpan={2} style={{ textAlign: "center" }}>
                        <Button variant="secondary" size="lg">
                          <Link
                            href={`/comments/add/${post.id}`}
                            style={{
                              color: "white",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            Add Comment
                          </Link>
                        </Button>
                      </td>
                      <td colSpan={2} style={{ textAlign: "center" }}>
                        <Button
                          size="lg"
                          variant="primary"
                          onClick={() => handleShow(post.id)}
                          disabled={
                            !jwtPayload || jwtPayload.id !== post.userId
                          }
                        >
                          Edit
                        </Button>
                      </td>
                      <td colSpan={2} style={{ textAlign: "center" }}>
                        <Button
                          variant="danger"
                          size="lg"
                          onClick={() => handleDelete(post.id)}
                          disabled={
                            !jwtPayload || jwtPayload.id !== post.userId
                          }
                        >
                          Delete Post
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <ModalUpdatePost
                  show={show}
                  handleClose={handleClose}
                  postData={postData}
                />
              </Table>
            </motion.div>
            <PagesPagination count={count} search={searchText} />
          </Container>
        </>
      )}
    </div>
  );
}

export default PostsTable;
