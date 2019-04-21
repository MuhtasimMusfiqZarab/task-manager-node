const express = require("express");
//this file runs auto to connect to database
require("./db/mongoose");
//load uers
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

//parse incoming postman JSON(which is a request) for us to get accesible as an object we can use in req.body
app.use(express.json());

//creating user(resourses)
app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//getting multiple resources
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//fetching user by id
app.get("/users/:id", async (req, res) => {
  const _id = req.params.id; //req.params constains the route parameter(:id)

  try {
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Creating tasks(resourses)
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Reading All Tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(404).send();
  }
});

//Reading task by id
app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id; //req.params constains the route parameter(:id)

  try {
    const task = await Task.findById(_id);
    res.send(task);
  } catch (error) {
    res.status(404).send();
  }
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
