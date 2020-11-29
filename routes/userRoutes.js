const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController.js')
const authController = require('./../controllers/authController.js')
const postController = require('./../controllers/postController.js')
const postRouter = require('./postRoutes')



router
    .route('/')
    .get(userController.getUsers)
    .post(authController.protect, authController.restrictTo('admin'), userController.createUser);

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword', authController.resetPassword)

router.get('/me', authController.protect, userController.getMe, userController.getUser)
router.patch('/updateMe', authController.protect, userController.updateMe)
router.delete('/deleteMe', authController.protect, postController.hideUserPosts, userController.deleteMe )

router.patch('/updatePassword',authController.protect, authController.updatePassword);

router.get('/logout', authController.logout)

router
    .route('/:id')
    .get(userController.getUser)
    .patch(authController.protect, authController.restrictTo('admin'), userController.updateUser)
    .delete(authController.protect, authController.restrictTo('admin'), userController.deleteUser);
    
router.patch('/blacklist/:id', authController.protect,authController.restrictTo('admin'), postController.hideUserPosts, userController.blacklist )


module.exports = router;