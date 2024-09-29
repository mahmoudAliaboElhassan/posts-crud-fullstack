import React from "react";

import ChangePasswordForm from "@/components/auth/changePassword";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password - Posts CRUD",
  description:
    "Update your account password to keep your MyApp account secure and protected.",
};

function ChangePassword() {
  const cookie = cookies().get("jwtToken")?.value || "";
  const jwtPayload = verifyTokenForPage(cookie);
  return <>{jwtPayload && <ChangePasswordForm jwtPayload={jwtPayload} />}</>;
}

export default ChangePassword;
