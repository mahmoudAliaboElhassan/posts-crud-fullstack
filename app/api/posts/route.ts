import { NextRequest, NextResponse } from "next/server";

import { addPost } from "@/utils/validationSchema";
import { POSTS_PER_PAGE } from "@/utils/constants";
import verifyToken from "@/utils/verifyToken";
import { PostDTO } from "@/utils/dto";
import prisma from "@/utils/db";

export async function POST(request: NextRequest) {
  try {
    const jwtPayload = verifyToken(request);
    const body = (await request.json()) as PostDTO;
    const validation = addPost.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const post = await prisma.post.create({
      data: {
        title: body.title,
        description: body.description,
        userId: jwtPayload?.id,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
    const searchText = request.nextUrl.searchParams.get("searchText") || "";

    // Prisma search filtering logic
    const whereClause = searchText
      ? {
          OR: [
            { title: { contains: searchText, mode: "insensitive" } }, // Case-insensitive search on title
            // { description: { contains: searchText, mode: "insensitive" } }, // Case-insensitive search on description
          ],
        }
      : {};

    // Get the total count of filtered posts (for pagination)
    const count = await prisma.post.count({
      where: whereClause,
    });

    // Fetch the filtered posts with pagination
    const posts = await prisma.post.findMany({
      where: whereClause,
      skip: POSTS_PER_PAGE * (parseInt(pageNumber) - 1), // Skip posts for previous pages
      take: POSTS_PER_PAGE, // Limit posts per page
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ posts: posts, count: count }, { status: 200 });
  } catch (error) {
    console.log("Error fetching posts:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
