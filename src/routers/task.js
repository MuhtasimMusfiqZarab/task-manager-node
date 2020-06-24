const express = require('express');

//Creating router
const router = new express.Router();

//loading task model
const Task = require('../models/task');
//loading auth middleware
const auth = require('../middleware/auth');

//Creating tasks(resourses)
router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Reading All Tasks (completed) GET /task?completed=true/false
//limiting data for pagination => GET/tasks?limit=10&skip=0
router.get('/tasks', auth, async (req, res) => {
  const match = {};

  //if query string is not provided then we need to show all the tasks
  if (req.query.completed) {
    //if the query completed is provided as a string 'true'
    match.completed = req.query.completed === 'true';
  }

  try {
    await req.user
      .populate({
        path: 'task',
        match,
      })
      .execPopulate();

    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send();
  }

  ///-----------previous was of finding the tasks from the DB-----------
  // try {
  //   //getting only uncompleted tasks as there will be many tasks inside the DB
  //   const tasks = await Task.find({
  //     owner: req.user._id,
  //     completed: req.query.completed, //gets data from query string
  //   });
  //   res.send(tasks);
  // } catch (error) {
  //   res.status(500).send();
  // }
});

//Reading task by id
router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id; //req.params constains the route parameter(:id)

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send();
  }
});

//updating user (resource)
router.patch('/tasks/:id', auth, async (req, res) => {
  //converting object's properties to an array
  const updates = Object.keys(req.body);

  const allowedUpdates = ['description', 'completed'];

  //validating if update is allowed
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    // options: returns new user with update, validates the update
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });

    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send('No task found');
    }

    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Deleting task
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
