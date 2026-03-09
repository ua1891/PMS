const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

const { createOrder } = require("../services/orderService");
const { getDashboardData } = require("../services/dashboardService");
const { sendAlertEmail } = require("../services/email");

// Create New Order
router.post("/", async (req, res) => {
  try {
    const { trackingNumber, customerName, destination } = req.body;
    
    // createOrder handles validation, TCS check, and DB creation
    const newOrder = await createOrder(trackingNumber, customerName, destination);

    res.status(201).json(newOrder);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: "Tracking number already exists." });
    }
    if (error.message === "Tracking number is required" || error.message === "Invalid tracking number or not found in TCS.") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// Get Dashboard Data
router.get("/dashboard", async (req, res) => {
  try {
    const dashboardData = await getDashboardData();
    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Simulate Alert for an Order (Evaluation Feature)
router.post("/:id/simulate-alert", async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) return res.status(404).json({ error: "Order not found" });

    let alertType = "";
    let message = "";
    let newStatus = order.status;

    if (type === "Delivered") {
      alertType = "Delivery Confirmed";
      message = "Success! Parcel successfully delivered to the customer.";
      newStatus = "Delivered";
    } else if (type === "Returned") {
      alertType = "Return Initiated";
      message = "Warning: Parcel was marked as returned by TCS. Action needed.";
      newStatus = "Returned";
    } else if (type === "Pickup") {
      alertType = "Pickup Ready";
      message = "Information: Parcel has arrived at TCS office and is ready for pickup.";
      newStatus = "Pickup Ready";
    } else if (type === "Delayed") {
      alertType = "Delayed Shipment";
      message = "Alert: Parcel is experiencing a significant delay in transit.";
      newStatus = "Delayed Shipment";
    }

    // Update Order
    await prisma.order.update({
      where: { id },
      data: { status: newStatus }
    });

    // Create Alert record
    await prisma.alert.create({
      data: {
        orderId: id,
        type: alertType,
        message: message
      }
    });

    // Send Email via existing service
    await sendAlertEmail(order, alertType, message);

    res.json({ success: true, message: `Simulated ${alertType} alert and sent email.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
