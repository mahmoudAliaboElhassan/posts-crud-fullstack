import prisma from "@/utils/db";
import verifyToken from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const jWTPayload = verifyToken(request);
    if (!jWTPayload) {
      return NextResponse.json({ message: "not authorized" }, { status: 403 });
    }
    const posts = await prisma.post.findMany({
      where: {
        userId: jWTPayload?.id,
      },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
