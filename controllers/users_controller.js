const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    User.findById(req.params.id).then(function(user){
        return res.render('users_profile',{
            title: "Profile Page",
            profile_user: user
        });
    }).catch(function(err){console.log('Error finding user when fetching user profile: ', err);});
    
}

module.exports.update = async function(req, res){
    //we don't want someone to fiddle with our system and update others profile
    if(req.user.id == req.params.id){
        //only if current logged in user matches with profile id
        try{
            const user = await User.findById(req.params.id);

            User.uploadedAvatar(req, res, async function(err){
                if(err){console.log('*****Multer Error:', err);}

                user.name = req.body.name;
                user.email = req.body.email;

                // Check if a new file was uploaded
                if(req.file){
                    // If user already has an avatar, delete the old avatar file
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    // Save the path of the uploaded file into the user's avatar field
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                //The updated user object (including any changes to the avatar path) is saved back to the database 
                await user.save();

                return res.redirect('back');
            });

        }catch(err){
            console.log('**Error while saving user profile**', err);
            req.flash('error', err);
            return res.redirect('back');
        };

        // User.findByIdAndUpdate(req.params.id, req.body).then(function(user){
        //     req.flash('success', 'Updated!');
        //     return res.redirect('back');
        // }).catch(function(err){
        //     req.flash('error', err);
        //     return res.redirect('back');
        // });
    }else{
        req.flash('error', 'Unauthorized!');
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

module.exports.create = async function(req, res){
    try{
        //check whether password and confirm password are equal or not
        if(req.body.password != req.body.confirm_password){
            req.flash('error', 'Passwords do not match');
            return res.redirect('back');
        }
        //Try to find user_id if it exists render back,
        //else create a new user
        let user = await User.findOne({email: req.body.email});
        
        //if user doesn't exist, create a new user
        if(!user){
            let user = await User.create(req.body);

            req.flash('success', 'Profile created successfully!');
            
            return res.redirect('/users/sign-in');
        }else{
            //if it is already exists, redirect back to sign up page
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

//sign in and crete session for user
module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged in successfully');

    //redirect to codeial home
    return res.redirect('/');
}

//sign out and destroy session
module.exports.destroySession = function(req, res) {
    //provided to req by passport js to sign out and destroy session cookie
    req.logout(function(err) { 
        if (err) { 
            return next(err); 
        }
        req.flash('success', 'Logged out successfully');
        return res.redirect('/');
    }); 
}