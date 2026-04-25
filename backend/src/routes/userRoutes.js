import express from "express";
const router = express.Router();

import { searchUsers, getUserById } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

// All routes protected
router.use(isAuthenticated);

// Search users
router.get("/", searchUsers);

// Get single user (optional)
router.get("/:id", getUserById);

export default router;
