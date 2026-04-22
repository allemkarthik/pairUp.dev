// create a server

const express = require("express");

const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// user auth middleware
const { userAuth } = require("./middleware/auth");

// middleware for reading the json
app.use(express.json());
// middleware for reading the cookie
app.use(cookieParser());

// create a post signup api
app.post("/signup", async (req, res) => {
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

    await user.save();
    res.send("user created successfull");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

// create a login APi
app.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;

    const user = await User.findOne({ emailID: emailID });
    if (!user) {
      throw new Error(" Seems New user! please Signup");
    }

    const isPasswordValid = await user.validatePassword(password)

    if (isPasswordValid && user) {
      // create a JWT token
      const token = await user.getJWT();

      //add the token to cookie and send the response to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 3600000), //experies in 24hrs
      });
      res.send("login Successfull");
    } else {
      throw new Error("Incorrect credentials....");
    }
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

// create a profile api
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("database connection is sucessfull");
    // server listener
    app.listen(3000, () => {
      console.log("server is listening successfully on port 3000....");
    });
  })
  .catch((err) => {
    console.error("database cannot be connected");
  });
