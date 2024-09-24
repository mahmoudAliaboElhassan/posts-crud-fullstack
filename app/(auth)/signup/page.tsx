import React from "react";

import SignUpForm from "@/components/auth/signUpForm";
import Link from "next/link";

function SignUp() {
  return (
    <>
      {" "}
      <div>SignUp</div>;
      <SignUpForm />
      <div>
        Already have account <Link href="/login">Login</Link>
      </div>
    </>
  );
}

export default SignUp;
