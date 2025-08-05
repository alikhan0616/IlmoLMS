import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification-controller";

const notificationRouter = express.Router();

// Get All Notifications for Admin
notificationRouter.get(
  "/get-all",
  isAuthenticated,
  authorizeRoles("admin"),
  getNotifications
);

// Update Notification for Admin
notificationRouter.put(
  "/update/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotification
);

export default notificationRouter;
