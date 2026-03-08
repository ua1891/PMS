require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function cleanup() {
  console.log("🧹 Starting TrackFlow Data Cleanup...");

  try {
    // 1. Delete alerts associated with test orders
    const deleteAlerts = await prisma.alert.deleteMany({
      where: {
        OR: [
          { order: { trackingNumber: { startsWith: "EVAL-" } } },
          { order: { trackingNumber: "771403606" } }
        ]
      }
    });
    console.log(`✅ Deleted ${deleteAlerts.count} test alerts.`);

    // 2. Delete test orders
    const deleteOrders = await prisma.order.deleteMany({
      where: {
        OR: [
          { trackingNumber: { startsWith: "EVAL-" } },
          { trackingNumber: "771403606" }
        ]
      }
    });
    console.log(`✅ Deleted ${deleteOrders.count} test orders.`);

    console.log("\n✨ System is now clean of evaluation data!");
  } catch (error) {
    console.error("❌ Cleanup failed:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

cleanup();
