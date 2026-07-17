const socket = require("socket.io");
const cors = require("cors");
const crypto = require("crypto");
const { Chat } = require("../models/chat");

//create a secretroom id
const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    //handle events

    //join chat event
    socket.on("joinChat", ({ userId, targetUserId }) => {
      //create a seperate room for individual people
      //This is unquie room id && used sort for ensure when two people roomId will be same
      const roomId = getSecretRoomId(userId, targetUserId);
    

      socket.join(roomId);
    });

    //sending messages event
    socket.on("sendMessage", async ({ firstName, userId, targetUserId, text }) => {
      //send to particular room
      const roomId = getSecretRoomId(userId, targetUserId);

      //save message to the databases
      try{
        //find if exisitng chat is there
        let chat= await Chat.findOne({
          participants:{$all:[userId,targetUserId]},
        })
        //if not found create a new one
        if(!chat){
          chat = new Chat({
            participants:[userId, targetUserId],
            messages:[],
          })

        }
        //push messages
        chat.messages.push({
          senderId: userId,
          text,
        })

        //save
        await chat.save()
      }catch(err){
        console.log(err);
        
      }

      io.to(roomId).emit("messageRecevied", { firstName, text });
    });

    //disconnect event
    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
