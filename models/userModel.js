const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { stringify } = require('querystring');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'The username is already taken'],
        required: [true, 'Please enter an username']
    },
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: [true, 'The email belongs to another user'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a Password'],
        minlength: [8, 'A password must be atleast 8 characters long'],
        validate: {
            validator: function(el) {
                var a=0, b=0;
                for (var i=0; i<el.length; i++) {
                    if( el[i] === el[i].toUpperCase() ) {
                        a++;
                    };
                    if (el[i] >= '0' && el[i] <= '9'){
                        b++;
                    }
                }
                return a*b;
            },
            message: 'Password must contain atleast 1 uppercase character and atleast 1 number'
        },
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please Confirm your password'],
        validate: {
            validator: function(el) {
                return el === this.password
            },
            message: 'Both passwords do not match'
        },
        select: false
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    passwordChangedAt: Date,
    active: {
        type: Boolean,
        default: true,
    },
    passwordResetToken: String,
    passwordResetExpire: Date,
    blacklisted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    bio: {
        type: String,
        maxlength: [32, 'Your Bio should not exceed over 32 characters' ]
    }

},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

userSchema.plugin(uniqueValidator, {message: '{PATH} already exists!' });
// userSchema.pre(/^find/, function(next) {
//     this.find({active: {$ne: false}});
//     next();
// })

userSchema.virtual('posts', {
    ref: 'Post',
    foreignField: 'user',
    localField:'_id',
})




userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest("hex")
    this.passwordResetExpire = Date.now() +10*60*1000;
    return resetToken;
}


userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimeStamp) {
    if(this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000, 10)
        return JWTTimeStamp < changedTimeStamp;
    }
    return false;
}



const User = mongoose.model('User', userSchema);
module.exports = User;