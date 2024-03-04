const Post = require('../models/post');

module.exports.home = function (req, res){
    //console.log(req.cookies);
    //res.cookie('user_id', 25);

    //populate user of each post
    Post.find({}).populate('user').then(function(posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    }).catch(err => {console.log('Error in finding all posts: ', err);});
}
