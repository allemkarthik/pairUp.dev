// create a server

const express = require("express");

const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

// middle for reading the json
app.use(express.json());

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

// get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailID;
  try {
    const user = await User.find({ emailID: userEmail });

    if (user.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("user not found" + err.message);
  }
});

// get all the user  from the feed api
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("users not found" + err.message);
  }
});

// delete a user by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // const user= User.findByIdAndDelete({_id: userId})
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(404).send("can't find user" + err.message);
  }
});

// update the user data in database
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    // api validation
    const UpdatesAllowed = [
      "firstName",
      "lastName",
      "password",
      "gender",
      "skills",
      "photoUrl",
      "about",
    ];
    const isallowed = Object.keys(data).every((k) =>
      UpdatesAllowed.includes(k),
    );
    if (!isallowed) {
      throw new Error(" update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("can't be more than 10 skills");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("user update sucessfully");
  } catch (err) {
    res.status(400).send("can't update user" + err.message);
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
