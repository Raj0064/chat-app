import express from "express";
const router=express.Router();

import {createChat, createGroupChat, getChats} from"../controllers/chatController.js";
import {isAuthenticated } from "../middlewares/isAuthenticated.js";

router.use(isAuthenticated);
router.get("/",getChats)
router.post("/create",createChat);
router.post("/group", createGroupChat);

export default router;