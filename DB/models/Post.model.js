import { Schema, model, Types } from "mongoose";
import mongoose from "mongoose";

const postScheme = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: {
      type: Object,
      required: true,
    },
    userID: {
      type: Types.ObjectId,
      ref: "User",
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
    postPrivacy: {
      type: String,
      default: "public",
      enum: ["public", "onlyMe"],
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.models.Post || model("Post", postScheme);
export default postModel;
