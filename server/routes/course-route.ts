import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  editCourse,
  getAllCourses,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course-controller";

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
courseRouter.get("/get/:id", getSingleCourse);
courseRouter.get("/get-all", getAllCourses);

export default courseRouter;
