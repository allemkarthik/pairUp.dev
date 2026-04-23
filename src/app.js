// create a server

const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

// middleware for reading the json
app.use(express.json());
// middleware for reading the cookie
app.use(cookieParser());



const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const sendConnectionRequest=require("./routes/connectionRequests");


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
