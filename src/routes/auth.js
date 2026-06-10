const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

// create a post signup api
authRouter.post("/signup", async (req, res) => {
  try {
    // validate the user data
    validateSignUpData(req);

    // encrypt user password
    const { firstName, lastName, emailID, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    // store the user data in db
    const user = new User({
      firstName,
      lastName,
      emailID,
      password: passwordHash,
    });

    const userSaved = await user.save();
    // create a JWT token
    const token = await userSaved.getJWT();

    //add the token to cookie and send the response to the user
    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 3600000), //experies in 24hrs
    });

    //do not sending hashed password to console
    const userResponse = userSaved.toObject();
    delete userResponse.password;

    res.json({
      message: "User Created successfully",
      data: userResponse,
    });
  } catch (err) {
    res.status(401).send("ERROR :" + err.message);
  }
});

// create a login APi
authRouter.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;

    const user = await User.findOne({ emailID: emailID });
    if (!user) {
      throw new Error(" Seems New user! please Signup");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid && user) {
      // create a JWT token
      const token = await user.getJWT();

      //add the token to cookie and send the response to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 3600000), //experies in 24hrs
      });
      res.send(user);
    } else {
      throw new Error("Incorrect credentials....");
    }
  } catch (err) {
    res.status(401).send("ERROR :" + err.message);
  }
});

// create a logout APi

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("loggout successfull");
});

module.exports = authRouter;
