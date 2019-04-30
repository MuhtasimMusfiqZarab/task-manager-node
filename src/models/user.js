const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

//create schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("The password should not contain password string");
      }
    }
  }
});

//user method(save) on userSchema to set the middleware up
userSchema.pre("save", async function(next) {
  const user = this;

  //here is modified is true if an user was created or password filled is changed
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next(); //used to say that func is over
});

//Definig  User model
const User = mongoose.model("User", userSchema);

module.exports = User;
