const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try {
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            await post.save();

            if(req.xhr){
                // Similar for comments to fetch user name
                comment = await comment.populate([{path: 'user', select: 'name'}]);
                console.log('Ajax request to comment sent!');
                return res.status(200).json({
                    data:{
                        comment: comment
                    },
                    message: 'Comment created successfully.'
                })
            }

            req.flash('success', 'Comment published!');

            return res.redirect('/');
        }

    }catch(err){
        req.flash('error', err);
        return;
    }
}

module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);

        let postId = comment.post;

        let post = await Post.findById(postId);

        if(post.user == req.user.id || comment.user == req.user.id){
            await Comment.deleteOne({_id: req.params.id});

            await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});

            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else {
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return;
    }
}