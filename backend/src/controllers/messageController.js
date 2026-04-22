import {Message} from "../models/Message.js"

export const sendMessage=async (req,res)=>{
  const {sender,chatId,content}=req.body;

const message = await Message.create({
  sender ,chatId, content
});


//emit for socket.io
req.io.to(chatId).emit("receive_message",message);

res.json(message);

};

//Get all messages of a chat
export const getMessages = async (req,res)=>{
  const messages = await Message.find(
    {
      chatId: req.params.chatId,
    })
  // .populate("sender", "name email")
  // .populate("chat");
  
  res.json(messages);
}
