import mongoose, { Document } from "mongoose";

interface ICourse extends Document {
  title: string;
  description: string;
  codeExample: string;
  show: boolean;
}

const courseSchema = new mongoose.Schema<ICourse>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    default: "No description available",
  },
  codeExample: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
    default: true,
  }
  
});

const Course =
  mongoose.models.Course || mongoose.model<ICourse>("Course", courseSchema);

export default Course;
