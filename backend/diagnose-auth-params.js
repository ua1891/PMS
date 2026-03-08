require("dotenv").config();
const axios = require("axios");

async function diagnoseAuthParams() {
  const email = "Saynoorpk@gmail.com";
  const pass = "Saynoor123$";
  const bearerCode = "LGEC19865";
  const url = "https://ociconnect.tcscourier.com/ecom/api/authentication/token";

  console.log("--- TCS Authentication (Page 5) Param Diagnosis ---");

  const tests = [
    { name: "Email/Pass as Params", params: { username: email, password: pass } },
    { name: "BearerCode/Pass as Params", params: { username: bearerCode, password: pass } },
    { name: "BearerCode/Email as Params", params: { username: bearerCode, password: email } }
  ];

  for (const t of tests) {
    console.log(`\nTesting: ${t.name}`);
    try {
      const res = await axios.get(url, { params: t.params });
      console.log("✅ SUCCESS!");
      console.log("Response:", JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.log(`❌ FAILED (${err.response?.status}):`, err.response?.data?.message || err.response?.data || err.message);
    }
  }
}

diagnoseAuthParams();
