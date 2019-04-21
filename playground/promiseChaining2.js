require("../src/db/mongoose"); //connecting database

const Task = require("../src/models/task");

// using promise chaining
Task.findByIdAndDelete("5cb9fc193cb8ee43e4ebb97f")
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

//using async await

const deleteTaskAndCount = async id => {
  await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("5cb9fc8f8e21391c808aaa94")
  .then(count => {
    console.log(count);
  })
  .catch(error => {
    console.log(error);
  });
