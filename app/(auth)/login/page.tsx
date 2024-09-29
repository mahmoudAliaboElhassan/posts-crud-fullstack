import Link from "next/link";
import { Metadata } from "next";

import LoginForm from "@/components/auth/loginForm";

export const metadata: Metadata = {
  title: "Login - Posts CRUD",
  description:
    "Sign in to your MyApp account to access exclusive features and manage your settings.",
};

function Login() {
  return (
    <>
      <LoginForm />
    </>
  );
}

export default Login;
