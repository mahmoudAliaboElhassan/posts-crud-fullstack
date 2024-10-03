import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "This User is Not Exists" },
        { status: 404 }
      );
    }
    const posts = await prisma.post.findMany({
      where: {
        userId: parseInt(params.id),
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

    return NextResponse.json(
      { postsData: posts, username: user.username },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}
