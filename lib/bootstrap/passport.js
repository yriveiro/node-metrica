/*jslint node: true*/

"use strict";


var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');


module.exports = function (passport, config) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id }, function (err, user) {
            done(err, user);
        });
    });

    // Use local strategy
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, { message: 'No user found.' });
                }

                // if (!user.authenticate(password)) {
                //     return done(null, false, { message: 'Invalid password' });
                // }

                return done(null, user);
            });
        })
    );

    // Use local strategy
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, false, { message: 'That email already taken.' });
                }

                var newUser = new User();

                newUser.email = email;
                newUser.password = password;

                newUser.save(function(err) {
                    if (err) {
                        throw err;
                    }

                    return done(null, newUser);
                });
            });
        })
    );
};
