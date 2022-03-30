var express = require("express");
var cors = require("cors");
var mongoose = require('mongoose');

var constants = require("./config.json");

var app = express();

const port = constants.PORT;
const db = constants.ATLAS_URI;
const frontEnd = constants.FRONTEND;

//set up cors
app.use(cors({ origin: constants.frontEnd, credentials: true }));

//MongoDB connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo DB connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT, () => {
  console.log("Running on 8080");
});
