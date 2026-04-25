import express from "express";
const router = express.Router();

import {
  accessChat,
  createGroupChat,
  getChats,
} from "../controllers/chatController.js";

import { isAuthenticated } from "../middlewares/isAuthenticated.js";

router.use(isAuthenticated);

router.get("/", getChats);
router.post("/", accessChat); // 1:1 chat
router.post("/group", createGroupChat);

export default router;
