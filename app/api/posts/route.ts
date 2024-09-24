import prisma from "@/utils/db";
import { PostDTO } from "@/utils/dto";
import { addPost } from "@/utils/validationSchema";
import verifyToken from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts, { status: 200 });
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
