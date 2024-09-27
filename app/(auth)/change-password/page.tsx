import React from "react";

import ChangePasswordForm from "@/components/auth/changePassword";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";

function ChangePassword() {
  const cookie = cookies().get("jwtToken")?.value || "";
  const jwtPayload = verifyTokenForPage(cookie);
  return (
    <>
      <div>change password</div>
      {jwtPayload && <ChangePasswordForm jwtPayload={jwtPayload} />}
    </>
  );
}

export default ChangePassword;
