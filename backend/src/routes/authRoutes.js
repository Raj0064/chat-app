import express from "express";
const router = express.Router();

import {
  register,
  login,
  logout,
  checkAuth,
} from "../controllers/authController.js";

import { isAuthenticated } from "../middlewares/isAuthenticated.js";

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", isAuthenticated, checkAuth);

export default router;
