import connectDB from "@/lib/mongoose";
import Content from "@/models/Content";
import Course from "@/models/Course";
import { NextResponse } from "next/server";
import { z } from "zod";

const contentSchema = z.object({
  contentTitle: z.string().min(1, "Content title is required"),
  contentText: z.string().min(1, "Content text is required"),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ title: string }> }
) {
  await connectDB();
  try {
    const { title: courseTitle } = await params;

    const body = await request.json();
    const { contentTitle, contentText } = contentSchema.parse(body);

    if (!courseTitle || !contentTitle || !contentText) {
      return NextResponse.json(
        {
          message: "All fields are required",
          error: "All fiels are required",
        },
        { status: 400 }
      );
    }

    const course = await Course.findOne({ title: courseTitle });
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const newContent = await Content.create({
      contentTitle,
      contentText,
      courseTitle: course.title.toString(),
    });

    return NextResponse.json(
      {
        message: "Content created successfully",
        content: newContent,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 }
      );
    }
    console.log("Content creation failed", error);
    return NextResponse.json(
      {
        message: "Content creation failed",
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ title: string }> }
) {
  await connectDB();
  try {
    const { title } = await params;
    const content = await Content.findOne({ courseTitle: title });
    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Content found", data: content },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.log("Content fetch failed", errorMessage);
    return NextResponse.json(
      { message: "Content fetch failed", error: "Internal server error" },
      { status: 500 }
    );
  }
}
