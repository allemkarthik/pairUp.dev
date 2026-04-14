// create a server

const express = require("express");

const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

// middle for reading the json
app.use(express.json());

// create a post signup api
app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("user created successfull");
  } catch (err) {
    res.status(400).send("Error saving user:" + err.message);
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
