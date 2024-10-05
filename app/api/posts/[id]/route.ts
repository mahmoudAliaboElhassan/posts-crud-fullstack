import prisma from "@/utils/db";
import { updatePostDTO } from "@/utils/dto";
import { updatePostSchema } from "@/utils/validationSchema";
import verifyToken from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        comments: {
          include: {
            user: {
              select: {
                username: true,
                email: true,
                id: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { message: "Post you Want to get its Data is not Found" },
        { status: 404 }
      );
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!post) {
      return NextResponse.json({ message: "Post not Found" }, { status: 404 });
    }
    const jwtPayload = verifyToken(request);
    if (!jwtPayload || jwtPayload.id !== post?.userId) {
      return NextResponse.json(
        {
          message: "forbidden user himSelf Only can Update this posta",
        },
        { status: 403 }
      );
    }
    const body = (await request.json()) as updatePostDTO;
    const validation = updatePostSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        comments: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!post) {
      return NextResponse.json({ message: "Post not Found" }, { status: 404 });
    }
    const jwtPayload = verifyToken(request);
    if (!jwtPayload || jwtPayload.id !== post?.userId) {
      return NextResponse.json(
        {
          message: "forbidden user himSelf Only can Update this posta",
        },
        { status: 403 }
      );
    }
    const commentIds = post.comments.map((comment) => comment.id);
    await prisma.comment.deleteMany({
      where: {
        id: { in: commentIds },
      },
    });
    const deletedPost = await prisma.post.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(deletedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
