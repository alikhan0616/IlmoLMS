import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  getCoursesAnalytics,
  getOrdersAnalytics,
  getUsersAnalytics,
} from "../controllers/analytics-controller";

const analyticsRouter = express.Router();

// Get User's Analytics (Admin)
analyticsRouter.get(
  "/users",
  isAuthenticated,
  authorizeRoles("admin"),
  getUsersAnalytics
);

// Get Course's Analytics (Admin)
analyticsRouter.get(
  "/courses",
  isAuthenticated,
  authorizeRoles("admin"),
  getCoursesAnalytics
);

// Get Order's Analytics (Admin)
analyticsRouter.get(
  "/orders",
  isAuthenticated,
  authorizeRoles("admin"),
  getOrdersAnalytics
);
export default analyticsRouter;
