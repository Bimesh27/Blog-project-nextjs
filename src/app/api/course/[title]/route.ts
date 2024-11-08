import connectDB from "@/lib/mongoose";
import Course from "@/models/Course";
import { NextResponse } from "next/server";
import { z } from "zod";

const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  codeExample: z.string().min(1, "Code example is required"),
});


export async function PUT(
  request: Request,
  { params }: { params: Promise<{ title: string }> }
) {
  await connectDB();
  try {
    const { title: prevTitle } = await params;

    const body = await request.json();
    const { title, description, codeExample } = courseSchema.parse(body);

    if (!title && !description && !codeExample) {
      return NextResponse.json(
        {
          message: "Validation failed",
          error: "At least one field is required",
        },
        { status: 400 }
      );
    }

    const updatedCourse = await Course.findOne({ title: prevTitle });
    if (!updatedCourse) {
      return NextResponse.json(
        {
          message: "Course not found",
          error: "Course not found",
        },
        { status: 404 }
      );
    }

    if (title) updatedCourse.title = title;
    if (description) updatedCourse.description = description;
    if (codeExample) updatedCourse.codeExample = codeExample;

    await updatedCourse.save();

    return NextResponse.json(
      { message: "Course updated successfully", course: updatedCourse },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to Update courses", error);
    return NextResponse.json(
      {
        message: "Failed to Update courses",
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}


export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ title: string }> }
) {
  await connectDB();
  try {
    const { title } = await params;

    const courseToDelete = await Course.findOneAndDelete({ title });
    if (!courseToDelete) {
      return NextResponse.json(
        {
          message: "Course not found",
          error: "Course not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Course deleted successfully",
        deletedCourse: courseToDelete,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to delete courses", error);
    return NextResponse.json(
      {
        message: "Failed to delete courses",
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
