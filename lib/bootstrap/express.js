/*jslint node: true*/

"use strict";


var path = require('path');
var express = require('express');
var mongoStore = require('connect-mongo')(express);
var flash = require('connect-flash');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');


var env = process.env.NODE_ENV || 'development';


module.exports = function (app, config, passport) {
    // Should be placed before express.static
    app.use(express.compress({
        filter: function (req, res) {
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    // View engine setup
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');

    // Set middlewares
    app.use(favicon());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(express.session({
        secret: 'keyboard cat',
        store: new mongoStore({
            url: config.mongo.db,
            collection: 'sessions'
        })
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(require('stylus').middleware(path.join(__dirname, '../public')));


    // Load Express defined routes.
    require(path.join(__dirname, '../routes/routes'))(app, passport);


    // Catch 404 and forwarding to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // Error handlers

    // Development error handler will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // Production error handler no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};
