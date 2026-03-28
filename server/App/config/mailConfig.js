const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "kharbadeh@gmail.com",
    pass: "xtujmmhqhsjdeqmu",
  },
});

module.exports ={transporter}