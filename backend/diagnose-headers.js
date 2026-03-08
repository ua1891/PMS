require("dotenv").config();
const axios = require("axios");

async function diagnoseHeaders() {
  const apiKey = "LGEC19865";
  const consignmentNo = "421001096857";
  const url = "https://ociconnect.tcscourier.com/tracking/api/Tracking/GetDynamicTrackDetail";

  console.log("--- TCS Header Variation Diagnosis ---");

  const headerVariations = [
    { name: "Ocp-Apim-Subscription-Key", headers: { "Ocp-Apim-Subscription-Key": apiKey } },
    { name: "X-API-Key", headers: { "X-API-Key": apiKey } },
    { name: "apikey", headers: { "apikey": apiKey } },
    { name: "Authorization (Basic)", headers: { "Authorization": `Basic ${apiKey}` } }, // Unlikely but testing
    { name: "X-IBM-Client-Id", headers: { "X-IBM-Client-Id": apiKey } },
  ];

  for (const hv of headerVariations) {
    console.log(`\nTesting Header: ${hv.name}...`);
    try {
      const response = await axios({
        method: 'get',
        url: url,
        headers: {
          ...hv.headers,
          'Content-Type': 'application/json'
        },
        data: {
          consignee: [consignmentNo]
        }
      });
      console.log(`✅ Success! Response Status: ${response.status}`);
      console.log("Response Data:", JSON.stringify(response.data, null, 2));
      return; // Stop if one works
    } catch (error) {
      console.log(`❌ Failed (${error.response?.status}):`, error.response?.data?.message || JSON.stringify(error.response?.data) || error.message);
    }
  }
}

diagnoseHeaders();
