const User = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id).then(function(user){
        return res.render('users_profile',{
            title: "Profile Page",
            profile_user: user
        });
    }).catch(function(err){console.log('Error finding user when fetching user profile: ', err);});
    
}

module.exports.update = function(req, res){
    //we don't want someone to fiddle with our system and update others profile
    if(req.user.id == req.params.id){
        //only if current logged in user matches with profile id
        User.findByIdAndUpdate(req.params.id, req.body).then(function(user){
            return res.redirect('back');
        }).catch(function(err){console.log('Error in finding user and update info: ', err);});
    }else{
        return res.status(401).send('Unauthorized');
    }
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    
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
    //redirect to codeial home
    return res.redirect('/');
}

//sign out and destroy session
module.exports.destroySession = function(req, res) {
    //provided to req by passport js to sign out and destroy session cookie
    req.logout(function(err) { 
        if (err) { return next(err); }
        //res.redirect('/');
      }); 

    return res.redirect('/');
}