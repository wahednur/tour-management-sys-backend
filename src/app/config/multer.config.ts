import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    public_id: (req, file) => {
      const originalName = file.originalname.toLowerCase();
      const extension = originalName.split(".").pop();

      const baseName = originalName
        .substring(0, originalName.lastIndexOf("."))
        .replace(/\s+/g, "-")
        // eslint-disable-next-line no-useless-escape
        .replace(/[^a-z0-9\-]/g, "");

      const uniqueFileName =
        Math.random().toString(36).substring(2) +
        "-" +
        Date.now() +
        "-" +
        baseName +
        "." +
        extension;

      return uniqueFileName;
    },
  },
});

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinaryUpload,
//   params: {
//     public_id: (req, file) => {
//       const fileName = file.originalname
//         .toLowerCase()
//         .replace(/\s+/g, "-") // Replace spaces with dashes
//         .replace(/\./g, "-") // Replace dots with dashes
//         /* eslint-disable no-useless-escape */
//         .replace(/[^a-z0-9\-]/g, "");
//       const extension = file.originalname.split(".").pop();
//       const uniqueFIleName =
//         Math.random().toString(36).substring(2) +
//         "-" +
//         Date.now() +
//         "-" +
//         fileName +
//         "." +
//         extension;
//       return uniqueFIleName;
//     },
//   },
// });

export const multerUpload = multer({ storage: storage });
