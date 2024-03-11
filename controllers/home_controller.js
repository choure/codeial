const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function (req, res){
    //console.log(req.cookies);
    //res.cookie('user_id', 25);

    //populate user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .then(function(posts){
        User.find({}).then(function(users){
            return res.render('home', {
                title: "Codeial | Home",
                posts: posts,
                all_users: users
            });
        }).catch(function(err){console.log('Error in finding all users: ', err);});
    }).catch(err => {console.log('Error in finding all posts: ', err);});
}
