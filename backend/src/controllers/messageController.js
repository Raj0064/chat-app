import  Message  from "../models/Message.js";
import  Chat from "../models/Chat.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      return res.status(400).json({
        message: "Content and chatId are required",
      });
    }

    // Create message (use logged-in user)
    let message = await Message.create({
      sender: req.user._id,
      content,
      chat: chatId,
    });

    // Populate sender + chat
    message = await message.populate("sender", "name email avatar");
    message = await message.populate("chat");

    // Update latestMessage in chat
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message._id,
    });

    // Emit via socket
    req.io.to(chatId).emit("receive_message", message);

    return res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error sending message",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({
      chat: chatId,
    })
      .populate("sender", "name email avatar")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching messages",
    });
  }
};