import { Schema, model, Types } from "mongoose";
import mongoose from "mongoose";

const commentScheme = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
    },
    userID: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    postID: {
      type: Types.ObjectId,
      ref: "Post",
      required: true,
    },
    like: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    dislike: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    totalVote: { type: Number, default: 0 },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const commentModel = mongoose.models.Comment || model("Comment", commentScheme);
export default commentModel;
