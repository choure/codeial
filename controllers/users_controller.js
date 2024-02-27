const User = require('../models/user');

module.exports.profile = function(req, res){
    //console.log(req.cookies.user_id);
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id).then(function(user){
            if(user){
                return res.render('users_profile',{
                    title: user.name + " | Codeial",
                    user: user
                });
            }
            
            return res.redirect('/users/sign-in');
        }).catch(function(err){console.log('Error in finding user with the user_id: ', err); return;});
    }else{
        return res.redirect('/users/sign-in');
    }
}

module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}

module.exports.signIn = function(req, res){
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

module.exports.createSession = function(req, res){
    //steps to authenticate
    //find the user
    User.findOne({email: req.body.email}).then(function(user){
        //handle user found
        if(user){
            //handle password which doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id', user._id);
            return res.redirect('/users/profile');
        }else{
            //handle user not found
            return res.redirect('back');
        }
    }).catch(err => {console.log('Error in finding user in signing in:', err);});
}