import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// This endpoint can be used to manually revalidate pages
// Usage: POST /api/revalidate with { path: '/blog' } or { tag: 'posts' }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, tag, secret } = body;

    // Optional secret for security (you can set this in environment variables)
    if (
      process.env.REVALIDATE_SECRET &&
      secret !== process.env.REVALIDATE_SECRET
    ) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        path,
        message: `Path ${path} revalidated successfully`,
      });
    }

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({
        revalidated: true,
        tag,
        message: `Tag ${tag} revalidated successfully`,
      });
    }

    return NextResponse.json(
      { message: "Missing path or tag parameter" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
