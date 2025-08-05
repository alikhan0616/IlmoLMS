import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createOrder, getAllOrders } from "../controllers/order-controller";

const orderRouter = express.Router();

// Create Order
orderRouter.post("/create", isAuthenticated, createOrder);

// Get All Orders (Admin)
orderRouter.get(
  "/get-all",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);
export default orderRouter;
