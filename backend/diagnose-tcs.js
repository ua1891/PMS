require("dotenv").config();
const axios = require("axios");

async function diagnose() {
  const username = process.env.TCS_USERNAME;
  const password = process.env.TCS_PASSWORD;
  const BASE_URL_ECOM = "https://ociconnect.tcscourier.com/ecom/api";

  console.log("--- TCS Authentication Detailed Diagnosis ---");
  console.log(`Username: ${username}`);
  
  // Pattern 1: GET with query params
  console.log("\n[Test 1] GET with query params...");
  try {
    const res1 = await axios.get(`${BASE_URL_ECOM}/authentication/token`, {
      params: { username, password }
    });
    console.log("✅ GET Success!");
  } catch (err) {
    console.log("❌ GET Failed:", err.response?.status, err.response?.data?.message || err.message);
  }

  // Pattern 2: POST with body (username/password)
  console.log("\n[Test 2] POST with body (username/password)...");
  try {
    const res2 = await axios.post(`${BASE_URL_ECOM}/authentication/token`, {
      username, password
    });
    console.log("✅ POST (user/pass) Success!");
    console.log("Response:", res2.data);
  } catch (err) {
    console.log("❌ POST (user/pass) Failed:", err.response?.status, err.response?.data?.message || err.message);
  }

  // Pattern 3: POST with body (clientId/clientSecret)
  console.log("\n[Test 3] POST with body (clientId/clientSecret)...");
  try {
    const res3 = await axios.post(`${BASE_URL_ECOM}/authentication/token`, {
      clientId: username,
      clientSecret: password
    });
    console.log("✅ POST (clientId/clientSecret) Success!");
    console.log("Response:", res3.data);
  } catch (err) {
    console.log("❌ POST (clientId/clientSecret) Failed:", err.response?.status, err.response?.data?.message || err.message);
  }

  console.log("\n-------------------------------------------");
  console.log("Please copy the output above and share it with me.");
}

diagnose();
