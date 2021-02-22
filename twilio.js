require('dotenv').config();

const accountSid = "your twilio Sid";
const authToken = "your twilio Token";
const number = "your twilio number";

const sendSms = (phone, message) => {
    const client = require('twilio')(accountSid, authToken);
    client.messages
        .create({
            body: message,
            // from: process.env.TWILIO_PHONE_NUMBER,
            from: number,
            to: phone
        })
        .then(message => console.log(message.sid));
}

module.exports = sendSms;