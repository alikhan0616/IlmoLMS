import express from "express";
import {
  activateUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updatePassword,
  updateUserInfo,
} from "../controllers/user-controller";
import { isAuthenticated, updateAccessToken } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post(`/registration`, registrationUser);

userRouter.post(`/activation`, activateUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", isAuthenticated, logoutUser);

userRouter.get("/refresh-token", updateAccessToken);

userRouter.get("/me", isAuthenticated, getUserInfo);

userRouter.post("/social-auth", socialAuth);

userRouter.put("/update-info", isAuthenticated, updateUserInfo);

userRouter.put("/update-password", isAuthenticated, updatePassword);

export default userRouter;
