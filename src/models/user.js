const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema(
  {
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
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(" Invalid email address:" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(" please choose strong password");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      
      enum:{
        values:["male","female","others"],
        message:`{VALUE} is not a valid gender type`
      },
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD116U9ZCk8bEaanCeB5rSCC2uqY5Ka_2_EA&s",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photoUrl:" + value);
        }
      },
    },
    about: {
      type: String,
      
    },
    skills: {
      type: [String],
      
    },
  },
  {
    timestamps: true,
  },
);

//compund index
userSchema.index({firstName:1, lastName:1});

// create a JWT token Method
userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

// create  a bcrypt passwordhash compare
userSchema.methods.validatePassword = async function (passwordbyuser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordbyuser, passwordHash);
  return isPasswordValid;
};

// create a model

const User = mongoose.model("User", userSchema);
module.exports = User;
