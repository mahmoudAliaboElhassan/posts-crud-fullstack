import prisma from "@/utils/db";
import { addCommentDTO } from "@/utils/dto";
import { addComment } from "@/utils/validationSchema";
import verifyToken from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as addCommentDTO;

    // Check if token is valid
    const jwtPayload = verifyToken(request);
    console.log("JWT Payload:", jwtPayload);

    // Validate body against schema
    const validation = addComment.safeParse(body);
    if (!validation.success) {
      console.log("Validation error:", validation.error);
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const post = await prisma.post.findUnique({
      where: {
        id: body.postId,
      },
    });

    if (!post) {
      return NextResponse.json(
        {
          message: "Post you want to Add Comment to is Not Found",
        },
        { status: 404 }
      );
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        postId: body.postId,
        text: body.text,
        userId: jwtPayload?.id,
      },
    });

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.log("Error in POST handler:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
