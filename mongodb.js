//CRUD operation

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017"; //connect to localhost server
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }
    // console.log("Connection Established");
    const db = client.db(databaseName); // autometicaly creates the database if not found

    // db.collection("users").findOne(
    //   { _id: new ObjectID("5cb59eb62ef6f43f0896dd6c") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("unable to fetch");
    //     }
    //     console.log(user);
    //   }
    // );
    // db.collection("users")
    //   .find({ name: "Zarab" })
    //   .toArray((error, users) => {
    //     if (error) {
    //       console.log("unable to fetch users");
    //     }
    //     console.log(users);
    //   });
    // db.collection("users")
    //   .find({ name: "Zarab" })
    //   .count((error, count) => {
    //     if (error) {
    //       console.log("unable to fetch users");
    //     }
    //     console.log(count);
    //   });
    db.collection("tasks").findOne(
      { _id: ObjectID("5cb59eb62ef6f43f0896dd6f") },
      (error, task) => {
        if (error) {
          return console.log(error);
        }
        console.log(task);
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, tasks) => {
        if (error) {
          console.log("Unable to find tasks");
        }
        console.log(tasks);
      });
  }
);
