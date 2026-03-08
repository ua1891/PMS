require("dotenv").config();
const axios = require("axios");

async function diagnoseZeroAuth() {
  const url = "https://ociconnect.tcscourier.com/tracking/api/Tracking/GetDynamicTrackDetail";

  console.log("--- TCS Zero-Auth Diagnosis ---");

  try {
    console.log("Testing with NO headers...");
    const res = await axios.get(url, { params: { consignee: "421001096857" } });
    console.log("✅ Success? No way.");
  } catch (err) {
    console.log(`❌ Failed (${err.response?.status}):`, err.response?.data?.message || err.message);
  }

  try {
    console.log("\nTesting with ONLY Subscription-Key...");
    const res = await axios.get(url, { 
      params: { consignee: "421001096857" },
      headers: { "Ocp-Apim-Subscription-Key": "LGEC19865" }
    });
    console.log("✅ Success!");
  } catch (err) {
    console.log(`❌ Failed (${err.response?.status}):`, err.response?.data?.message || err.message);
  }
}

diagnoseZeroAuth();
