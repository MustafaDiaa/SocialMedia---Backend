import Router from "express";
import * as authController from "./controller/auth.js";
import { asyncHandler } from "./../../utils/errorHandling.js";
import validation from "./../../middleware/validation.js";
import * as validators from "./auth.validation.js";
import auth from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authController.getAuthModule);
router.get("/confirmEmail/:token", authController.confirmEmail);
router.get("/newConfirmEmail/:token", authController.newConfirmEmail);

router.post("/signup", validation(validators.signup), authController.signup);
router.post("/login", validation(validators.login), authController.login);
router.patch("/logout", auth, authController.logout);

router.patch(
  "/sendForgetCode",
  validation(validators.sendForgetCode),
  authController.sendForgetCode
);

router.put(
  "/forgetPassword",
  validation(validators.forgetPassword),
  authController.forgetPassword
);

export default router;
