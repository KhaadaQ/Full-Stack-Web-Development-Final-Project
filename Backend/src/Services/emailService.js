const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "khaadaqq@gmail.com",
    pass: "bcua xite batw uteo",
  },
});

const sendMail = async (to, subject, html) => {
  try {
    const options = {
      from: "khaadaqq@gmail.com",
      to: to,
      subject: subject,
      html: html,
    };
    await transporter.sendMail(options);
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendMail;
