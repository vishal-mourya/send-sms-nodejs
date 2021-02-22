var cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const userSchema = require('../schema/userSchema');
const sendSms = require('../twilio');

const router = express.Router();

const userDatabase = [];

// to Parse json documents
router.use(express.json());
// to encode url
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.send("Hii I am Live Again 6 !");
});

// This Function will generate OTP of 6 unique digit
function generateOTP() {
    const _OTP = Math.floor(10000 + Math.random() * 90000);
    return _OTP;
}

// Create new user with Phone Number
router.post('/register', (req, res) => {

    const _OTP = generateOTP();
    const user = new userSchema({
        phone: req.body.phone,
        OTP: _OTP,
        isFree: req.body.isFree
    });


    user.save((err) => {

        if (err == null) {
            res.send({
                message: 'Account created successfully, kindly check your phone to activate your account!',
                data: user
            });
        } else {
            res.send(`error occured : ${err}`);
        }
    });

    const welcomeMessage = `Welcome to Nodejs World! Your verification code is ${_OTP}`;

    sendSms(user.phone, welcomeMessage);


});


// This will verify the OTP
router.post('/verifyOTP', (req, res) => {
    userSchema.findOne({ phone: req.body.phone }, function(err, user) {
        // user is not found into database
        if (!user) {
            return res.send({ msg: 'We were unable to find a user with that number. Make sure your number is correct!' });
        }
        // send verification link
        else {
            // generate token and save
            var otp = user.OTP;
            if (otp == req.body.OTP) {
                // success
                res.send(true);
            } else {
                // OTP Invalid
                res.send(false);
            }
        }
    });
});


// for exporting our routes
module.exports = router;