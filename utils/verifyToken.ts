import { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";
import { JWTPayload } from "./types";

export default function verifyToken(request: NextRequest): JWTPayload | null {
  try {
    //@ts-ignore
    const authToken = request.cookies.get("jwtToken");

    // so when i make log out i do not need to send token in headers
    // it will be read from token generated in login

    // token is visible across the project
    const tokenValue = authToken?.value as string;
    if (!tokenValue) {
      return null;
    }
    // const jwt;
    // if no token is handled from middleware

    // to read its data
    const userPayloadFromUser = Jwt.verify(
      tokenValue,
      process.env.JWT_SECRET as string
    ) as JWTPayload;

    return userPayloadFromUser;
  } catch (error) {
    return null;
  }
}
export function verifyTokenForPage(token: string): JWTPayload | null {
  try {
    const userPayloadFromUser = Jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTPayload;
    if (userPayloadFromUser) return userPayloadFromUser;
    else return null;
  } catch (error) {
    return null;
  }
}
