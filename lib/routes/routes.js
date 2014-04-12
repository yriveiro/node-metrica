/*jslint node: true*/

"use strict";


module.exports = function(app, passport) {
    app.get('/',function(req, res) {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard');
        }

        res.render('login', {
            message: req.flash('error')
        });
    });

    app.get('/signup',function(req, res) {
        res.render('signup', {
            message: req.flash('error')
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard',
        failureRedirect: '/',
        failureFlash: true
    }));

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    app.get('/dashboard', isAuthenticated, function(req, res) {
        res.render('dashboard', {});
    });
};


function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}
