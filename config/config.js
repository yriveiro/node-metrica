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
        },
        daemon: {
            host: '192.168.6.195:3000'
        },
        app: {
            port: 3001
        }
    },
    test: {
        mongo: {
            db: 'mongodb://localhost/metrica_test',
            options: {
                server: {
                    socketOptions: {
                        keepAlive: 1
                    }
                }
            }
        }
    },
    production: {}
};
