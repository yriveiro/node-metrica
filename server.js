/*jslint node: true*/

"use strict";

var fs = require('fs');
var path = require('path');
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');


// Set run environment.
var env = process.env.NODE_ENV || 'development';
console.info('env:', env);

// Get config.
var config = require(path.join(__dirname, 'config/config'))[env];


// Mongoose bootstrap.
require(path.join(__dirname, 'lib/bootstrap/mongoose.js'))(mongoose, config);


// Mongoose models bootstrap
fs.readdirSync(path.join(__dirname, 'lib/models')).forEach(function (file) {
    if (~file.indexOf('.js')) {
        require(path.join(__dirname, 'lib/models/', file));
    }
});


// Passport bootstrap.
require(path.join(__dirname, 'lib/bootstrap/passport.js'))(passport, config);


// Express bootstrap.
var app = express();

require(path.join(__dirname, 'lib/bootstrap/express.js'))(app, config, passport);


module.exports = app;
