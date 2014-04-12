/*jslint node: true*/

"use strict";


module.exports = function (mongoose, config) {
    mongoose.connect(config.mongo.db, config.mongo.options);

    // Error handler
    mongoose.connection.on('error', function (err) {
        console.log(err);
    });

    // Reconnect when closed
    mongoose.connection.on('disconnected', function () {
        mongoose.connect(config.mongo.db, config.mongo.options);
    });
};
