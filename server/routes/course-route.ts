import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { editCourse, uploadCourse } from "../controllers/course-controller";

const courseRouter = express.Router();

courseRouter.post(
  "/create",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);
courseRouter.put(
  "/update/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);

export default courseRouter;
