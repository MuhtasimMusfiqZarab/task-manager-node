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

    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectID("5cb598853bbb12285478b6f4")
    //     },
    //     {
    //       $inc: {
    //         age: 1
    //       }
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // db.collection("tasks")
    //   .updateMany(
    //     {
    //       completed: false
    //     },
    //     {
    //       $set: {
    //         completed: true
    //       }
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    db.collection("users")
      .deleteOne({
        _id: new ObjectID("5cb59eb62ef6f43f0896dd6a")
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
    db.collection("users")
      .deleteMany({
        name: "Mou"
      })
      .then(result => {
        console.log(result.deletedCount);
      })
      .catch(error => {
        console.log(error);
      });
  }
);
