// //For local jwt strategy
// const jwtStrategy = require('passport-jwt').Strategy;
// //To extract the jwt token
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// //To compare the extracted data
// const mongoose = require('mongoose');
// const User = require('../models/User');
// //get the keys to validate
// const keys = require('./config.json');
// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = keys.secretOrKey;

// module.exports = passport => {
//     passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
//         User.findById(jwt_payload.id)
//         .then(user => {
//             if(user){
//                 return done(null, user);
//             }
//             return done(null, false)
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }))
// }