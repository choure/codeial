const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.render('users_profile',{
        title: "User Profile"
    })
}

module.exports.signup = function(req, res){
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}

module.exports.signin = function(req, res){
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}

module.exports.create = function(req, res){
    //check whether password and confirm password are equal or not
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    //Try to find user_id if it exists render back,
    //else create a new user
    User.findOne({email: req.body.email}).then(function(user){
        //if user doesn't exist, create a new user
        if(!user){
            User.create(req.body).then(function(user){
                return res.redirect('/users/sign-in');
            }).catch(err => {console.log('Error in creating user while signing up:', err);});
        }else{
            //if it is already exists, redirect back to sign up page
            return res.redirect('back');
        }
    }).catch(err => {console.log('Error in finding user in signing up:', err);});
}

//sign in and crete session for user
module.exports.createSession = function(req, res) {
    //TODO Later
}