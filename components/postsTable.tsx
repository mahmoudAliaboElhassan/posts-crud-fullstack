"use client";
import axiosInstance from "@/utils/axiosInstance";
import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ModalUpdatePost from "./modalPost";
import { Button } from "react-bootstrap";
import Link from "next/link";

function PostsTable() {
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [postId, setPostId] = useState<number>();
  const [postData, setPostData] = useState<Post | undefined>();

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

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const posts = await axiosInstance.get("api/posts");
        setPosts(posts.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getPosts();
  }, []);
  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <Table striped bordered hover size="md">
          <thead>
            <tr>
              <th>Title</th>
              <th colSpan={2} style={{ textAlign: "center" }}>
                View
              </th>
              <th colSpan={2} style={{ textAlign: "center" }}>
                Edit
              </th>
              <th colSpan={2} style={{ textAlign: "center" }}>
                Add Comment
              </th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post) => (
              <>
                {" "}
                <tr>
                  <td>{post.title}</td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    <Button variant="secondary">
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
                    <Button variant="primary">
                      <Link href={`/comments/add/${post.id}`}>Add Comment</Link>
                    </Button>
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
      )}
    </>
  );
}

export default PostsTable;
