"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
// to use it in client component
type Provider = "github" | "google";

function SocialProviders() {
  const socialLoginHandler = (provider: Provider) => {
    signIn(provider, { redirectTo: "/profile" });
    // redirect should be from here
  };
  return (
    <div className="display-flex justify-between mt-2 flex-row">
      <div
        className="flex justify-between mt-2 cursor-pointer"
        onClick={() => socialLoginHandler("google")}
      >
        <FcGoogle className="text-red-500" size={30} />{" "}
      </div>
      <div
        className="flex justify-between mt-2 cursor-pointer"
        onClick={() => socialLoginHandler("github")}
      >
        <FaGithub className="text-black" size={30} />{" "}
      </div>
    </div>
  );
}

export default SocialProviders;

// in case of logging with github but we are not signed up with this accoubt
// next auth handles it
