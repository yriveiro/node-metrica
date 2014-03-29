/*jslint node: true*/

"use strict";

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


var userModelProperties = {
    email: { type: String, default: '' },
    password: { type: String, default: '' }
};

var userSchema = new Schema(userModelProperties);

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.authenticate = function(password) {
    return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', userSchema);
