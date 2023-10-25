import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      
    },
    body: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Post', PostSchema);