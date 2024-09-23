import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";
import { serialize } from "cookie";

// generating token

export default function generateJWT(jwtPayload: JWTPayload): string {
  //   token = payload+secretOrPrivateKey + optional {expireIn:30d}
  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, {
    expiresIn: "3h",
    // 3 hours
    // m => minutes
  });
  //  take generated token and go to jsonwebtoken website to decode it and see its data
  //  but do not forget to take privatekey and put it in his place for private key
  //  in website
  return token;
}

// generating cookie

export const SetCookie = (token: string): string => {
  const cookie = serialize("jwtToken", token, {
    httpOnly: true,
    // to make nobody can update this cookie

    secure: process.env.NODE_ENV === "production",
    // http or https
    // false http only   =>development
    // but in production we work https so make
    // process.env.NODE_ENV

    sameSite: "strict",
    path: "/",
    // path determine which page this cookie is loaded in
    // "/articles"
    // for article page
    // "/" all pages

    maxAge: 60 * 60 * 24 * 30,
    // 30 days
  });
  return cookie;
};
