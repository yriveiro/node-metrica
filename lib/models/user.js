/*jslint node: true*/

"use strict";

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var schema = new mongoose.Schema({
    email: { type: String, default: '' },
    password: { type: String, default: '' }
});

schema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

schema.methods.authenticate = function(password) {
    return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', schema);
