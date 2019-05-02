const express = require("express");

//Creating router
const router = new express.Router();

//loading task model
const Task = require("../models/task");
//loading auth middleware
const auth = require("../middleware/auth");

//Creating tasks(resourses)
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Reading All Tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(404).send();
  }
});

//Reading task by id
router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id; //req.params constains the route parameter(:id)

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send();
  }
});

//updating user (resource)
router.patch("/tasks/:id", async (req, res) => {
  //converting object's properties to an array
  const updates = Object.keys(req.body);

  const allowedUpdates = ["description", "completed"];

  //validating if update is allowed
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    // options: returns new user with update, validates the update
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });

    const task = await Task.findById(req.params.id);

    updates.forEach(update => {
      task[update] = req.body[update];
    });

    await task.save();

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Deleting task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
