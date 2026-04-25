import  Chat  from "../models/Chat.js";
import  User  from "../models/User.js";

// GET ALL CHATS
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: req.user._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    // Populate sender inside latestMessage
    const populatedChats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name email avatar",
    });

    return res.status(200).json({
      success: true,
      chats: populatedChats,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting chats" });
  }
};

// ACCESS OR CREATE 1:1 CHAT
export const accessChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "UserId is required",
      });
    }

    // Check if chat already exists
    let chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [req.user._id, userId] },
    })
      .populate("users", "-password")
      .populate("latestMessage");

    if (chat) {
      return res.status(200).json(chat);
    }

    // Create new chat
    const newChat = await Chat.create({
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    });

    const fullChat = await Chat.findById(newChat._id)
      .populate("users", "-password");

    return res.status(201).json(fullChat);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error accessing chat" });
  }
};

// CREATE GROUP CHAT
export const createGroupChat = async (req, res) => {
  try {
    const { users, name } = req.body;

    if (!users || !name) {
      return res.status(400).json({
        message: "Users and name are required",
      });
    }

    let parsedUsers = JSON.parse(users);

    if (parsedUsers.length < 2) {
      return res.status(400).json({
        message: "Group chat must have at least 3 users",
      });
    }

    // Add current user
    parsedUsers.push(req.user);

    const groupChat = await Chat.create({
      chatName: name,
      isGroupChat: true,
      users: parsedUsers,
      groupAdmin: req.user._id,
    });

    const fullGroupChat = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(201).json(fullGroupChat);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating group chat" });
  }
};
