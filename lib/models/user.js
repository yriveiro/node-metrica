/*jslint node: true*/

"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userModelProperties = {
    email: { type: String, default: '' },
    password: { type: String, default: '' }
};

var UserSchema = new Schema(userModelProperties);

mongoose.model('User', UserSchema);
