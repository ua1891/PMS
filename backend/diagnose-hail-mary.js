require("dotenv").config();
const axios = require("axios");

async function hailMary() {
  const code = "LGEC19865";
  const consignmentNo = "421001096857";
  const url = "https://ociconnect.tcscourier.com/tracking/api/Tracking/GetDynamicTrackDetail";

  console.log("--- TCS Hail Mary Diagnosis ---");

  const tests = [
    { 
      name: "Code as BOTH Bearer and Sub Key", 
      headers: { 'Authorization': `Bearer ${code}`, 'Ocp-Apim-Subscription-Key': code } 
    },
    { 
      name: "Code as ONLY Sub Key (No Auth)", 
      headers: { 'Ocp-Apim-Subscription-Key': code } 
    },
    { 
      name: "Check Header Case: Ocp-Apim-Subscription-Key vs ocp-apim-subscription-key",
      headers: { 'ocp-apim-subscription-key': code }
    }
  ];

  for (const t of tests) {
    console.log(`\nTesting: ${t.name}`);
    try {
      const response = await axios({
        method: 'get',
        url: url,
        headers: {
          ...t.headers,
          'Content-Type': 'application/json'
        },
        data: {
          consignee: [consignmentNo]
        }
      });
      console.log("✅ SUCCESS!");
      console.log("Response:", JSON.stringify(response.data, null, 2));
      return;
    } catch (error) {
       console.log(`❌ Failed (${error.response?.status}):`, error.response?.data?.message || err.message);
    }
  }
}

hailMary();
