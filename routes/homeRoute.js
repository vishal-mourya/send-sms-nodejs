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
    const _OTP = Math.floor(100000 + Math.random() * 900000);
    console.log(`_OTP : ${_OTP}`);
    return _OTP;
}

// Create new user with Phone Number
router.post('/register', (req, res) => {

    const _OTP = generateOTP();
    // const _OTP = req.body.OTP;
    // const { email, password, phone } = req.body;
    // const { phone } = req.body;
    const user = new userSchema({
        // email,
        // password,
        phone: req.body.phone,
        OTP: _OTP,
        isFree: req.body.isFree
    });

    // userDatabase.push(user);

    user.save((err) => {
        // if (err) {
        //     return res.send({ msg: err.message });
        // }
        console.log(`err : ${err}`);
        if (err == null) {
            res.send({
                message: 'Account created successfully, kindly check your phone to activate your account!',
                data: user
            });
        } else {
            res.send(`error hai yeh : ${err}`);
        }
    });

    const welcomeMessage = `Welcome to my Chillz! Your verification code is ${_OTP}`;

    // try {
    sendSms(user.phone, welcomeMessage);
    // } catch (err) {
    // res.send(err);
    // }


});

// This will verify the OTP
router.post('/verifyOTP', (req, res) => {
    userSchema.findOne({ phone: req.body.phone }, function(err, user) {
        // user is not found into database
        if (!user) {
            console.log(`user : ${user}`);
            console.log();
            return res.send({ msg: 'We were unable to find a user with that number. Make sure your number is correct!' });
        }
        // send verification link
        else {
            // generate token and save
            var otp = user.OTP;
            // console.log(`OTP : ${otp}`);
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

// This will update the user, isFree value
router.post('/updateFree', (req, res) => {
    userSchema.findOne({ phone: req.body.phone }, function(err, user) {
        // user is not found into database
        if (!user) {
            console.log(`user : ${user}`);
            // console.log();
            res.send({ msg: 'We were unable to find a user with that number. Make sure your number is correct!' });
        } else {
            // console.log(`user.isFree before: ${user.isFree}`);
            user.isFree = !user.isFree;
            // console.log(`user.isFree after: ${user.isFree}`);
            user.save();
            res.send(true);
        }
    });
});

// This will give the list of All users which are free
router.get('/getFreeContacts', (req, res) => {
    // var allUsers = userSchema.find({}).toArray(function(err, result) {
    //     if (err) throw err;
    //     console.log(`Yeh Find method hai : ${result}`);
    //     db.close();
    // });

    // userSchema.find().forEach((rec) => {
    //     console.log(`rec.name : ${rec.phone}`)
    // });

    // console.log(`userSchema : ${userSchema.find({}).toString()}`);

    // var ans = userSchema.find({});
    // console.log(`ans is : ${ans}`);
    // console.log(`all users : ${allUsers.json()}`);
    // console.log(allUsers.phone);
    // var ans1 = [];
    // all
    // res.send(userSchema.find({}).toString());
    var ans = [];
    userSchema.find({}, function(err, user) {
        // user is not found into database

        // generate token and save

        if (user) {
            user.forEach((rec) => {
                // console.log(`rec : ${rec.phone}`);
                var ans1 = {
                    phone: rec.phone,
                    status: rec.isFree
                };

                ans.push(ans1);
            });
        }
        // console.log("Pehle");
        // for (let i = 0; i < ans.length; i++) {
        //     console.log(ans[i]);
        // }
        // console.log(`user : ${user}`);
        console.log(`ans : ${ans}`);
        res.send(ans);
    });
    // console.log("Baadme")
    // for (let i = 0; i < ans.length; i++) {
    //     console.log(ans[i]);
    // }

});

// for exporting out routes
module.exports = router;