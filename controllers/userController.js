const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/AppError');
const sendEmail = require('./../utils/email')

const hideObj = {active: { $ne : false}, blacklisted: {$ne : true}};

exports.getUsers = catchAsync(async (req, res, next) => {
    const users = await User.find(hideObj);
    res.status(200).json({
        dataCount: users.length,
        status: 'success',
        data: users
    })
});

exports.getUser = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    let user =  await User.findById(userId);
    if(!user || !user.active) {
        return next(new AppError('User not found', 404))
    }
    if(user.active != false) {
        if(user.blacklisted != true) {
             user = await User.findById(userId).populate({path: 'posts', options: {select: {content: 1}}});
        }
        res.status(200).json({
            status: "success",
            data: user
        });
    }
    else {
        return next(new AppError('User not found', 404));
    }
     
});

exports.createUser = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body)
    res.status(200).json({
        status: "success",
        data: user
    })
});

exports.updateUser = catchAsync( async (req, res, next) => {
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true
    });
    
    if(!user) {
        return next(new AppError('User not found', 404))
    }

    res.status(200).json({
        status: "success",
        data: user
    });
})

exports.deleteUser = catchAsync(async (req, res, next) => {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId)
    
    if(!user) {
        return next(new AppError('User not found', 404))
    }
    
    res.status(204).json({
        status: "success",
        data: null
    });
});

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
}

const filterObj = (obj, ...fields) => {
    const newObj = {}
    Object.keys(obj).forEach(el => {
        if(fields.includes(el)) newObj[el] = obj[el]
    })
    return newObj
}

exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) if password is there, throw error
    if(req.body.password) {
        return next(new AppError(`Please update password in the ${req.protocol}://${req.get('host')}/api/v1/users/updateMyPassword `))
    }
    else {
        const filteredBody = filterObj(req.body, "name", "email", "username")
        const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
            runValidators: true,
            new: true
        });

        res.status(200).json({
            status: "success",
            data: updatedUser
        })
         
    }
})

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, {active: false})
    
    res.status(204).json({
        status: 'success',
        data: null
    })
    
})

exports.blacklist = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.params.id)
    user.blacklisted = req.body.blacklisted;
    const message = `The Administrator has blacklisted your account! All your posts are deleted, you are now restricted to create, update or delete posts.` 

    await user.save();
    if(user.blacklisted) {
        try{
            const message = `The Administrator has blacklisted your account! All your posts are deleted, you are now restricted to create, update or delete posts.` 
            await sendEmail({
                email: user.email,
                subject: 'Your mySocial Account Blacklisted',
                message
            })
            res.status(200).json({
                status: 'success',
                message: 'email sent to user',
                data: user
            })
        } catch {
            return next( new AppError('Error sending the mail, please try later', 500))
        }
    }
    else {
        res.status(200).json({
            status: 'success',
            data: user
        })
    }
    
    
})