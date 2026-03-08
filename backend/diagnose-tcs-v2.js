require("dotenv").config();
const axios = require("axios");

async function diagnose() {
  const email = "Saynoorpk@gmail.com";
  const pass = "Saynoor123$";
  const bearerCode = "LGEC19865";

  console.log("--- TCS Authentication Advanced Diagnosis ---");
  
  const endpoints = [
    { name: "ECOM Auth (Email)", url: "https://ociconnect.tcscourier.com/ecom/api/authentication/token", params: { username: email, password: pass }, method: "GET" },
    { name: "ECOM Auth (BearerCode)", url: "https://ociconnect.tcscourier.com/ecom/api/authentication/token", params: { username: bearerCode, password: pass }, method: "GET" },
    { name: "AUTH API (Email)", url: "https://ociconnect.tcscourier.com/auth/api/auth", params: { clientId: email, clientSecret: pass }, method: "GET" },
    { name: "AUTH API (BearerCode)", url: "https://ociconnect.tcscourier.com/auth/api/auth", params: { clientId: bearerCode, clientSecret: pass }, method: "GET" },
    { name: "AUTH API POST (BearerCode)", url: "https://ociconnect.tcscourier.com/auth/api/auth", data: { clientId: bearerCode, clientSecret: pass }, method: "POST" },
  ];

  for (const ep of endpoints) {
    console.log(`\nTesting ${ep.name}...`);
    try {
      let res;
      if (ep.method === "GET") {
        res = await axios.get(ep.url, { params: ep.params });
      } else {
        res = await axios.post(ep.url, ep.data);
      }
      console.log(`✅ Success!`);
      console.log("Response Data:", JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.log(`❌ Failed (${err.response?.status}):`, err.response?.data?.message || err.response?.data || err.message);
    }
  }
}

diagnose();
