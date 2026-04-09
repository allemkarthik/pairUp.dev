const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://allemkarthik_db_user:KKSy73EWbjgpf7qa@learningfirstcluster.t1snlwf.mongodb.net/pairUpDev",
  );
};

module.exports=connectDB;


