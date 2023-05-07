import joi from "joi";
import { generalFields } from "./../../middleware/validation.js";

export const createPost = {
  body: joi
    .object({
      title: joi.string().min(5).max(1500).required(),
      description: joi.string().min(5).max(15000),
      postPrivacy: joi.string().valid("public", "onlyMe"),
    })
    .required(),
  file: generalFields.file.required(),
};

export const updatePost = {
  body: joi
    .object({
      title: joi.string().min(5).max(1500).required(),
      description: joi.string().min(5).max(15000),
      postPrivacy: joi.string().valid("public", "onlyMe"),
    })
    .required(),
  params: joi
    .object({
      postID: generalFields.id,
    })
    .required(),
};

export const like_dislike_post = {
  params: joi
    .object({
      id: generalFields.id,
    })
    .required(),
};

export const createComment = {
  body: joi
    .object({
      text: joi.string().min(5).max(15000).required(),
    })
    .required(),
  params: joi
    .object({
      id: generalFields.id,
    })
    .required(),
  file: generalFields.file,
};

export const deleteComment = {
  params: joi
    .object({
      postID: generalFields.id,
      commentID: generalFields.id,
    })
    .required(),
};
