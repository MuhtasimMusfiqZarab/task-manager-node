//CRUD operation

const mongodb = require("mongodb"); //mongodb is a native driver
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

    //insert one document
    db.collection("users").insertOne(
      {
        name: "Zarab",
        age: 25
      },
      (error, result) => {
        if (error) {
          return console.log("Unable to insert user");
        }

        console.log(result.ops);
      }
    );

    //insert multiple documents
    db.collection("users").insertMany(
      [
        {
          name: "Mou",
          age: 24
        },
        {
          name: "Raju",
          age: 21
        }
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert documents");
        }
        console.log(result.ops);
      }
    );

    //insert multiple documents
    db.collection("tasks").insertMany(
      [
        {
          description: "Eating lunch",
          completed: true
        },
        {
          description: "Performing salah",
          completed: false
        },
        {
          description: "Charging my phone",
          completed: true
        }
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert documents");
        }
        console.log(result.ops);
      }
    );
  }
);
