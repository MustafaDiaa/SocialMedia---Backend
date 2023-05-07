import { model, Schema, Types } from "mongoose";
import mongoose from "mongoose";

const userScheme = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      default: "male",
      enum: ["male", "female"],
    },
    status: {
      type: String,
      default: "offline",
      enum: ["online", "offline", "blocked"],
    },
    forgetCode: {
      type: Number,
      default: null,
    },
    isLoggedIn: {
      type: Boolean,
      default: true,
    },
    changePasswordTime: Date,
    age: Number,
    phone: String,
    profilePic: Object,
    coverPic: Object,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userScheme.virtual("post", {
  localField: "_id",
  foreignField: "userID",
  ref: "Post",
});

const userModel = mongoose.models.User || model("User", userScheme);

export default userModel;
