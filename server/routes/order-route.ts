import express from "express";
import {
  authorizeRoles,
  isAuthenticated,
  updateAccessToken,
} from "../middleware/auth";
import { createOrder, getAllOrders } from "../controllers/order-controller";

const orderRouter = express.Router();

// Create Order
orderRouter.post("/create", updateAccessToken, isAuthenticated, createOrder);

// Get All Orders (Admin)
orderRouter.get(
  "/get-all",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);
export default orderRouter;
