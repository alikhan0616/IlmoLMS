import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  createLayout,
  getLayoutByType,
  updateLayout,
} from "../controllers/layout-controller";

const layoutRouter = express.Router();

// Create Layout (Admin)
layoutRouter.post(
  "/create",
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout
);

// Update Layout (Admin)
layoutRouter.put(
  "/update",
  isAuthenticated,
  authorizeRoles("admin"),
  updateLayout
);

// Get Layout
layoutRouter.get("/get", getLayoutByType);

export default layoutRouter;
