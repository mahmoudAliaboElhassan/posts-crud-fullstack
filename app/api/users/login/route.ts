import { NextRequest, NextResponse } from "next/server"

import { loginSchema } from "@/utils/validationSchema"
import { loginDTO } from "@/utils/dto"
import prisma from "@/utils/db"
import bcrypt from "bcryptjs"
import { JWTPayload } from "@/utils/types"
import generateJWT, { SetCookie } from "@/utils/generateToken"

/**
 * @method POST
 * @path http://localhosat/api/users/login
 * @desc Authenticate User Account
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as loginDTO
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    })
    const validation = loginSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    if (!user) {
      return NextResponse.json(
        { message: "Invalid Email or Password" },
        {
          status: 400,
        }
      )
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password)
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid Email or Password" },
        {
          status: 400,
        }
      )
    }
    const JWTPayload: JWTPayload = {
      username: user.username,
      id: user.id,
      isAdmin: user.isAdmin,
    }
    const token = generateJWT(JWTPayload)
    const cookie = SetCookie(token)
    return NextResponse.json(
      { message: "User Logged In Successfully" },
      {
        status: 200,
        headers: { "Set-Cookie": cookie },
      }
    )
  } catch (error) {
    return NextResponse.json("Internal Server Erro", {
      status: 500,
    })
  }
}
