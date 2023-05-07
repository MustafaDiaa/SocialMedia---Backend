// import multer from "multer";
// import { nanoid } from "nanoid";
// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// export const fileValidation = {
//   image: ["image/gif", "image/png", "image/jpeg", "image/jpg"],
//   file: ["application/pdf", "application/msword"],
// };

// export function fileUpload(customPath = "general", customValidation = []) {
//   console.log({ DIR: __dirname });
//   const fullPath = path.join(__dirname, `../uploads/${customPath}`);

//   if (!fs.existsSync(fullPath)) {
//     fs.mkdirSync(fullPath, { recursive: true });
//   }
//   console.log({ fullPath });

//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, fullPath);
//     },
//     filename: (req, file, cb) => {
//       const suffixName = nanoid() + "_" + file.originalname;
//       file.dest = `/uploads/${customPath}/${suffixName}`;
//       cb(null, suffixName);
//     },
//     // limits: { fileSize: maxSize },
//   });

//   function fileFilter(req, file, cb) {
//     if (customValidation.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb("Invalid formate", false);
//     }
//   }

//   const upload = multer({ dest: "uploads", fileFilter, storage });
//   return upload;
// }

// CLOUDINARY
import multer from "multer";

export const fileValidation = {
  image: ["image/gif", "image/png", "image/jpeg", "image/jpg"],
  file: ["application/pdf", "application/msword"],
  video: ["video/mp4"],
};

export function fileUpload(customValidation = []) {
  const storage = multer.diskStorage({});

  function fileFilter(req, file, cb) {
    if (customValidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb("Invalid file format", false);
    }
  }

  const upload = multer({ dest: "uploads", fileFilter, storage });
  return upload;
}
