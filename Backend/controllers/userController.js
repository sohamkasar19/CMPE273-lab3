const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const {SECRET} = require("../utils/config");

exports.user_signup_post = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const hashed_password = bcrypt.hashSync(password, saltRounds);
    await User.create({
      EMAIL: email,
      NAME: name,
      PASSWORD: hashed_password,
    })
    res.json({status : 'ok'})
  }catch(error) {
    res.json({status : 'error', error : 'Duplicate email'})
  }
};

exports.user_login_post = async (req, res) => {
  const { email, password } = req.body;
  User.findOne({EMAIL: email}, (error, user) => {
    if(error) {
      res.json({status: 'error', error: 'Error in mongo connection'});
    }
    if(user) {
      bcrypt.compare(password, user.PASSWORD).then(isMatch => {
        if(isMatch) {
          const payload = { _id:user._id}
          const token = jwt.sign(payload, SECRET, {
            expiresIn: 8*3600
          }, (err, token) => {
            res.json({status: 'ok', token: token, username: user.NAME})
          });
        }
      })
    }
    else {
      res.json({status: 'error', error: 'User not found'});
    }
  })
}
