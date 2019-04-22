const express = require("express");
//this file runs auto to connect to database
require("./db/mongoose");
const userRouter = require("./routers/user");

const app = express();
const port = process.env.PORT || 3000;
//parse incoming postman JSON(which is a request) for us to get accesible as an object we can use in req.body
app.use(express.json());
//registering the router to express
app.use(userRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
