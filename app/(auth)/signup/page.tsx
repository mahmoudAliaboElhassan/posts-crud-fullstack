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
      <SignUpForm />
    </>
  );
}

export default SignUp;
