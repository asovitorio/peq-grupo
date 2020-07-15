const nodemailer = require('nodemailer');
require('dotenv').config()
const email = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});
module.exports = email;


