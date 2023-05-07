import { Router } from "express";
import * as postController from "./controller/post.js";
import * as commentController from "./controller/comment.js";
import auth from "./../../middleware/auth.middleware.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import validation from "./../../middleware/validation.js";
import * as validators from "./post.validation.js";

const router = Router();

// POST SECTION
router.get("/", postController.homePage); // All public posts are shown in the home page
router.post(
  "/",
  auth,
  fileUpload(fileValidation.image).single("image"),
  validation(validators.createPost),
  postController.createPost
);
router.put(
  "/:postID",
  auth,
  fileUpload(fileValidation.image).single("image"),
  validation(validators.updatePost),
  postController.updatePost
);
router.delete(
  "/:id",
  auth,
  validation(validators.like_dislike_post),
  postController.deletePost
);
router.patch(
  "/:id/like",
  auth,
  validation(validators.like_dislike_post),
  postController.likePost
);
router.patch(
  "/:id/dislike",
  auth,
  validation(validators.like_dislike_post),
  postController.dislike_Post
);

// COMMENT SECTION
router.post(
  "/:id/comment",
  auth,
  fileUpload(fileValidation.image).single("image"),
  validation(validators.createComment),
  commentController.createComment
);

router.delete(
  "/:postID/comment/:commentID",
  auth,
  validation(validators.deleteComment),
  commentController.deleteComment
);

export default router;
