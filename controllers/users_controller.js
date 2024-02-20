module.exports.profile = function(req, res){
    return res.render('users_profile',{
        title: "User Profile"
    })
}

module.exports.createProfile = function(req, res){
    res.end('<h1>Create Profile</h1>');
}