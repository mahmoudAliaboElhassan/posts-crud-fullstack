import { POSTS_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";
import { PostDTO } from "@/utils/dto";
import { addPost } from "@/utils/validationSchema";
import verifyToken from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
    // in case of no parameters ?pageNumber for search will get first page
    console.log("pageNumber", pageNumber);
    const count = await prisma.post.count();
    const posts = await prisma.post.findMany({
      skip: POSTS_PER_PAGE * (parseInt(pageNumber) - 1), // skip number of articles
      take: POSTS_PER_PAGE,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ posts: posts, count: count }, { status: 200 });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const jwtPayload = verifyToken(request);

    const body = (await request.json()) as PostDTO;
    const validation = addPost.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title: body.title,
        description: body.description,
        userId: jwtPayload?.id,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
