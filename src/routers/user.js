const express = require("express");
//Creating router
const router = new express.Router();
//load user model
const User = require("../models/user");
const auth = require("../middleware/auth");

//creating user(resourses)
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

//logging in user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    ); //findByCredentials() is defined by us

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

//getting logged in profile
router.get("/users/me", auth, async (req, res) => {
  try {
    res.send(await req.currentUser);
  } catch (error) {}
});

//fetching user by id
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id; //req.params constains the route parameter(:id)

  try {
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//updating user (resource)
router.patch("/users/:id", async (req, res) => {
  //converting object's properties to an array
  const updates = Object.keys(req.body);

  const allowedUpdates = ["name", "email", "password", "age"];

  //validating if update is allowed
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    // options: returns new user with update, validates the update
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // }); // find by id bypasses mongoose (mongoose middleware) thus we are using the following code

    const user = await User.findById(req.params.id);

    updates.forEach(update => {
      user[update] = req.body[update];
    });

    await user.save();
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Deleting user
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(erorr.message);
  }
});

module.exports = router;
