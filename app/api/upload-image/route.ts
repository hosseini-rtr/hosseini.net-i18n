import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // For now, we'll return a mock response
    // In a real implementation, you would upload to your storage service
    // (AWS S3, Cloudinary, etc.) and return the URL

    const mockImageUrl = `https://via.placeholder.com/800x600/cccccc/666666?text=${encodeURIComponent(
      file.name
    )}`;

    return NextResponse.json({
      success: 1,
      file: {
        url: mockImageUrl,
        name: file.name,
        size: file.size,
      },
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
