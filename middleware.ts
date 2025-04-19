import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // const authToken = request.headers.get("authToken") as string;
  const authToken = request.cookies.get("jwtToken");
  console.log("from middleware", authToken);
  const token = authToken?.value as string;
  console.log("from middleware cookies are", request.cookies);
  if (!token) {
    if (
      request.nextUrl.pathname.startsWith("/api/comments") ||
      request.nextUrl.pathname.startsWith("/api/users/password") ||
      request.nextUrl.pathname.startsWith("/api/users/profile") ||
      (request.nextUrl.pathname.startsWith("/api/posts") &&
        request.method === "POST")
    ) {
      //   it will work for delete only as if matchere has many route handlers
      // as get post patch so this middleware will not work for
      return NextResponse.json(
        { message: "no token provided access denied from middleware" },
        { status: 401 }
        // 401 => not authorized
      );
    }
  } else {
    console.log("token ok");
    console.log(request.nextUrl.pathname);
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/signup"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/api/users/profile/:path*",
    "/api/users/password/:path*",
    "/login",
    "/signup",
    "/api/posts/:path*",
    "/api/comments/:path*",
  ],
  // / means home page only
};
