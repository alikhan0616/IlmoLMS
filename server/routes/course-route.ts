import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  addAnswer,
  addQuestion,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  getAllCourses,
  getAllCoursesComplete,
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

//Post Review on a Course
courseRouter.put("/add-review/:id", isAuthenticated, addReview);

//Post Reply to Review
courseRouter.put(
  "/add-reply-review",
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyToReview
);

// Get All Courses (Admin)
courseRouter.get(
  "/get",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCoursesComplete
);

// Delete User (Admin)
courseRouter.delete(
  "/delete/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCourse
);
export default courseRouter;
