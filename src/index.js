const express = require("express");
//this file runs auto to connect to database
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

//register new middleware func
//works between the request coming to server & running route handler                         with middleware: new request --> middleware does something--> run route handler
//next is what is specific to middleware
// app.use((req, res, next) => {
//   console.log(req.method);
//   if (req.method === "GET") {
//     res.send("Get methods are disabled");
//   } else {
//     next();
//   }
//   //if next is not called then the request gets stuck to this middleware function and does not run route handler
//   // next();
// });

//registering middleware for maintainance mode
app.use((req, res, next) => {
  if (req) {
    res.send("The Server is under maintainance");
  } else {
    next();
  }
});

//parse incoming postman JSON(which is a request) for us to get accesible as an object we can use in req.body
app.use(express.json());
//registering the router to express
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
