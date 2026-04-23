const express=require("express");
const profileRouter=express.Router();

// user auth middleware
const { userAuth } = require("../middleware/auth");

// create a profile api
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports=profileRouter;