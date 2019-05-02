const mongoose = require("mongoose");

//Defining task model
const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, //according to the id field of the user
    required: true,
    ref: "User"
  }
});

module.exports = Task;
