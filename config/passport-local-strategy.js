const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email'
    },
    function(email, password, done) {
        //find the user and establish the identity
        User.findOne({ email: email}).then(function(user) {
            if(!user || user.password != password) {
                console.log('Invalid username or password');
                return done(null, false);
            }

            return done(null, user);
        }).catch(function(err) {
            console.log('Error in finding user --> Passport', err);
            return done(err);
        });
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id).then(function(user){
        return done(null, user);
    }).catch(function(err) {
        console.log('Error in deserializing user: ', err);
        return done(err);
    });
});

//Finally export the passport module
module.exports = passport;
