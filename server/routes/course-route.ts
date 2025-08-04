import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  addAnswer,
  addQuestion,
  editCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course-controller";

const courseRouter = express.Router();

// Create Course
courseRouter.post(
  "/create",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);

// Edit/Update Course
courseRouter.put(
  "/update/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);
//Get Single Course (Unverified)
courseRouter.get("/get/:id", getSingleCourse);

//Get All Courses (Unverified)
courseRouter.get("/get-all", getAllCourses);

//Get Course Content (Purchased)
courseRouter.get("/get-course-content/:id", isAuthenticated, getCourseByUser);

//Post Question on Course Contant
courseRouter.put("/add-question", isAuthenticated, addQuestion);

//Post Answer on a Question
courseRouter.put("/add-answer", isAuthenticated, addAnswer);

export default courseRouter;
