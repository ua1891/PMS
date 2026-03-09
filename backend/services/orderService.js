const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getTrackingDetail } = require("./tcs");

async function createOrder(trackingNumber, customerName, destination) {
  if (!trackingNumber) {
    throw new Error("Tracking number is required");
  }

  // Basic verify with TCS
  const tcsData = await getTrackingDetail(trackingNumber);
  if (tcsData && tcsData.status === "FAIL") {
    throw new Error("Invalid tracking number or not found in TCS.");
  }

  // Determine initial status from TCS if possible
  let initialStatus = "In Transit";
  let statusDetails = null;
  if (tcsData && tcsData.deliveryinfo && tcsData.deliveryinfo.length > 0) {
    const latestTcsStatus = tcsData.deliveryinfo[0].status;
    statusDetails = latestTcsStatus;
    if (latestTcsStatus === "Delivered") initialStatus = "Delivered";
    else if (latestTcsStatus === "Awaiting Receiver Collection") initialStatus = "Pickup Ready";
    else if (latestTcsStatus.includes("Return")) initialStatus = "Returned";
    else if (latestTcsStatus.includes("Delay")) initialStatus = "Delayed Shipment";
    else if (latestTcsStatus === "Out For Delivery") initialStatus = "In Transit";
  } else {
    initialStatus = "Pending";
  }

  // Attempt to extract Consignee details from TCS response to automatically fill name & destination
  let autoCustomerName = customerName || "Unknown Customer";
  let autoDestination = destination || "Unknown Destination";
  if (tcsData && tcsData.deliveryinfo && tcsData.deliveryinfo.length > 0) {
    if (tcsData.consignment) {
      autoCustomerName = tcsData.consignment.consigneeName || autoCustomerName;
      autoDestination = tcsData.consignment.destinationCity || autoDestination;
    }
  }

  const newOrder = await prisma.order.create({
    data: {
      trackingNumber,
      customerName: autoCustomerName,
      destination: autoDestination,
      status: initialStatus,
      statusDetails,
    }
  });

  return newOrder;
}

module.exports = {
  createOrder
};
