require("../src/db/mongoose"); //connecting database

const Task = require("../src/models/task");

Task.findByIdAndDelete("5cb96aa2f8438a3dfcf9e3fd")
  .then(task => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then(count => {
    console.log(count);
  })
  .catch(error => {
    console.log(error);
  });
