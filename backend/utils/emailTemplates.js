const getAlertEmailHTML = (order, alertType, message) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #2563eb;">TrackFlow Automated Alert</h2>
      <p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
      <p><strong>Customer:</strong> ${order.customerName}</p>
      <p><strong>Status Changed to:</strong> ${alertType}</p>
      <p><strong>Details:</strong> ${message}</p>
      <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
      <p style="font-size: 12px; color: #666;">This is an automated message from your TrackFlow System.</p>
    </div>
  `;
};

module.exports = {
  getAlertEmailHTML
};
