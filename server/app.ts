require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user-route";
import courseRouter from "./routes/course-route";
import orderRouter from "./routes/order-route";
import notificationRouter from "./routes/notification-route";
import analyticsRouter from "./routes/analytics-route";

// Body Parser
app.use(express.json({ limit: "50mb" }));

// Cookie Parser
app.use(cookieParser());

// CORS Config
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true, // Allow cookies to be sent
  })
);

// Routes
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/order", orderRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/analytics", analyticsRouter);

// Testing API
app.get("/test", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "The Api Endpoint is working fine",
  });
});

// Unknown Route
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found!`) as any;
  err.statusCode = 404;
  next(err);
});

// Error Handler Middleware
app.use(ErrorMiddleware);
