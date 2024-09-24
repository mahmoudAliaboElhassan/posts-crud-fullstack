import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import React from "react";
import LogOut from "./auth/logOut";

const Header = () => {
  const cookie = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(cookie);
  return (
    <>
      <div>This is Header</div>
      {payload && (
        <>
          <h1>{payload.username}</h1>
          <LogOut />
        </>
      )}
    </>
  );
};

export default Header;
