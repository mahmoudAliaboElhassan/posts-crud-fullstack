import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import verifyToken from "@/utils/verifyToken";
import { updateUserSchema } from "@/utils/validationSchema";
import { updateUserDTO } from "@/utils/dto";

interface Props {
  params: { id: string };
}

/**
 * @method DELETE
 * @path http://localhosat/api/users/profile/:id
 * @desc Delete User Account
 * @access private (only user himself can delete this account)
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      include: { comments: true },
    });
    if (!user) {
      return NextResponse.json({ message: "users not found" }, { status: 404 });
    }
    console.log(request.headers);

    const userTokenPyaload = verifyToken(request);

    if (userTokenPyaload !== null && userTokenPyaload.id === user.id) {
      // same user himself d  elete his account not another
      const commentsIds = user.comments.map((comment) => comment.id);
      await prisma.comment.deleteMany({ where: { id: { in: commentsIds } } });
      await prisma.user.delete({ where: { id: parseInt(params.id) } });
      return NextResponse.json(
        { message: "your profile has been deleted successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "Only User can Delete his account forbidden" },
      { status: 403 }
    );
    // we put metadata in header
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json(
      { message: "Internal Server Error Mahmoud" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "user not found",
        },
        { status: 404 }
      );
    }

    const userTokenPyaload = verifyToken(request);
    if (!userTokenPyaload || userTokenPyaload.id !== user.id) {
      return NextResponse.json(
        {
          message: "forbidden only user himSelf can update his Account",
        },
        {
          status: 403,
        }
      );
    }
    const body = (await request.json()) as updateUserDTO;
    const validation = updateUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        {
          status: 400,
        }
      );
    }

    await prisma.user.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });
    return NextResponse.json(
      {
        message: "User Updated Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
