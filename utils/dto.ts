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
