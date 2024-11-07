import connectDB from "@/lib/mongoose";
import Course from "@/models/Course";
import { NextResponse } from "next/server";
import { z } from "zod";

const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  codeExample: z.string().min(1, "Code example is required"),
});

export async function POST(request: Request) {
  await connectDB();
  try {
    const body = await request.json();
    const { title, description, codeExample } = courseSchema.parse(body);

    const newCourse = await Course.create({
      title,
      description,
      codeExample,
    });

    return NextResponse.json(
      {
        message: "Course created successfully",
        course: newCourse,
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
    console.log("Course creation failed", error);
    return NextResponse.json(
      {
        message: "Course creation failed",
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();
  try {
    const courses = await Course.find({});
    return NextResponse.json(
      { message: "Courses retrived successfully", courses: courses },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to fetch courses", error);
    return NextResponse.json(
      {
        message: "Failed to fetch courses",
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
