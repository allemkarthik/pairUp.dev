const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequest");

const userRouter = express.Router();

// get all pending connection requests for login users
userRouter.get("/user/allrequests/received", userAuth, async (req, res) => {
  try {
    const loginUser = req.user;

    const allConnectionrequests = await ConnectionRequestModel.find({
      toUserId: loginUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "skills", "about"]);


    res.json({ message: "all connections", data: allConnectionrequests });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = userRouter;
