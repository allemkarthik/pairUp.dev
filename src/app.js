// create a server

const express = require("express");

const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

// create a post signup api

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "karthik",
    lastName: "allem",
    emailID: "allemkarthik@gmail.com",
    password: "Allem@12345",
    age: 23,
    gender: "male",
  });

  try{
    await user.save();
  res.send("user created successfull");
  } catch(err){
    res.status(400).send("Error saving user:"+err.message)
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
