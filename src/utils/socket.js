const socket = require("socket.io");
const cors = require("cors");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    //handle events
    socket.on("joinChat", ({ userId, targetUserId }) => {
        //create a seperate room for individual people
        //This is unquie room id && used sort for ensure when two people roomId will be same
        const roomId = [userId, targetUserId].sort().join("_");  
        console.log("room"+roomId);
        
        socket.join(roomId)
    });
    socket.on("sendMessage", () => {});
    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
