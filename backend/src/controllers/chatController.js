import {Chat} from "../models/Chat.js"

// GET ALL CHATS
export const getChats = async (req, res) => {
  try {
    // const chats = await Chat.find({users:req.user._id}).populate("users");
    const chats = await Chat.find({
      users: req.user.id
    }).populate("users");
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting chat" });
  }
};

// CREATE NORMAL CHAT
export const createChat = async (req, res) => {
  try {
    const { users, name } = req.body;
    const chat = await Chat.create({
      users,
      name,
      isGroup: false,
    });

    res.status(201).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating chat" });
  }
};

// CREATE GROUP CHAT
export const createGroupChat = async (req, res) => {
  try {
    const { users, name, admin } = req.body;

    const groupChat = await Chat.create({
      users,
      name,
      isGroup: true,
      admin,
    });

    res.status(201).json(groupChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error creating group chat" });
  }
};
