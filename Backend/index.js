var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var passport = require("passport");
// require("./config/passport")(passport);

var constants = require("./config/config");

var app = express();

const port = constants.PORT;
const db = constants.ATLAS_URI;
const frontEnd = constants.FRONTEND;


var userRoute = require('./routes/userRoute.js');

//set up cors
app.use(cors({ origin: constants.frontEnd, credentials: true }));

//Allow Access Control
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', constants.frontEnd);
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
//   });

//json parser
app.use(express.json({ limit: "10mb" }));

app.use(cookieParser());



//MongoDB connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo DB connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(function (err, req, res, next) {
  console.log(err);
});

//Routes
app.use('/user', userRoute); 



app.listen(port, () => {
  console.log("Running on "+port);
});
