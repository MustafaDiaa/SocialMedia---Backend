import joi from "joi";
import { generalFields } from "./../../middleware/validation.js";

export const signup = {
  body: joi
    .object({
      username: joi.string().alphanum().min(3).max(25).required().messages({
        "string.empty": "Please fill in your username",
        "any.required": "Username is required",
      }),
      email: generalFields.email,
      password: generalFields.password,
      cPassword: generalFields.cPassword.valid(joi.ref("password")),
    })
    .required(),
};

export const login = {
  body: joi
    .object({
      email: generalFields.email,
      password: generalFields.password,
    })
    .required(),
};

export const sendForgetCode = {
  body: joi
    .object({
      email: generalFields.email,
    })
    .required(),
};

export const forgetPassword = {
  body: joi
    .object({
      forgetCode: joi
        .string()
        .pattern(new RegExp(/^[0-9]{4}$/))
        .required()
        .messages({
          "string.empty": "Please fill in your code",
          "any.required": "Code is required",
        }),
      email: generalFields.email,
      password: generalFields.password,
      cPassword: generalFields.cPassword.valid(joi.ref("password")),
    })
    .required(),
};
