const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "email@email.com",
    pass: "fiqxnemcdxavfvyx",
  },
});
module.exports = transporter;
