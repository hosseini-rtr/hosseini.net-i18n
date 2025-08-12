import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    // For now, we'll return a mock response
    // In a real implementation, you would fetch the URL and extract metadata

    const mockResponse = {
      success: 1,
      meta: {
        title: "Example Link",
        description: "This is an example link description",
        image: {
          url: "https://via.placeholder.com/400x300/cccccc/666666?text=Link+Preview",
        },
      },
      link: url,
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error("Link fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch link" },
      { status: 500 }
    );
  }
}
