require("dotenv").config();
const axios = require("axios");

async function diagnoseManual() {
  const email = "Saynoorpk@gmail.com";
  const pass = "Saynoor123$";
  const bearerCode = "LGEC19865";

  console.log("--- TCS Diagnostic: Manual Method (GET with Body) ---");

  const tests = [
    {
      name: "Authorization API (Page 4) - BearerCode as clientid",
      url: "https://ociconnect.tcscourier.com/auth/api/auth",
      method: "GET",
      data: { clientid: bearerCode, clientsecret: pass }
    },
    {
      name: "Authorization API (Page 4) - Email as clientid",
      url: "https://ociconnect.tcscourier.com/auth/api/auth",
      method: "GET",
      data: { clientid: email, clientsecret: pass }
    },
    {
      name: "Authentication API (Page 5) - Email as username",
      url: "https://ociconnect.tcscourier.com/ecom/api/authentication/token",
      method: "GET",
      data: { username: email, password: pass }
    },
    {
      name: "Authentication API (Page 5) - BearerCode as username",
      url: "https://ociconnect.tcscourier.com/ecom/api/authentication/token",
      method: "GET",
      data: { username: bearerCode, password: pass }
    }
  ];

  for (const t of tests) {
    console.log(`\nTesting: ${t.name}`);
    try {
      const response = await axios({
        method: t.method,
        url: t.url,
        data: t.data, // Sending body in GET request
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("✅ SUCCESS!");
      console.log("Response:", JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log(`❌ FAILED (${error.response?.status}):`, error.response?.data || error.message);
    }
  }
}

diagnoseManual();
