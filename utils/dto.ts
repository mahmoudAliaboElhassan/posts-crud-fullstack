export interface RegisterDTO {
  username: string;
  email: string;
  password: string;
}
export interface loginDTO {
  email: string;
  password: string;
}
export interface updateUserDTO {
  username?: string;
  email?: string;
  password?: string;
}
export interface PostDTO {
  title: string;
  description: string;
}
export interface addCommentDTO {
  text: string;
  postId: number;
}
export interface updateCommentDTO {
  text: string;
}
