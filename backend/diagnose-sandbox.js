require("dotenv").config();
const axios = require("axios");

async function diagnoseSandbox() {
  const email = "Saynoorpk@gmail.com";
  const pass = "Saynoor123$";
  const bearerCode = "LGEC19865";
  
  // Sandbox URL from Page 4
  const url = "https://devconnect.tcscourier.com/auth/api/auth";

  console.log("--- TCS Sandbox Auth Diagnosis ---");
  console.log(`URL: ${url}`);

  const tests = [
    { name: "BearerCode as clientid", params: { clientid: bearerCode, clientsecret: pass } },
    { name: "Email as clientid", params: { clientid: email, clientsecret: pass } }
  ];

  for (const t of tests) {
    console.log(`\nTesting ${t.name}...`);
    try {
      const res = await axios.get(url, { params: t.params });
      console.log("✅ SUCCESS!");
      console.log("Data:", JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.log(`❌ Failed (${err.response?.status}):`, err.response?.data?.message || err.response?.data || err.message);
    }
  }
}

diagnoseSandbox();
