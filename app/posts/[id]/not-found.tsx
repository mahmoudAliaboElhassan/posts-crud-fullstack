import React from "react";
import NotFoundImage from "@/assets/not-found.png";
import { Container } from "react-bootstrap";
import Image from "next/image";
function NotFoundPost() {
  return (
    <Container>
      <h3 style={{ textAlign: "center", fontStyle: "italic" }}>
        Post you want to get its data is not found
      </h3>
      <Image
        width={500}
        height={500}
        src={NotFoundImage}
        alt="not-found-img"
        style={{ margin: "auto", display: "flex" }}
      />
    </Container>
  );
}

export default NotFoundPost;
