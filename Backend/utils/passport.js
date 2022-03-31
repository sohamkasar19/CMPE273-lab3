//For local jwt strategy
const jwtStrategy = require('passport-jwt').Strategy;
//To extract the jwt token
const ExtractJwt = require('passport-jwt').ExtractJwt;
//To compare the extracted data
const mongoose = require('mongoose');
const User = require('../models/User');
//get the keys to validate
const constants = require('./config.js');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = constants.SECRET;

module.exports = (passport) => {
    passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
        .then(user => {
            if(user){
                return done(null, user);
            }
            return done(null, false)
        })
        .catch(err => {
            console.log(err);
        })
    }))
}

// exports.checkAuth = passport.authenticate("jwt", { session: false });