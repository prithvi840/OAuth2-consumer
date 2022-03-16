const cookieSession = require('cookie-session');
const express = require('express');
const passport = require('passport');
const path = require('path');

const app = express();

async function initApp() {
    // set view engine
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // setup cookie
    app.use(cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_SECRET] // keys[0] is used for signing cookies. Others are valid & used for rotation.
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // routes
    app.get('/', (req, res) => {
        return res.render('home', { user: req.user });
    });
    app.use('/', require('./routes'));

    // error handler
    app.use((err, req, res, next) => {
        res.status(500).send(err.message);
        next();
    });

};

module.exports = { app, initApp };
