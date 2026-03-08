require("dotenv").config();
const axios = require("axios");

async function diagnoseSubscriptionKey() {
  const apiKey = "LGEC19865";
  const username = "Saynoorpk@gmail.com";
  const password = "Saynoor123$";
  
  // Endpoint from previous working knowledge or manual
  const url = "https://ociconnect.tcscourier.com/ecom/api/authentication/token";

  console.log("--- TCS Subscription Key + Auth Diagnosis ---");
  console.log(`URL: ${url}`);
  console.log(`Key: ${apiKey}`);

  const headers = [
    { "Ocp-Apim-Subscription-Key": apiKey },
    { "x-api-key": apiKey },
    { "X-IBM-Client-Id": apiKey }
  ];

  for (const h of headers) {
    console.log(`\nTesting with Header: ${JSON.stringify(h)}`);
    try {
      const response = await axios.get(url, {
        params: { username, password },
        headers: h
      });
      console.log("✅ Success!");
      console.log("Response Token:", response.data.accesstoken);
      return;
    } catch (error) {
      console.log(`❌ Failed (${error.response?.status}):`, error.response?.data?.message || JSON.stringify(error.response?.data) || error.message);
    }
  }
}

diagnoseSubscriptionKey();
