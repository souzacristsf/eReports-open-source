const path = require("path");
const nodemailer = require("nodemailer");

module.exports = app => config =>
  nodemailer.createTransport({
    host: "smtp.office365.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "SSLv3"
    },
    auth: {
      user: config.user,
      pass: config.password
    }
  });
