// Main file from where our project will start

// using express for forwarding the call
// to our routes fron index.js
const express = require('express');
// Like below we create, the app or server from express
const app = express();

// Assigning the port number to run our server on using Environment variable
require('dotenv').config();

const port = process.env.PORT || 4000;
// console.log(process.env.PORT);

// importing mongoose module as it make 
// very convenient to handle MongoDB
const mongoose = require('mongoose');

// Below code is used to connect nodejs to MongoDB using mongoose
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// if any error will occur while connecting mongoDB to nodejs
// below code will be excuted of mongoose.connection.on
mongoose.connection.on('error', (err) => {
    console.log("MongoDB Not Connected!" + err.message);
});

// If mongoDB is succesfully connected to Nodejs then
// below code of mongoose.connection.once will be executed
mongoose.connection.once('open', () => {
    console.log("MongoDB Connected Succesfully!");
});

// below line will import the userSignupSchema model 
// so that we can use this schema for storing doument in this structure 
// in MongoDB
// const userSignupSchema = require('./userSignupSchema');


// below line will import the SignUpRoute route 
// so that we can use this route from index.js
const homeRoute = require('./routes/homeRoute');
// const googleSingUpRoute = require('./routes/login-signup-google');

// below line will forward API call to our routers to handle
app.use('/', homeRoute);

// Below line will start our server on the port as defined in PORT
app.listen(port, function() {
    console.log("Server is Up and running on port : " + port);
});

// 1. Google Sinup 
// 2. LinkedIn - signup
// 3. Github - Signups