import express from "express";
const router = express.Router();

import { sendMessage, getMessages } from "../controllers/messageController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

// protect all message routes
router.use(isAuthenticated);

// send message
router.post("/send", sendMessage);

// get all messages of a chat
router.get("/:chatId", getMessages);

export default router;
