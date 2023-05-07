import joi from "joi";
import { Types } from "mongoose";
const dataMethods = ["body", "query", "params", "file"];

const validateObjectID = (value, helper) => {
  return Types.ObjectId.isValid(value)
    ? true
    : helper.message("Invalid Object ID");
};

export const generalFields = {
  username: joi.string().min(3).max(30),
  age: joi.number().min(10).max(80),
  phone: joi.string().min(11).max(11),
  password: joi
    .string()
    .pattern(
      new RegExp(
        /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/
      )
    )
    .required(),
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ["com", "net", "edu"] },
    })
    .required(),
  cPassword: joi.string().required(),
  id: joi.string().custom(validateObjectID).required(),
  file: joi.object({
    size: joi.number().positive().required(),
    path: joi.string().required(),
    filename: joi.string().required(),
    destination: joi.string().required(),
    mimetype: joi.string().required(),
    encoding: joi.string().required(),
    originalname: joi.string().required(),
    fieldname: joi.string().required(),
    dest: joi.string(),
  }),
};

const validation = (schema) => {
  return (req, res, next) => {
    const validationArray = [];

    dataMethods.forEach((key) => {
      if (schema[key]) {
        const validationResult = schema[key].validate(req[key], {
          abortEarly: false,
        });
        if (validationResult.error)
          validationArray.push(validationResult.error.details);
      }
    });

    if (validationArray.length > 0)
      return res
        .status(400)
        .json({ message: "Validation error", validationArray });
    else return next();
  };
};

export default validation;
