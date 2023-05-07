import cloudinary from "./../../../utils/cloudinary.js";
import commentModel from "./../../../../DB/models/Comment.model.js";
import postModel from "./../../../../DB/models/Post.model.js";
import { asyncHandler } from "./../../../utils/errorHandling.js";

export const createComment = asyncHandler(async (req, res, next) => {
  req.body.userID = req.user._id;
  req.body.postID = req.params.id;

  const post = await postModel.findById(req.params.id);

  if (!post) return next(new Error("Invalid Post ID", { cause: 400 }));

  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `Post/${req.params.id}/comment` }
    );
    req.body.image = { secure_url, public_id };
  }

  const comment = await commentModel.create(req.body);

  return res.status(201).json({ message: "Done", comment });
});

export const deleteComment = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { postID } = req.params;
  const { commentID } = req.params;

  const post = await postModel.findById(postID);
  if (!post) return next(new Error("Invalid Post ID", { cause: 400 }));

  let comment = await commentModel.findById(commentID);
  if (!comment) return next(new Error("Invalid Comment ID", { cause: 400 }));

  comment = await commentModel.findOneAndDelete({
    _id: commentID,
    userID: _id,
  });
  if (!comment)
    return next(
      new Error("Invalid Comment ID or Not authorized", { cause: 400 })
    );

  return res.status(201).json({ message: "Done", comment });
});
