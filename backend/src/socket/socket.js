export default (io) => {
  
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_chat", (chatId) => {
      socket.join(chatId);
    });

    // socket.on("send_message", (data) => { 
    //   io.to(data.chatId).emit("receive_message", data);
    // });

    socket.on("disconnect", () => {
      console.log("User Disconnected");
    });
  });
};
