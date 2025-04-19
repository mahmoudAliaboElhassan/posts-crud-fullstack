import { Comment, User, Post } from "@prisma/client";

export interface JWTPayload {
  username: string;
  id: number;
  isAdmin: boolean;
}

export type CommentWithUser = Comment & { user: User };
export type SinglePost = Post & { comments: CommentWithUser[] };

export interface HeaderElement {
  href: string;
  label: string;
}
