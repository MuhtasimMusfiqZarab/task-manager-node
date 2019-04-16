//CRUD operation

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient; // let us connect to database

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
    db.collection("users").insertOne({
      name: "Zarab",
      age: 25
    });
  }
);
