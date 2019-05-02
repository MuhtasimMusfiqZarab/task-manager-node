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
    //getPublicProfile allow us to customize what we want from user object
    //res.send({ user: , token }); can be written if userSchema.methods.toJSON was used instead of custom function
    //.toJSON  does not need explicitely called by user.toJSON
    //toJSON is called whenever object is stringyfied to JSON and res.send() does this stringfy authometically
    res.send({ user: user.getPublicProfile(), token });
  } catch (error) {
    res.status(400).send();
  }
});

//getiing logged out
router.post("/users/logout", auth, async (req, res) => {
  try {
    const user = await req.user;
    user.tokens = user.tokens.filter(token => {
      return token.token !== req.token;
    });
    //saving the new array of tokens after logging out
    //removing the token
    await user.save();
    res.status(200).send("Logged Out");
  } catch (error) {
    res.status(501).send(error.message);
  }
});
//getiing logged out from all account
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    let user = await req.user;
    // let tokens = await req.user.tokens;
    user.tokens.splice(0, user.tokens.length);

    //removing all tokens
    await user.save();
    res.status(200).send("Logged Out From All Sessions");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//getting logged in profile
router.get("/users/me", auth, async (req, res) => {
  try {
    const user = await req.user;
    if (!user) {
      res.status(404).send("you are not authenticated");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
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
