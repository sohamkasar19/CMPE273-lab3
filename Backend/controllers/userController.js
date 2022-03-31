const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.user_signup_post = function (req, res) {
  const { email, name, password } = req.body;
  console.log(JSON.stringify(req.body));
  User.findOne({
    EMAIL: email,
  }).then((user) => {
    if (user) {
      console.log("Already exists");
      code = "ER_DUP_ENTRY";
      message = "User with this Email already exists!!!";
      var jsonData = {
        code: code,
        message: message,
      };
      console.log(jsonData);
      res.json(jsonData);
    } else {
      const hashed_password = bcrypt.hashSync(password, saltRounds);
      const newUser = new User({
        EMAIL: email,
        NAME: name,
        PASSWORD: hashed_password,
      });
      newUser.save(function (err, user) {
        if (err) return console.error(err);
      });
      res.json({ newUser });
    }
  });
};
