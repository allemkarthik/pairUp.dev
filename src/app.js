// create a server

const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors=require("cors")

require("dotenv").config();

require("./utils/cronJob")

// middleware for cors error
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true,
}));

// middleware for reading the json
app.use(express.json());
// middleware for reading the cookie
app.use(cookieParser());



const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const sendConnectionRequest=require("./routes/requests");
const userRouter=require("./routes/user");
const paymentRouter = require("./routes/payment");

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",sendConnectionRequest)
app.use("/", userRouter)
app.use("/", paymentRouter)


connectDB()
  .then(() => {
    console.log("database connection is sucessfull");
    // server listener
    app.listen(process.env.PORT, () => {
      console.log("server is listening successfully on port 3000....");
    });
  })
  .catch((err) => {
    console.error("database cannot be connected");
  });
