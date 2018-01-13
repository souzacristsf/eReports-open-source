const path = require("path");
const nodemailer = require("nodemailer");
module.exports = app => config =>
  nodemailer.createTransport({
    service: "gmail",
    secure: true, // use SSL
    auth: {
      user: config.user,
      pass: config.password
    }
  });
