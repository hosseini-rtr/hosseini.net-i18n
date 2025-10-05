import { Post } from "@/types/TPost";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const POSTS_FILE = path.join(process.cwd(), "data", "posts.json");

// Read posts from file
const readPosts = (): Post[] => {
  try {
    if (fs.existsSync(POSTS_FILE)) {
      const data = fs.readFileSync(POSTS_FILE, "utf8");
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error("Error reading posts:", error);
    return [];
  }
};

// GET /api/posts/slug/[slug] - Get post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale");

    const posts = readPosts();
    let post = posts.find((p) => p.slug === params.slug);

    // If locale is specified, filter by locale as well
    if (locale && post) {
      post = posts.find((p) => p.slug === params.slug && p.locale === locale);
    }

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
