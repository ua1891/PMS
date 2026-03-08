const nodemailer = require("nodemailer");

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
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">TrackFlow Automated Alert</h2>
          <p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
          <p><strong>Customer:</strong> ${order.customerName}</p>
          <p><strong>Status Changed to:</strong> ${alertType}</p>
          <p><strong>Details:</strong> ${message}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">This is an automated message from your TrackFlow System.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Alert email sent for ${order.trackingNumber}: ${info.messageId}`);
  } catch (error) {
    console.error(`Failed to send email for ${order.trackingNumber}:`, error.message);
  }
}

module.exports = { sendAlertEmail };
