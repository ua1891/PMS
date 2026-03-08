require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { sendAlertEmail } = require("../services/email");
const prisma = new PrismaClient();

async function simulate() {
  console.log("🚀 Starting TrackFlow Alert Simulation for Evaluation...");

  const testCases = [
    {
      trackingNumber: "EVAL-DELIVERED-" + Date.now(),
      customerName: "John Doe (Test)",
      destination: "Karachi",
      alertType: "Delivery Confirmed",
      message: "Success! Parcel successfully delivered to the customer.",
      finalStatus: "Delivered"
    },
    {
      trackingNumber: "EVAL-RETURNED-" + Date.now(),
      customerName: "Jane Smith (Test)",
      destination: "Lahore",
      alertType: "Return Initiated",
      message: "Warning: Parcel was marked as returned by TCS. Action needed.",
      finalStatus: "Returned"
    },
    {
      trackingNumber: "EVAL-PICKUP-" + Date.now(),
      customerName: "Alice Johnson (Test)",
      destination: "Islamabad",
      alertType: "Pickup Ready",
      message: "Information: Parcel has arrived at TCS office and is ready for pickup.",
      finalStatus: "Pickup Ready"
    },
    {
      trackingNumber: "EVAL-DELAYED-" + Date.now(),
      customerName: "Bob Brown (Test)",
      destination: "Faisalabad",
      alertType: "Delayed Shipment",
      message: "Alert: Parcel is experiencing a significant delay in transit.",
      finalStatus: "Delayed Shipment"
    }
  ];

  for (const test of testCases) {
    console.log(`\n📦 Processing Dummy Order: ${test.trackingNumber}`);
    
    try {
      // 1. Create Dummy Order
      const order = await prisma.order.create({
        data: {
          trackingNumber: test.trackingNumber,
          customerName: test.customerName,
          destination: test.destination,
          status: test.finalStatus,
          statusDetails: `TCS Simulated Status: ${test.alertType}`
        }
      });

      console.log(`✅ Order created in Database (ID: ${order.id})`);

      // 2. Create Dummy Alert
      await prisma.alert.create({
        data: {
          orderId: order.id,
          type: test.alertType,
          message: test.message,
        }
      });
      
      console.log(`🔔 Alert recorded in Database`);

      // 3. Trigger Email
      console.log(`📧 Sending Alert Email to ${process.env.VENDOR_EMAIL}...`);
      await sendAlertEmail(order, test.alertType, test.message);
      
    } catch (error) {
      console.error(`❌ Error processing ${test.trackingNumber}:`, error.message);
    }
  }

  console.log("\n✨ Simulation Complete! Please check your dashboard and inbox.");
  await prisma.$disconnect();
}

simulate();
