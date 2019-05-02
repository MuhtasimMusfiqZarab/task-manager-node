const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    unique: true,
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
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

//adding virtual property (not acctual data to db, but a relationship between 2 entities)
//Here the entities are User and Task
// it is just used by monggoese to figure out who owns what tasks(how they are related)
userSchema.virtual("tasks", {
  ref: "Task", //Task Model
  localField: "-id",
  foreignField: "owner" //name of the field inside of Task model(the other thing which relates  to User)
});

//creating Instance of User model(user)'s method
//methods are accesible on instances
//userSchema.methods for methods on the instance and individual user
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");
  //adding token to user
  user.tokens = user.tokens.concat({ token });
  // saving tokens to db
  await user.save();
  return token;
};

//we dont wanna user arrow function as we are using this keyword
//used to customize user object to show only necessary information
// userSchema.methods.getPublicProfile can be replaced with userSchema.methods.toJSON
//toJSON is called whenever object is stringyfied to JSON and res.send() does this stringfy authometically
userSchema.methods.getPublicProfile = function() {
  const user = this;
  //toObject is provided by mongoose, which gives us  the raw profile data
  //toObject is used to customize the raw user data which is to show to us
  const userObject = user.toObject();
  //deleting unnecessary information
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

//defining findByCredentials
//static methods are accesible on the actual Model==> Here the model is User
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

//user method(save) on userSchema to set the middleware up
//(hashing before saving)
//no arrow func is used because this binding is needed
userSchema.pre("save", async function(next) {
  const user = this;

  //here is modified is true if an user was created or password filled is changed
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next(); //used to say that func is over
});

//Definig  User model so that we can use the model named exactly as "User" here and on different files
const User = mongoose.model("User", userSchema);

module.exports = User;
