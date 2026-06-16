const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();

// get all pending connection requests for login users
userRouter.get("/user/allrequests/received", userAuth, async (req, res) => {
  try {
    const loginUser = req.user;

    const allConnectionrequests = await ConnectionRequestModel.find({
      toUserId: loginUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "skills",
      "about",
    ]);

    res.json({ message: "all connections", data: allConnectionrequests });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// get all connections
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const logginUser = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        { toUserId: logginUser._id, status: "accepted" },
        { fromUserId: logginUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "skills",
        "about",
      ])
      .populate("toUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "skills",
        "about",
      ]);

    // only fetch user data
    const data = connectionRequests.map((every) => {
      if (every.fromUserId._id.toString() === logginUser._id.toString()) {
        return every.toUserId;
      }
      return every.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// feed api
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    //pagination
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    // find all connection requests (send and recevied)
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    //   hide user => user=> connections , recevied connections, sended connections, already friends
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((request) => {
      hideUsersFromFeed.add(request.fromUserId.toString());
      hideUsersFromFeed.add(request.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select("firstName lastName emailId photoUrl skills about age gender")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({ data: users, page, hasMore: users.length === limit });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = userRouter;
