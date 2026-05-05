const express = require("express");
const profileRouter = express.Router();
const bcrypt=require("bcrypt")

// user auth middleware
const { userAuth } = require("../middleware/auth");
const {
  validateSignUpData,
  validateEditProfileData,
} = require("../utils/validation");

// create a profile api
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// create a profile edit api
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const user = req.user;
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    await user.save();
    res.json({
      message: `${user.firstName}, your profile is updated sucessfully`,
      data: user,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});


// create a forgot password api
profileRouter.patch("/profile/passwordchange", userAuth, async (req,res)=>{
  try{
    const user=req.user
    const {oldPassword, newPassword}=req.body

    // compare old password
    const isOldPasswordValid= await bcrypt.compare(oldPassword, user.password)

    if(!isOldPasswordValid){
      throw new Error("Old password is Invalid")
    }

    // encrypt newpassword
    const hashPassword= await bcrypt.hash(newPassword,10)

    // update password in DB
    user.password=hashPassword
    await user.save()
    res.send("password changed sucessfully")
  }catch(err){
    res.status(400).send("ERROR: " + err.message)
  }
})

module.exports = profileRouter;
