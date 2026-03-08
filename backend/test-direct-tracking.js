require("dotenv").config();
const axios = require("axios");

async function testDirectTracking() {
  const token = "LGEC19865";
  const consignmentNo = "421001096857";
  const url = "https://ociconnect.tcscourier.com/tracking/api/Tracking/GetDynamicTrackDetail";

  console.log("--- TCS Direct Tracking Test ---");
  console.log(`Using Token: ${token}`);
  console.log(`Tracking Number: ${consignmentNo}`);

  try {
    // Testing GET with body as per manual
    const response = await axios({
      method: 'get',
      url: url,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        consignee: [consignmentNo]
      }
    });

    console.log("✅ Success!");
    console.log("Response Data:", JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("❌ Failed.");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Response Body:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Error Message:", error.message);
    }
  }
}

testDirectTracking();
