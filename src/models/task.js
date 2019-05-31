const mongoose = require("mongoose");

//defining schema
const taskSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true
  }
);

//Defining task model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
