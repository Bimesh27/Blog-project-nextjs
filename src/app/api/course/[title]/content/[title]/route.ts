import Content from "@/models/Content";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ title: string }> }
) {
  const { title } = await params;

  try {
    const content = await Content.findOne({ title });
    if (!content) {
      return NextResponse.json(
        {
          message: "Content not found",
          error: "Content not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Content retrived successfully", content: content },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    console.log("Failed to retrieve content", errorMessage);
    return NextResponse.json(
      {
        message: "Failed to retrieve content",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
