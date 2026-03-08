require("dotenv").config();
const axios = require("axios");

async function diagnoseSandboxAuth() {
  const email = "Saynoorpk@gmail.com";
  const pass = "Saynoor123$";
  const bearerCode = "LGEC19865";
  
  // Sandbox URL from Page 5
  const url = "https://devconnect.tcscourier.com/ecom/api/authentication/token";

  console.log("--- TCS Sandbox Authentication Diagnosis ---");
  console.log(`URL: ${url}`);

  const tests = [
    { name: "Email as username", params: { username: email, password: pass } },
    { name: "BearerCode as username", params: { username: bearerCode, password: pass } }
  ];

  for (const t of tests) {
    console.log(`\nTesting ${t.name}...`);
    try {
      const res = await axios.get(url, { params: t.params });
      console.log("✅ SUCCESS!");
      console.log("Response:", JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.log(`❌ Failed (${err.response?.status}):`, err.response?.data?.message || err.response?.data || err.message);
    }
  }
}

diagnoseSandboxAuth();
