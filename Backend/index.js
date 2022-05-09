var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var passport = require("passport");
// require("./utils/passport")(passport);
require("./utils/passport");
var session = require("express-session");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas");
const { graphqlUploadExpress } = require("graphql-upload");

var constants = require("./utils/config");

var app = express();

const port = constants.PORT;
const db = constants.ATLAS_URI;
const frontEnd = constants.FRONTEND;
const secret = constants.SECRET;

var userRoute = require('./routes/userRoute.js');
var shopRoute = require('./routes/shopRoute.js');
var itemRoute = require('./routes/itemRoute.js');
var imageUploadRoute = require('./routes/imageUploadRoute.js');
var orderRoute = require('./routes/orderRoute.js');


//set up cors
app.use(cors({ origin: frontEnd, credentials: true }));

//Allow Access Control
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', frontEnd);
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
//   });

//body parser
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

//express middleware
app.set("trust proxy", 1);
app.use(
  session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

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

app.use('/images', imageUploadRoute)

app.use('/shop', shopRoute);

app.use('/item', itemRoute);

app.use('/order', orderRoute);

app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log("Running on " + port);
});
