require('dotenv').config();

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

const accountSid = "AC27d4f2c0561d35d359252da272be5824";
const authToken = "77cadede74e1e97411b2847996c20054";

const sendSms = (phone, message) => {
    const client = require('twilio')(accountSid, authToken);
    client.messages
        .create({
            body: message,
            // from: process.env.TWILIO_PHONE_NUMBER,
            from: "+12056560270",
            to: phone
        })
        .then(message => console.log(message.sid));
}

module.exports = sendSms;