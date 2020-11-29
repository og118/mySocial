const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Post must have title']
    },
    content : {
        type: String,
        required: [true, 'Post must have content']
    },
    upVoteCount : {
        type: Number,
        default: 0
        // embed the users who upvoted and same in downvotes
    },
    downVoteCount : {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date(Date.now())
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A post must belong to a user']
    },
    show: {
        type: Boolean,
        default: true
    },
    blacklisted: {
        type: Boolean,
        default: false
    },
    upvotes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    downvotes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
});

// postSchema.pre(/^find/, function(next) {
//     this.find({show: {$ne: false}});
//     next();
// })

postSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'username'
    }).populate({
        path: 'upvotes',
        select: 'username'
    }).populate({
        path: 'downvotes',
        select: 'username'
    })
    next();
})



const Post = mongoose.model('Post', postSchema)

module.exports = Post;