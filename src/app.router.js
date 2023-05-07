import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";
import postRouter from "./modules/post/post.router.js";
import connectDB from "./../DB/connection.js";
import { globalErrorHandling } from "./utils/errorHandling.js";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fullPath = path.join(__dirname, "./uploads");

const initApp = (app, express) => {
  app.use(express.json({}));

  app.get("/", (req, res) => res.send("Hello World!"));

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/post", postRouter);
  app.use("/uploads", express.static(fullPath));

  app.use("*", (req, res) => {
    return res.json({ message: "404 Page Not Found" });
  });

  app.use(globalErrorHandling);
  connectDB();
};

export default initApp;
