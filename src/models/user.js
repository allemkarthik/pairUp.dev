const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailID: {
    type: String,
    required: true,
    lowercase:true,
    unique: true,
    trim:true,
    
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min:18,
  },
  gender: {
    type: String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("gender is not valid")
      }
    }
  },
  photoUrl: {
    type: String,
  },
  about: {
    type: String,
  },
  skills: {
    type: [String],
  },
});

// create a model

const User = mongoose.model("User", userSchema);
module.exports = User;
