import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
} from "../controllers/user-controller";
import {
  authorizeRoles,
  isAuthenticated,
  updateAccessToken,
} from "../middleware/auth";
const userRouter = express.Router();

// User Registration
userRouter.post(`/registration`, registrationUser);

// User Activation
userRouter.post(`/activation`, activateUser);

// User Login
userRouter.post("/login", loginUser);

// User Logout
userRouter.get("/logout", isAuthenticated, logoutUser);

// User's Refresh Token
userRouter.get("/refresh-token", updateAccessToken);

// Get User's Data
userRouter.get("/me", isAuthenticated, getUserInfo);

// Social Authentication
userRouter.post("/social-auth", socialAuth);

// Update User's Info
userRouter.put("/update-info", isAuthenticated, updateUserInfo);

// Update User's Password
userRouter.put("/update-password", isAuthenticated, updatePassword);

// Update User's Avatar
userRouter.put("/update-avatar", isAuthenticated, updateProfilePicture);

// Get All Users (Admin)
userRouter.get(
  "/get-all",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);

// Update User Role (Admin)
userRouter.put(
  "/update-role",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);

// Delete User (Admin)
userRouter.delete(
  "/delete/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);
export default userRouter;
