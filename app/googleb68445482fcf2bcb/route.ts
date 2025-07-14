import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    "google-site-verification: googleb68445482fcf2bcb.html",
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}
