import express from "express";
const router = express.Router();

import { sendMessage, getMessages,} from "../controllers/messageController.js";
import  { isAuthenticated } from "../middlewares/isAuthenticated.js";

router.post("/send", sendMessage);
router.get("/:chatId", getMessages);

export default router;
