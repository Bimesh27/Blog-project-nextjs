import connectDB from "@/lib/mongoose";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ title: string }> }
) {
  await connectDB();
  try {
    const { title } = await params;
    const courseToToggle = await Course.findOne({ title });
    if (!courseToToggle) {
      return NextResponse.json(
        {
          message: "Course not found",
          error: "Course not found",
        },
        { status: 404 }
      );
    }

    if (courseToToggle.show === false) {
      courseToToggle.show = true;
    } else {
      courseToToggle.show = false;
    }

    await courseToToggle.save();

    return NextResponse.json(
      {
        message: `Course visibility set to ${courseToToggle.show}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to Toggle courses", error);
    return NextResponse.json(
      {
        message: "Failed to Toggle courses",
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
