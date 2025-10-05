import { Post } from "@/types/TPost";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// For now, we'll use a simple JSON file as our database
// In production, you'd want to use a proper database like PostgreSQL, MongoDB, etc.
import fs from "fs";
import path from "path";

const POSTS_FILE = path.join(process.cwd(), "data", "posts.json");

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.dirname(POSTS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Read posts from file
const readPosts = (): Post[] => {
  ensureDataDir();
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

// Write posts to file
const writePosts = (posts: Post[]) => {
  ensureDataDir();
  try {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error("Error writing posts:", error);
    throw new Error("Failed to save posts");
  }
};

// GET /api/posts - Get all posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale");

    let posts = readPosts();

    // Filter by locale if provided
    if (locale) {
      posts = posts.filter((post) => post.locale === locale);
    }

    // Sort by created_at descending (newest first)
    posts.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const posts = readPosts();

    // Generate new ID
    const newId =
      posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1;

    // Create new post
    const newPost: Post = {
      id: newId,
      title: body.title,
      content: body.content,
      slug:
        body.slug ||
        body.title
          ?.toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, ""),
      author: body.author || "Admin",
      tags: body.tags || [],
      locale: body.locale || "en",
      og_description: body.og_description || "",
      image: body.image || "",
      created_at: new Date().toISOString(),
      update_at: new Date().toISOString(),
    };

    // Add to posts array
    posts.push(newPost);

    // Save to file
    writePosts(posts);

    // Revalidate affected pages (avoid static generation bailout by using try-catch)
    try {
      revalidatePath("/[locale]/blog");
      revalidatePath("/[locale]/admin/posts");
      revalidatePath(`/[locale]/blog/${newPost.id}`);
      revalidatePath("/");
    } catch (error) {
      // Revalidation is not critical for API success
      console.warn("Revalidation warning:", error);
    }

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
