import { NextRequest, NextResponse } from "next/server";

import generateJWT, { SetCookie } from "@/utils/generateToken";
import { registerSchema } from "@/utils/validationSchema";
import { JWTPayload } from "@/utils/types";
import { RegisterDTO } from "@/utils/dto";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";

/**
 * @method POST
 * @path http://localhosat/api/users/signup
 * @desc Create User Account
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterDTO;
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (user) {
      return NextResponse.json(
        { message: "This Email Already Exists" },
        {
          status: 400,
        }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
    });

    // const tokenPayload: JWTPayload = {
    //   username: newUser.username,
    //   id: newUser.id,
    //   isAdmin: newUser.isAdmin,
    // };
    // const token = generateJWT(tokenPayload);

    // const cookie = SetCookie(token);
    return NextResponse.json(
      { message: "User Created Successfully " },
      {
        status: 201,
        // headers: { "Set-Cookie": cookie },
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json("Internal Server Error", {
      status: 500,
    });
  }
}
