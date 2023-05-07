import userModel from "../../../../DB/models/User.model.js";
import { hash, compare } from "./../../../utils/hashAndCompare.js";
import { asyncHandler } from "./../../../utils/errorHandling.js";
import cloudinary from "../../../utils/cloudinary.js";
import postModel from "./../../../../DB/models/Post.model.js";

export const getUserModel = (req, res, next) => {
  return res.json({ message: "User Module" });
};

export const profile = async (req, res, next) => {
  const user = await userModel.findById(req.user._id).populate({
    path: "post",
  });
  return res.json({ message: "Done", user });
};

export const profilePic = asyncHandler(async (req, res, next) => {
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `user/${req.user._id}/profilePic` }
  );

  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      profilePic: { secure_url, public_id },
    },
    { new: true }
  );

  return res.json({ message: "Done", user });
});

export const coverPic = asyncHandler(async (req, res, next) => {
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `user/${req.user._id}/coverPic` }
  );

  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      coverPic: { secure_url, public_id },
    },
    { new: true }
  );

  return res.json({ message: "Done", user });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const user = await userModel.findById(req.user._id);
  const match = compare({ plaintext: oldPassword, hashValue: user.password });

  if (!match) return next(new Error("Invalid old password", { cause: 400 }));

  const hashPassword = hash({ plaintext: newPassword });
  user.password = hashPassword;
  await user.save();

  return res.status(200).json({ message: "Done" });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);

  if (!user) return next(new Error("User not found", { cause: 400 }));

  const updatedUser = await userModel
    .findByIdAndUpdate(req.user._id, req.body, { new: true })
    .select("-password");

  return res.status(200).json({ message: "Done", updatedUser });
});

export const deleteProfile = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);

  if (!user) return next(new Error("User not found", { cause: 400 }));

  const deleteUser = await userModel.findByIdAndDelete(req.user._id, req.body, {
    new: true,
  });

  return res.status(200).json({ message: "Done", deleteUser });
});

export const shareProfile = asyncHandler(async (req, res, next) => {
  const user = await userModel
    .findById(req.params.id)
    .select("username email profilePic firstName lastName");

  return user
    ? res.status(200).json({ message: "Done", user })
    : next(new Error("Invalid ID", { cause: 404 }));
});
