const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    process.env.DBCONNECTIONURL
  );
};

module.exports=connectDB;


