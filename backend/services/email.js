const nodemailer = require("nodemailer");
const { getAlertEmailHTML } = require("../utils/emailTemplates");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendAlertEmail(order, alertType, message) {
  try {
    const mailOptions = {
      from: `"TrackFlow System" <${process.env.SMTP_USER}>`,
      to: process.env.VENDOR_EMAIL,
      subject: `[TrackFlow] Alert for Order #${order.trackingNumber}: ${alertType}`,
      html: getAlertEmailHTML(order, alertType, message),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Alert email sent for ${order.trackingNumber}: ${info.messageId}`);
  } catch (error) {
    console.error(`Failed to send email for ${order.trackingNumber}:`, error.message);
  }
}

module.exports = { sendAlertEmail };
