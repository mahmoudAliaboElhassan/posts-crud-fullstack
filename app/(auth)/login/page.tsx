import Link from "next/link";

import LoginForm from "@/components/auth/loginForm";

function Login() {
  return (
    <>
      <div>loginForm</div>;
      <LoginForm />
      <div>
        do not have account <Link href="/signup">SignUp</Link>
      </div>
    </>
  );
}

export default Login;
