import prisma from "@/utils/db";
import { updateCommentDTO } from "@/utils/dto";
import { updateCommentSchema } from "@/utils/validationSchema";
import verifyToken from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const jwtPayload = verifyToken(request);
    const comment = await prisma.comment.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!jwtPayload || jwtPayload.id !== comment?.userId) {
      return NextResponse.json(
        { message: "forbiddn can not update this comment" },
        {
          status: 403,
        }
      );
    }

    const body = (await request.json()) as updateCommentDTO;
    const validation = updateCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.errors[0].message });
    }
    const updatedComment = await prisma.comment.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        text: body.text,
      },
    });
    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const jwtPayload = verifyToken(request);
    const comment = await prisma.comment.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!jwtPayload || jwtPayload.id !== comment?.userId) {
      return NextResponse.json(
        { message: "forbiddn can not update this comment" },
        {
          status: 403,
        }
      );
    }

    await prisma.comment.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(
      { message: "Comment Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
