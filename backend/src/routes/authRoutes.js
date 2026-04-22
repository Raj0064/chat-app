import express from "express";
const router=express.Router();

import {register, Login, LogOut} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { checkAuth } from "../controllers/authController.js";

router.post("/register",register);
router.post("/login",Login);
router.get("/logout",LogOut);

router.get("/me", isAuthenticated, checkAuth);

export default router;