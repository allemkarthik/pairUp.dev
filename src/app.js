// create a server

const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res,next) => {
    console.log("1 st console")
    next()
    res.send("1st response");
  },
  (req,res) => {
    console.log("2nd console")
    res.send("2nd response")
  },
);

// server listener
app.listen(3000, () => {
  console.log("server is listening successfully on port 3000....");
});
