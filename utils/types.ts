import { Comment, User, Post } from "@prisma/client";

export interface JWTPayload {
  username: string;
  id: number;
  isAdmin: boolean;
}

type CommentWithUser = Comment & { user: User };
export type SinglePost = Post & { comments: CommentWithUser[] };
