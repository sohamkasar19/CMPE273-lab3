const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { SECRET } = require("../utils/config");

exports.user_signup_post = async (args) => {
  const { email, name, password } = args;

  const hashed_password = bcrypt.hashSync(password, saltRounds);
  const newUser = new User({
    EMAIL: email,
    NAME: name,
    PASSWORD: hashed_password,
  });
  // newUser.save(function (err) {
  //   if (err) {
  //     // if (err.name === "MongoError" && err.code === 11000) {
  //     return res.json({ status: "error", error: "Duplicate email" });
  //     // }
  //   } else {
  //     const payload = { _id: newUser._id };
  //     jwt.sign(
  //       payload,
  //       SECRET,
  //       {
  //         expiresIn: 8 * 3600,
  //       },
  //       (err, token) => {
  //         res.json({
  //           status: "ok",
  //           token: "Bearer " + token,
  //           user: newUser,
  //         });
  //       }
  //     );
  //   }
  // });
  // console.log(newUser);
  let res = await newUser.save();
  return res;
};

exports.user_login_post = async (args) => {
  // User.findOne({ EMAIL: email }, (error, user) => {
  //   if (error) {
  //     res.json({ status: "error", error: "Error in mongo connection" });
  //   }
  //   if (user) {
  //     bcrypt.compare(password, user.PASSWORD).then((isMatch) => {
  //       if (isMatch) {
  //         const payload = { _id: user._id };
  //         jwt.sign(
  //           payload,
  //           SECRET,
  //           {
  //             expiresIn: 8 * 3600,
  //           },
  //           (err, token) => {
  //             res.json({
  //               status: "ok",
  //               token: "Bearer " + token,
  //               user: user,
  //             });
  //           }
  //         );
  //       }
  //     });
  //   } else {
  //     res.json({ status: "error", error: "User not found" });
  //   }
  // });
  const { email, password } = args;
  let user = await User.findOne({ EMAIL: email });
  // console.log(user);
  return user;
  // if (user) {
  //   bcrypt.compare(password, user.PASSWORD).then((isMatch) => {
  //     console.log("isMatch",isMatch);
  //     if (isMatch === true) {
  //       console.log("isMatch",isMatch);
  //       return user;
  //     }
  //   });
  // } else {
  //   return {};
  // }
};

exports.user_edit_profile_put = async (args) => {
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
  } = args;

  const update = {
    PHONE_NO: phonenumber ?? "",
    GENDER: gender ?? "",
    DOB: DOB ?? "",
    ADDRESS: address ?? "",
    CITY: city ?? "",
    COUNTRY: country ?? "",
    PROFILE_IMAGE: profilephoto ?? "",
    NAME: name ?? "",
  };

  let user = await User.findOneAndUpdate({ EMAIL: email }, update, {
    new: true,
  });
  return user

  // User.findOne({
  //   EMAIL: email,
  // })
  //   .then((user) => {
  //     user.NAME = name ?? "";
  //     user.PHONE_NO = phonenumber ?? "";
  //     user.GENDER = gender ?? "";
  //     user.DOB = DOB ?? "";
  //     user.ADDRESS = address ?? "";
  //     user.CITY = city ?? "";
  //     user.COUNTRY = country ?? "";
  //     user.PROFILE_IMAGE = profilephoto ?? "";
  //     user.save((error) => {
  //       if (error) {
  //         throw error;
  //       }
  //     });
  //     return user;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.user_add_favourite = async (req, res) => {
  const { itemId, userId } = req.body.data;
  User.findOne({
    _id: userId,
  }).then((user) => {
    user.FAVOURITES.push(itemId);
    user.save();
    res.json({
      status: "ok",
      favourites: {
        FAVOURITES: user.FAVOURITES,
      },
    });
  });
};

exports.user_remove_favourite = async (req, res) => {
  const { itemId, userId } = req.body.data;
  // console.log(userId, itemId);
  User.findOne({
    userId: userId,
  }).then((user) => {
    user.FAVOURITES.pull(itemId);
    user.save();
    res.json({
      status: "ok",
      favourites: {
        FAVOURITES: user.FAVOURITES,
      },
    });
  });
};

exports.user_get_favourites = async (req, res) => {
  const userId = req.body.data;
  // console.log(userId);
  User.findOne({
    _id: userId,
  })
    .populate("FAVOURITES")
    .exec()
    .then((user) => {
      res.json({ status: "ok", favourites: user.FAVOURITES });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.user_by_id = (args) => {
  const { _id } = args;
  return User.findOne({
    _id: _id,
  });
};
