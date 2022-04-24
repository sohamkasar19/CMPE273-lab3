const User = require("../models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { SECRET } = require("../utils/config");

exports.user_functions = (msg, action, callback) => {
  console.log("action", action);
  switch (action) {
    case "SIGNUP":
      user_signup(msg, callback);
      break;
    case "LOGIN":
      user_login(msg, callback);
      break;
    case "EDIT":
      user_edit_profile(msg, callback);
      break;
    case "ADD_FAV":
      user_add_favourite(msg, callback);
      break;
    case "REMOVE_FAV":
      user_remove_favourite(msg, callback);
      break;
    case "GET_FAV":
      user_get_favourites(msg, callback);
      break;
    default:
      console.log("wrong action in order");
      break;
  }
};

const user_signup = (msg, callback) => {
  const { email, name, password } = msg.data;

  const hashed_password = bcrypt.hashSync(password, saltRounds);
  const newUser = new User({
    EMAIL: email,
    NAME: name,
    PASSWORD: hashed_password,
  });
  newUser.save(function (err) {
    if (err) {
      // if (err.name === "MongoError" && err.code === 11000) {
      callback(err, null);
      // }
    } else {
      const payload = { _id: newUser._id };
      jwt.sign(
        payload,
        SECRET,
        {
          expiresIn: 8 * 3600,
        },
        (err, token) => {
          if (err) {
            callback(err, null);
          } else {
            var data = {
              token: token,
              user: newUser,
            };
            callback(null, data);
          }
        }
      );
    }
  });
};

const user_login = (msg, callback) => {
  const { email, password } = msg.data;
  User.findOne({ EMAIL: email }, (error, user) => {
    if (error) {
      callback(error, null);
    }
    if (user) {
      bcrypt.compare(password, user.PASSWORD).then((isMatch) => {
        if (isMatch) {
          const payload = { _id: user._id };
          jwt.sign(
            payload,
            SECRET,
            {
              expiresIn: 8 * 3600,
            },
            (err, token) => {
              var data = {
                token: token,
                user: user,
              };
              console.log("data", data);
              callback(null, data);
            }
          );
        }
      });
    } else {
      callback(null, null);
    }
  });
};

const user_edit_profile = (msg, callback) => {
  const {
    email,
    name,
    phonenumber,
    gender,
    DOB,
    address,
    city,
    country,
    profilephoto,
  } = msg.data;
  User.findOne({
    EMAIL: email,
  })
    .then((user) => {
      user.NAME = name ?? "";
      user.PHONE_NO = phonenumber ?? "";
      user.GENDER = gender ?? "";
      user.DOB = DOB ?? "";
      user.ADDRESS = address ?? "";
      user.CITY = city ?? "";
      user.COUNTRY = country ?? "";
      user.PROFILE_IMAGE = profilephoto ?? "";
      user.save((error) => {
        if (error) {
          throw error;
        }
      });
      callback(null, user);
    })
    .catch((err) => {
      callback(user, null);
    });
};

const user_add_favourite = (msg, callback) => {
  const { itemId, userId } = msg.data;
  User.findOne({
    _id: userId,
  }).then((user) => {
    user.FAVOURITES.push(itemId);
    user.save();
    callback(null, user.FAVOURITES);
  });
};

const user_remove_favourite = (msg, callback) => {
  const { itemId, userId } = msg.data;
  // console.log(userId, itemId);
  User.findOne({
    userId: userId,
  }).then((user) => {
    user.FAVOURITES.pull(itemId);
    user.save();
    callback(null, user.FAVOURITES);
  });
};

const user_get_favourites = (msg, callback) => {
    const userId = msg.data;
    // console.log(userId);
    User.findOne({
      _id: userId,
    })
      .populate("FAVOURITES")
      .exec()
      .then((user) => {
        callback(null, user.FAVOURITES);
      })
      .catch((error) => {
        callback(error, null);
      });
  };