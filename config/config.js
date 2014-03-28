/*jslint node: true*/

"use strict";

module.exports = {
    development: {
        mongo: {
            db: 'mongodb://localhost/metrica',
            options: {
                server: {
                    socketOptions: {
                        keepAlive: 1
                    }
                }
            }
        }
    },
    test: {},
    production: {}
};