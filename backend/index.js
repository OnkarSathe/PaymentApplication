//Require
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { User } = require("./db");

//Import Routes
const rootRoute = require("./routes/index");

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", rootRoute);

//Start Server
app.listen(3000, (res, err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started");
  }
});
