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

//creating user
app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

//Creating tasks
app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

//creating tasks

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
