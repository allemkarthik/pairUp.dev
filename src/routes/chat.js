const express = require("express");
const { Chat } = require("../models/chat");
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");

const chatRouter = express.Router();

//api for fetching messages
chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  const { targetUserId } = req.params;

  const userId = req.user._id;
  try {
    //find an exsiting chat
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName",
    });

    //if not then create one
    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
    }
    res.json(chat);
  } catch (err) {
    console.log(err);
  }
});

module.exports = chatRouter;

//endpoint for userdatails

chatRouter.get("/user/:userId", userAuth, async (req, res) => {
  const user = await User.findById(req.params.userId).select(
    "firstName lastName photoUrl",
  );
  res.json(user)
});
