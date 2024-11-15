import mongoose, { Schema } from "mongoose";

interface IContent extends Document {
  contentTitle: string;
  contentText: string;
  courseTitle: string;
}

const contentSchema = new Schema<IContent>({
  contentTitle: {
    type: String,
    required: true,
  },
  contentText: {
    type: String,
    required: true,
  },
  courseTitle: {
    type: String,
    required: true,
  },
});

const Content =
  mongoose.models.Content || mongoose.model<IContent>("Content", contentSchema);

export default Content;
