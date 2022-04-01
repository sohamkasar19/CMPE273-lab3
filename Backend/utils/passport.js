//For local jwt strategy
const JwtStrategy = require('passport-jwt').Strategy;

//To extract the jwt token
const ExtractJwt = require('passport-jwt').ExtractJwt;

//To compare the extracted data
const mongoose = require('mongoose');
const User = require('../models/User');

var passport = require("passport");

//get the keys to validate
const constants = require('./config.js');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = constants.SECRET;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    
    User.findOne({id: jwt_payload._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));
