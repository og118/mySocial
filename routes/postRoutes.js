const express = require('express');
const router = express.Router();
const postController = require('./../controllers/postController.js')
const authController = require('./../controllers/authController')

router
    .route('/')
    .get(postController.getPosts)
    .post(authController.protect, postController.createPost);

router
    .route('/:id')
    .get(postController.getPost)
    .patch(authController.protect, authController.restrictTo('user'), postController.verifyUser, postController.updatePost)
    .delete(authController.protect, postController.verifyUser, postController.deletePost);

router.patch('/blacklist/:postId', authController.protect, authController.restrictTo('admin'), postController.blackListPost)

router.get('/:postId/upvote', authController.protect, postController.upvotePost)
router.get('/:postId/downvote', authController.protect, postController.downvotePost)


module.exports = router;