import { verifyToken } from "../utils/generateAndVerifyToken.js";
import userModel from "./../../DB/models/User.model.js";

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    // check if the token and the bearer is valid
    if (!authorization?.startsWith(process.env.BEARER_KEY)) {
      return res.json({ message: "Invalid token" });
    }

    // get the token after spliting the bearer key from it
    const token = authorization.split(process.env.BEARER_KEY)[1];

    if (!token) {
      return res.json({ message: "Invalid token" });
    }

    const decoded = verifyToken({ token });

    if (!decoded?.id) {
      return res.json({ message: "Invalid token payload" });
    }

    const authUser = await userModel
      .findById(decoded.id)
      .select(
        "username email status role changePasswordTime isLoggedIn confirmEmail"
      );

    if (!authUser) {
      return res.json({ message: "Not registered account" });
    }

    if (!authUser.confirmEmail)
      return next(new Error("Please confirm your Email"));

    if (!authUser.isLoggedIn)
      return next(new Error("Please Login", { cause: 400 }));

    if (authUser.changePasswordTime?.getTime() / 1000 > decoded.iat)
      return next(new Error("Expired token", { cause: 400 }));
    req.user = authUser;
    return next();
  } catch (error) {
    return res.json({
      message: "Catch error",
      err: error?.message,
      stack: error.stack,
    });
  }
};

export default auth;
