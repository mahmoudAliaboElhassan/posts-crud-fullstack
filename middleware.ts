import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // const authToken = request.headers.get("authToken") as string;
  const authToken = request.cookies.get("jwtToken");
  const token = authToken?.value as string;
  console.log("from middleware cookies are", request.cookies);
  if (!token) {
    if (request.nextUrl.pathname.startsWith("/api/users/profile")) {
      //   it will work for delete only as if matchere has many route handlers
      // as get post patch so this middleware will not work for
      return NextResponse.json(
        { message: "no token provided access denied from middleware" },
        { status: 401 }
        // 401 => not authorized
      );
    }
  } else {
    if (
      request.nextUrl.pathname === "/loginPage" ||
      request.nextUrl.pathname === "/registerPage"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/api/users/profile/:path*", "/loginPage", "/registerPage"],
  // / means home page only
};
