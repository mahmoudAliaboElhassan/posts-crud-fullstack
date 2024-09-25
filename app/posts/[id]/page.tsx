import React from "react";

interface Props {
  params: {
    id: string;
  };
}
function Post({ params }: Props) {
  return <div>Post</div>;
}

export default Post;
