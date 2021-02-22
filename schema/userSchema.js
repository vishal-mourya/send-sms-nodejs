// Importing the mongoose module, as it 
// will be used to make our schema for MongoDB
const mongoose = require('mongoose');

// const bcrypt = require('bcrypt');
// This is our schema or model for user who will be new to our
// portal and are doing registration for the first time

// Wrting below line means, telling mongoose to create
// a schema i.e. the structure or blue-print of the
// document in which you want to store data in MongoDB
const userSchema = new mongoose.Schema({

    phone: {
        type: String,
        required: true,
        unique: true
    },

    OTP: {
        type: Number,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 6,
    },

    isFree: {
        type: Boolean,
        default: false
    }

});


// below line will simple export the code of this 
// file, so that it is accessible from anywhere in our project
// we just need to import userSignupSchema; and we can use the code of this file
module.exports = mongoose.model('userSchema', userSchema);
// the first string inidcates : the name which we want others to use for importing 
// and using this file code