require("../src/db/mongoose"); //connecting database

const User = require("../src/models/user");

//using promise chaining
User.findByIdAndUpdate("5cb9a9246616e22c3437049e", { age: 24 })
  .then(user => {
    console.log(user);
    return User.countDocuments({ age: 24 }); // 2nd promise
  })
  .then(count => {
    console.log(count);
  })
  .catch(error => {
    console.log(error);
  });

// using async and await
const updateAgeAndCount = async (id, age) => {
  await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("5cb9a9246616e22c3437049e", 25)
  .then(count => {
    console.log(count);
  })
  .catch(error => {
    console.log(error);
  });
