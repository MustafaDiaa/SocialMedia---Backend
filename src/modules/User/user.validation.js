import joi from "joi";
import { generalFields } from "./../../middleware/validation.js";

export const profilePic = {
  file: generalFields.file.required(),
};

export const updatePassword = {
  body: joi
    .object({
      oldPassword: generalFields.password,
      newPassword: generalFields.password.invalid(joi.ref("oldPassword")),
      cPassword: generalFields.cPassword.valid(joi.ref("newPassword")),
    })
    .required(),
};

export const shareProfile = {
  params: joi
    .object({
      id: generalFields.id,
    })
    .required(),
};

export const updateProfile = {
  body: joi.object({
    username: generalFields.username,
    age: generalFields.age,
    phone: generalFields.phone,
  }),
};
