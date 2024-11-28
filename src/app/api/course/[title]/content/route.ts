import connectDB from "@/lib/mongoose";
import Content from "@/models/Content";
import Course from "@/models/Course";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contentSchema = z.object({
  contentTitle: z.string().min(1, "Content title is required"),
  contentText: z.string().min(1, "Content text is required"),
});

const updateContentSchema = z
  .object({
    contentTitle: z.string().optional(),
    contentText: z.string().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
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
          error: "All fields are required",
        },
        { status: 400 }
      );
    }

    const course = await Course.findOne({ title: courseTitle });
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const isContentAlreadyExists = await Content.findOne({ contentTitle });
    if (isContentAlreadyExists) {
      return NextResponse.json(
        {
          message: "Content already exists",
          error: "Content already exists",
        },
        { status: 400 }
      );
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

    // Changed from findOne to find to return an array of contents
    const contents = await Content.find({ courseTitle: title });

    // Return empty array if no content found instead of 404
    if (!contents || contents.length === 0) {
      return NextResponse.json(
        { message: "No content found", data: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Content found", data: contents },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.log("Content fetch failed", errorMessage);
    return NextResponse.json(
      {
        message: "Content fetch failed",
        error: "Internal server error",
        data: [],
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  await connectDB();
  try {
    // Log the full request URL for debugging
    console.log("Request URL:", request.url);

    // Use URL to parse query parameters
    const url = new URL(request.url);
    const contentId = url.searchParams.get("contentId");

    if (!contentId) {
      return NextResponse.json(
        { message: "Content ID is required", error: "Content ID is required" },
        { status: 400 }
      );
    }

    // Parse the body safely
    let body;
    try {
      body = await request.json();
      console.log("Raw Request Body:", body);
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      return NextResponse.json(
        {
          message: "Invalid JSON",
          error: "Unable to parse request body",
        },
        { status: 400 }
      );
    }

    // Validate the body
    let validatedData;
    try {
      validatedData = updateContentSchema.parse(body);
      console.log("Validated Data:", validatedData);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        console.error("Zod Validation Errors:", validationError.errors);
        return NextResponse.json(
          {
            message: "Validation failed",
            errors: validationError.errors,
          },
          { status: 400 }
        );
      }
      throw validationError;
    }

    // Check if we have any data to update
    if (Object.keys(validatedData).length === 0) {
      return NextResponse.json(
        {
          message: "No update data provided",
          error: "At least one field must be updated",
        },
        { status: 400 }
      );
    }

    const updatedContent = await Content.findById(contentId);
    if (!updatedContent) {
      return NextResponse.json(
        { message: "Content not found", error: "Content not found" },
        { status: 404 }
      );
    }

    // Apply updates
    if (validatedData.contentTitle !== undefined) {
      updatedContent.contentTitle = validatedData.contentTitle;
    }
    if (validatedData.contentText !== undefined) {
      updatedContent.contentText = validatedData.contentText;
    }

    await updatedContent.save();

    return NextResponse.json(
      {
        message: "Content updated successfully",
        content: updatedContent,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Comprehensive Error:", error);
    return NextResponse.json(
      {
        message: "Failed to update content",
        error: errorMessage || "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  await connectDB();
  try {
    const url = new URL(request.url);
    const contentId = url.searchParams.get("contentId");

    if (!contentId) {
      return NextResponse.json(
        {
          message: "Content ID is required",
          error: "Content ID is required",
        },
        { status: 400 }
      );
    }

    const deletedContent = await Content.findByIdAndDelete(contentId);
    if (!deletedContent) {
      return NextResponse.json(
        { message: "Content not found", error: "Content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Content deleted successfully",
        content: deletedContent,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Comprehensive Error:", error);
    return NextResponse.json(
      {
        message: "Failed to delete content",
        error: errorMessage || "Internal server error",
      },
      { status: 500 }
    );
  }
}
