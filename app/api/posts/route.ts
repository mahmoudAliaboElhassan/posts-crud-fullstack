import { POSTS_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

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
