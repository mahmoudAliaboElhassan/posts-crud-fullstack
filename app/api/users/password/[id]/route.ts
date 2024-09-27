import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import prisma from "@/utils/db";
import { updatePasswordDTO } from "@/utils/dto";
import verifyToken from "@/utils/verifyToken";
import { updateUserPassword } from "@/utils/validationSchema";

interface Props {
  params: {
    id: string;
  };
}
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const body = (await request.json()) as updatePasswordDTO;
    const validation = updateUserPassword.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        {
          status: 400,
        }
      );
    }

    const jwtPayload = verifyToken(request);
    if (!jwtPayload || jwtPayload.id !== user.id) {
      return NextResponse.json(
        {
          message: "User himSelf only can change his Password",
        },
        { status: 403 }
      );
    }

    const passwordMatch = await bcrypt.compare(
      body.currentPassword,
      user.password
    );
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Current Password is not true " },
        {
          status: 400,
        }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.newPassword, salt);
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        password: hashedPassword,
      },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
