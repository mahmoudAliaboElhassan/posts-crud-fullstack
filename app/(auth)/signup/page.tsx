import React from "react";

import Link from "next/link";
import { Metadata } from "next";

import SignUpForm from "@/components/auth/signUpForm";

export const metadata: Metadata = {
  title: "Sign Up - Posts CRUD",
  description:
    "Create a new account on MyApp to enjoy personalized features and access exclusive content.",
};

function SignUp() {
  return (
    <>
      <div>SignUp</div>
      <SignUpForm />
      <div>
        Already have account <Link href="/login">Login</Link>
      </div>
    </>
  );
}

export default SignUp;
