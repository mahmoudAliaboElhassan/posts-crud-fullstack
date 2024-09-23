import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method DELETE
 * @path http://localhosat/api/users/logout
 * @desc Logout User Account
 * @access public (it just logout not delete account)
 */

export async function GET(request: NextRequest) {
  try {
    cookies().delete("jwtToken");
    return NextResponse.json(
      {
        message: "user logged out successfully",
        cookieToken: request.cookies.get("jwtToken"),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json("Internal Server Error", {
      status: 500,
    });
  }
}
