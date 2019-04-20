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

//getting multiple resources
app.get("/users", (req, res) => {
  User.find({})
    .then(users => {
      res.send(users);
    })
    .catch(error => {
      res.status(500).send(); //sending nothing but status code
    });
});

//fetching user by id
app.get("/users/:id", (req, res) => {
  const _id = req.params.id; //req.params constains the route parameter(:id)
  User.findById(_id)
    .then(user => {
      //if no user is found still mongoDB is considered success and returns user
      if (!user) {
        res.status(404).send();
      }
      res.send(user);
    })
    .catch(error => {
      res.status(500).send();
    });
});

//Creating tasks(resourses)
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

//Reading All Tasks

app.get("/tasks", (req, res) => {
  Task.find({})
    .then(tasks => {
      return res.send(tasks);
    })
    .catch(error => {
      res.status(404).send(); //sending nothing but status code
    });
});

//Reading task by id
app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id; //req.params constains the route parameter(:id)
  Task.findById(_id)
    .then(task => {
      //if no user is found still mongoDB is considered success and returns task
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    })
    .catch(error => {
      res.status(404).send();
    });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
