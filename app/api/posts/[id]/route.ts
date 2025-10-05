import { Post } from "@/types/TPost";
import fs from "fs";
import { revalidatePath } from "next/cache";
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

// Write posts to file
const writePosts = (posts: Post[]) => {
  try {
    const dataDir = path.dirname(POSTS_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error("Error writing posts:", error);
    throw new Error("Failed to save posts");
  }
};

// GET /api/posts/[id] - Get post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const posts = readPosts();
    const post = posts.find((p) => p.id.toString() === params.id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// PUT /api/posts/[id] - Update post by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const posts = readPosts();
    const postIndex = posts.findIndex((p) => p.id.toString() === params.id);

    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Update post
    const updatedPost: Post = {
      ...posts[postIndex],
      ...body,
      id: posts[postIndex].id, // Preserve original ID
      created_at: posts[postIndex].created_at, // Preserve creation date
      update_at: new Date().toISOString(),
    };

    posts[postIndex] = updatedPost;
    writePosts(posts);

    // Revalidate affected pages
    revalidatePath("/[locale]/blog");
    revalidatePath(`/[locale]/blog/${updatedPost.id}`);
    revalidatePath(`/[locale]/blog/${updatedPost.slug}`);
    revalidatePath("/[locale]/admin/posts");

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[id] - Delete post by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const posts = readPosts();
    const postIndex = posts.findIndex((p) => p.id.toString() === params.id);

    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Remove post from array
    const deletedPost = posts.splice(postIndex, 1)[0];
    writePosts(posts);

    // Revalidate affected pages
    revalidatePath("/[locale]/blog");
    revalidatePath("/[locale]/admin/posts");

    return NextResponse.json({
      message: "Post deleted successfully",
      deletedPost,
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
