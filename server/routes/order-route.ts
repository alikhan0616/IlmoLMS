import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createOrder } from "../controllers/order-controller";

const orderRouter = express.Router();

// Create Order
orderRouter.post("/create", isAuthenticated, createOrder);

export default orderRouter;
