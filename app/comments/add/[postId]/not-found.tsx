import React from "react"
import NotFoundImage from "@/assets/not-found.png"
import Image from "next/image"
function NotFoundAddComment() {
  return (
    <div>
      <h3 style={{ textAlign: "center", fontStyle: "italic" }}>
        Post you want to Add Comment to is not found
      </h3>
      <Image
        width={500}
        height={500}
        src={NotFoundImage}
        alt="not-found-img"
        style={{ margin: "auto", display: "flex" }}
      />
    </div>
  )
}

export default NotFoundAddComment
