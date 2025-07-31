import { app } from "./app";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./utils/db";
require("dotenv").config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_SECRET_KEY as string,
});
// create server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});
