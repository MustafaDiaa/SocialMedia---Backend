import postModel from "./../../../../DB/models/Post.model.js";
import { asyncHandler } from "./../../../utils/errorHandling.js";
import cloudinary from "./../../../utils/cloudinary.js";
import userModel from "./../../../../DB/models/User.model.js";
import commentModel from "./../../../../DB/models/Comment.model.js";

export const homePage = async (req, res, next) => {
  const cursor = postModel
    .find({ postPrivacy: "public" })
    .populate([
      {
        path: "userID",
        select: "username profilePic",
      },
      {
        path: "like",
        select: "username profilePic",
      },
      {
        path: "dislike",
        select: "username profilePic",
      },
    ])
    .cursor();

  const postList = [];
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    const comment = await commentModel.find({ postID: doc._id });
    postList.push({ post: doc, comment });
  }

  return res.status(200).json({ message: "Done", postList });
};

export const createPost = asyncHandler(async (req, res, next) => {
  const { title, description, postPrivacy } = req.body;
  const { _id } = req.user;

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: "Post" }
  );
  const post = await postModel.create({
    title,
    description,
    postPrivacy,
    image: { secure_url, public_id },
    userID: _id,
  });

  await userModel.findByIdAndUpdate({ _id: req.user._id }, { $push: { post } });

  return res.status(200).json({ message: "Done", post });
});

export const updatePost = asyncHandler(async (req, res, next) => {
  const { title, description, postPrivacy } = req.body;
  const { _id } = req.user;
  const { postID } = req.params;

  const post = await postModel.findOneAndUpdate(
    { userID: _id, _id: postID },
    req.body,
    {
      new: true,
    }
  );

  if (!post) return next(new Error("Invalid Post ID"), { cause: 400 });

  return res.status(200).json({ message: "Done", post });
});

export const deletePost = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;

  const post = await postModel.findOneAndDelete({
    userID: _id,
    _id: id,
  });

  if (!post)
    return next(new Error("Invalid Post ID or Not authorized", { cause: 400 }));

  return res.status(200).json({ message: "Done" });
});

export const likePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;

  const post = await postModel.findOneAndUpdate(
    { _id: id },
    {
      $addToSet: { like: _id },
      $pull: { dislike: _id },
    },
    {
      new: true,
    }
  );

  if (!post) return next(new Error("Invalid Post ID", { cause: 400 }));
  post.totalVote = post.like.length - post.dislike.length;
  await post.save();

  return res.status(201).json({ message: "Done", post });
});

export const dislike_Post = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;

  const post = await postModel.findOneAndUpdate(
    { _id: id },
    {
      $addToSet: { dislike: _id },
      $pull: { like: _id },
    },
    {
      new: true,
    }
  );

  if (!post) return next(new Error("Invalid Post ID", { cause: 400 }));
  post.totalVote = post.like.length - post.dislike.length;
  await post.save();

  return res.status(200).json({ message: "Done", post });
});
