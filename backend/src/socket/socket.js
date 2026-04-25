const onlineUsers = new Map();

const SocketHandler= (io) => {

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // -------------------------
    // 1. USER GOES ONLINE
    // -------------------------
    socket.on("setup", (userId) => {
      socket.join(userId);
      onlineUsers.set(userId, socket.id);

      io.emit("online_users", Array.from(onlineUsers.keys()));
    });
    // -------------------------
    // 2. JOIN CHAT ROOM
    // -------------------------
    socket.on("join_chat", (chatId) => {
      socket.join(chatId);
    });

    // -------------------------
    // 3. TYPING
    // -------------------------

    socket.on("typing", (chatId) => {
      socket.to(chatId).emit("typing");
    });

    socket.on("stop_typing", (chatId) => {
      socket.to(chatId).emit("stop_typing");
    });

    // -------------------------
    // 4. SEND MESSAGE
    // -------------------------
    socket.on("send_message", (message) => {
      socket.to(message.chat).emit("receive_message", message);
    });

     // -------------------------
    // 5. DISCONNECT
    // -------------------------
    socket.on("disconnect", () => {
      for (let [userId, id] of onlineUsers.entries()) {
        if (id === socket.id) {
          onlineUsers.delete(userId);
          break;
        }

          io.emit("online_users", Array.from(onlineUsers.keys()));
          console.log("User disconnected:", socket.id);
      }})

  });
};

export default SocketHandler;