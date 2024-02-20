module.exports.home = function (req, res){
    return res.render('home', {
        title: "Home"
    });
}

module.exports.signup = function (req, res){
    return res.end('<h1>Sign up!</h1>');
}
