const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const User = require('../models/user');

const DB_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

async function setup() {
    // database setup
    // todo: Can move to separate file/folder for better database related error handling.
    mongoose.connect(process.env.DB_URI, DB_OPTIONS, (err, connection) => {
        if (err) {
            console.error('Failed db init: ', err);
        } else {
            console.info('DB connection successful!!');
        }
    });

    // passport setup
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((userID, done) => {
        User.findById(userID)
            .then(user => done(null, user))
            .catch(err => done(err));
    });
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/redirect',
        },
        async (accessToken, refreshToken, profile, done) => {
            // is called when user is redirected from consent screen
            try {
                let currentUser = await User.findOne({ googleID: profile.id });
    
                if (!currentUser) 
                    currentUser = await User.create({
                        googleID: profile.id,
                        username: profile.displayName,
                        thumbnail: profile._json.picture,
                    });
                
                return done(null, currentUser);
            } catch (error) {
                console.error('Passport callback failure: ', error);
                return done(error);
            }
        }),
    );
}

module.exports = { setup };
