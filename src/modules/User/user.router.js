import Router from "express";
import * as userController from "./controller/user.js";
import auth from "./../../middleware/auth.middleware.js";
import validation from "./../../middleware/validation.js";
import * as validators from "./user.validation.js";
import { fileUpload, fileValidation } from "./../../utils/multer.js";

const router = Router();

router.get("/", userController.getUserModel);

router.patch(
  "/profilePic",
  auth,
  fileUpload(fileValidation.image).single("image"),
  validation(validators.profilePic),
  userController.profilePic
);
router.patch(
  "/coverPic",
  fileUpload(fileValidation.image).single("image"),
  auth,
  userController.coverPic
);

router.get("/profile", auth, userController.profile);
router.get(
  "/:id/profile",
  validation(validators.shareProfile),
  userController.shareProfile
);
router.patch(
  "/password",
  validation(validators.updatePassword),
  auth,
  userController.updatePassword
);

router.put(
  "/",
  validation(validators.updateProfile),
  auth,
  userController.updateProfile
);

router.delete("/", auth, userController.deleteProfile);

export default router;
