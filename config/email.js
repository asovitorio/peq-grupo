const nodemailer = require('nodemailer');
require('dotenv').config()
const email = nodemailer.createTransport({
   host:"smtp.gmail.com",
   port:"465",
   secure:"false",
     auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});
module.exports = email;


