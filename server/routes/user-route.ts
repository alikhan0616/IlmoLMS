import express from "express";
import {
  activateUser,
  loginUser,
  logoutUser,
  registrationUser,
} from "../controllers/user-controller";
import { isAuthenticated, updateAccessToken } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post(`/registration`, registrationUser);

userRouter.post(`/activation`, activateUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", isAuthenticated, logoutUser);

userRouter.get("/refresh-token", updateAccessToken);

export default userRouter;
