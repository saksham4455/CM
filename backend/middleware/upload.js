import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../lib/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "cynet_payments",
    format: "png",
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

export const upload = multer({ storage });