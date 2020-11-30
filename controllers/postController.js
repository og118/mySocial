const mongoose = require('mongoose');
const Post = require('./../models/postModel');
const APIFeatures = require('./../utils/APIFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.verifyUser = catchAsync(async (req, res, next) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if(!post) {
        return next(new AppError('Post not found', 404))
    }

    if(req.user.role == 'admin') {
        next();
    }
    else {
        if(post.user.id != req.user.id) {
            return next(new AppError('You are not allowed to update/delete someone else\'s post', 403))
        }
    next();
    }

})

const hideObj = {show: { $ne : false}};

exports.getPosts = catchAsync(async (req, res, next) => {
    console.log('getPosts')
    const features = new APIFeatures(Post.find(hideObj), req.query).sort().limitFields().filter();
    const posts = await features.query;
    res.status(200).json({
        status: "success",
        dataCount: posts.length,
        data: posts
    });
});

exports.getPost = catchAsync(async (req, res, next) => {
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if(!post) {
        return next(new AppError('Post not found', 404))
    }
    if(post.show) {
        res.status(200).json({
            status: "success",
            data: post
        })
    }
    else {
        return next(new AppError('Post has been removed', 404))
    }

    
});


exports.createPost = catchAsync(async (req, res, next) => {
    if(!req.body.user) req.body.user = req.user.id
    const post = await Post.create({
        content: req.body.content,
        title: req.body.title,
        user: req.body.user,
        createdAt: Date.now()
    })
    res.status(200).json({
        status: "success",
        data: post
    })
});

exports.updatePost = catchAsync( async (req, res, next) => {
    
    const postId = req.params.id;

    const post = await Post.findByIdAndUpdate(postId, req.body, {
        new: true,
        runValidators: true
    });
    
    

    res.status(200).json({
        status: "success",
        data: post
    });
})

exports.deletePost = catchAsync(async (req, res, next) => {
    const postId = req.params.id;

    const post = await Post.findByIdAndDelete(postId)    

    res.status(204).json({
        status: "success",
        data: null
    });
});

// exports.hidePosts = catchAsync(async (req, res, next) => {
//     const posts = await Post.find({user: })
//     console.log(posts);
//     res.status(204).json({
//         status: "success",
//         data: null
//     });
// });

exports.hideUserPosts = catchAsync(async (req, res, next) => {
    const posts = await Post.find({user: req.params.id || req.userId})

    posts.forEach(async el => {
        if(req.body.blacklisted != undefined) {
            el.show = !req.body.blacklisted
        }
        else el.show = false
        
        await el.save();
    })

    
    next();
})

exports.blackListPost = catchAsync(async (req, res, next) => {
    const post = await Post.findByIdAndUpdate(req.params.postId, req.body, {
        new: true
    })
    if(!post ) {
        return next(new AppError('Post not found', 404))
    }
    
    
    post.show = !post.blacklisted
    await post.save()
    
    res.status(200).json({
        status: "success",
        data: post
    })
})

const addUpvote = (post, userId) => {
    post.upvotes.push(userId),
    post.upVoteCount = post.upVoteCount+1;
    return post
}

const addDownvote = (post, userId) => {
    post.downvotes.push(userId),
    post.downVoteCount = post.downVoteCount+1;
    return post
}

const removeUpvote = (post, userId) => {
    post.upvotes = post.upvotes.filter(function(value) {return value != userId})
    post.upVoteCount = post.upVoteCount-1;
    return post
}

const removeDownvote = (post, userId) => {
    post.downvotes = post.downvotes.filter(function(value) {return value != userId})
    post.downVoteCount = post.downVoteCount-1;
    return post
}

exports.upvotePost = catchAsync(async (req, res, next) => {
    
    let post = await Post.findById(req.params.postId);
    if(!post || !post.show ) {
        return next(new AppError('Post not found', 404))
    }
    let item;
    post.upvotes.forEach(el => {
        if(el.id == req.userId) {
            item = el;    
        }
    })  
    
    if(item){
        post = removeUpvote(post, item);
    }
    else {
        post.downvotes.forEach(el => {
            if(el.id == req.userId) {
               post = removeDownvote(post, el)
            }
        })
        post = addUpvote(post, req.userId)   
    }
    await post.save()
    res.status(200).json({
        status: "success",
        data: post
    })

   
})

exports.downvotePost = catchAsync(async (req, res, next) => {
    
    let post = await Post.findById(req.params.postId);
    if(!post || !post.show ) {
        return next(new AppError('Post not found', 404))
    }
    let item;
    post.downvotes.forEach(el => {
        if(el.id == req.userId) {
            item = el;    
        }
    })  
    
    if(item){
        post = removeDownvote(post, item);
    }
    else {
        post.upvotes.forEach(el => {
            if(el.id == req.userId) {
               post = removeUpvote(post, el)
            }
        })
        post = addDownvote(post, req.userId)   
    }
    await post.save()
    res.status(200).json({
        status: "success",
        data: post
    })
})


