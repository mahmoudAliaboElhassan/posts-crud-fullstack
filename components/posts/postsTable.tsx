"use client";
import axiosInstance from "@/utils/axiosInstance";
import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ModalUpdatePost from "./modalPost";
import { Button, Container } from "react-bootstrap";
import Link from "next/link";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import "../alert.css";
import { useRouter } from "next/navigation";
import PagesPagination from "../pagination";
import LoadingFetching from "../loadingData";

interface Props {
  pageNumber: string;
}

function PostsTable({ pageNumber }: Props) {
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
      title: "Are you sure",
      text: "do you want to delete this post",
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
          toast.success("Post has been Deleted Successfully!");
        } catch (error: any) {
          console.log(error);
          Swal.fire({
            title: "Error in Adding Post",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "ok",
          });
        }
      } else {
        Swal.fire({
          title: "Post Still Exists",
          icon: "info",
          confirmButtonText: "Ok",
        });
      }
    });
  };

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const posts = await axiosInstance.get(
          `api/posts?pageNumber=${pageNumber}`
        );
        console.log(posts.data);
        setPosts(posts.data.posts);
        setCount(posts.data.count);
        setLoading(false);
        router.refresh();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getPosts();
  }, [pageNumber]);
  return (
    <>
      {loading ? (
        <LoadingFetching>Wait for all Posts to Load ...</LoadingFetching>
      ) : (
        <Container fluid="lg">
          <Table striped="columns" bordered hover size="md">
            <thead>
              <tr>
                <th className="text-center" style={{ verticalAlign: "middle" }}>
                  Title
                </th>
                <th colSpan={2} style={{ textAlign: "center" }}>
                  View
                </th>
                <th colSpan={2} style={{ textAlign: "center" }}>
                  Edit
                </th>
                <th colSpan={2} style={{ textAlign: "center" }}>
                  Add Comment
                </th>
                <th colSpan={2} style={{ textAlign: "center" }}>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((post) => (
                <>
                  {" "}
                  <tr>
                    <td
                      className="text-center"
                      style={{ verticalAlign: "middle" }}
                    >
                      {post.title}
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      <Button variant="link" href={`/posts/${post.id}`}>
                        <Link href={`/posts/${post.id}`}>View</Link>
                      </Button>
                    </td>
                    <td
                      colSpan={2}
                      style={{ textAlign: "center" }}
                      onClick={() => handleShow(post.id)}
                    >
                      <Button variant="primary">Edit</Button>
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      <Button variant="secondary">
                        <Link
                          href={`/comments/add/${post.id}`}
                          style={{ color: "white" }}
                        >
                          Add Comment
                        </Link>
                      </Button>
                    </td>
                    <td
                      colSpan={2}
                      style={{ textAlign: "center" }}
                      onClick={() => handleDelete(post.id)}
                    >
                      <Button variant="danger">Delete Post</Button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
            <ModalUpdatePost
              show={show}
              handleClose={handleClose}
              postData={postData}
            />
          </Table>
          <PagesPagination count={count} />
        </Container>
      )}
    </>
  );
}

export default PostsTable;
