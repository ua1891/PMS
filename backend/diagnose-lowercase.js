require("dotenv").config();
const axios = require("axios");

async function diagnoseLowercase() {
  const email = "Saynoorpk@gmail.com";
  const pass = "Saynoor123$";
  const bearerCode = "LGEC19865";

  console.log("--- TCS Lowercase Diagnosis ---");

  const combos = [
    { name: "Auth API (BearerCode)", url: "https://ociconnect.tcscourier.com/auth/api/auth", params: { clientid: bearerCode, clientsecret: pass } },
    { name: "Auth API (Email)", url: "https://ociconnect.tcscourier.com/auth/api/auth", params: { clientid: email, clientsecret: pass } },
  ];

  for (const c of combos) {
    console.log(`\nTesting ${c.name}...`);
    try {
      // Manual says GET but with clientid/clientsecret. Trial with GET + params
      const res = await axios.get(c.url, { params: c.params });
      console.log(`✅ Success!`);
      console.log("Response:", res.data);
    } catch (err) {
      console.log(`❌ Failed (${err.response?.status}):`, err.response?.data || err.message);
    }
  }
}

diagnoseLowercase();
