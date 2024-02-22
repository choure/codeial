module.exports.profile = function(req, res){
    return res.render('users_profile',{
        title: "User Profile"
    })
}

module.exports.createProfile = function(req, res){
    res.end('<h1>Create Profile</h1>');
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