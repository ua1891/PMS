require("dotenv").config();
const axios = require("axios");

async function diagnosePostAuth() {
  const url = "https://ociconnect.tcscourier.com/auth/api/auth";
  const clientid = "LGEC19865";
  const clientsecret = "Saynoor123$";

  console.log("--- TCS POST Auth Diagnosis ---");
  console.log(`URL: ${url}`);

  try {
    const response = await axios.post(url, {
      clientid: clientid,
      clientsecret: clientsecret
    });
    console.log("✅ Success!");
    console.log("Data:", JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log(`❌ Failed (${error.response?.status}):`, error.response?.data || error.message);
  }
}

diagnosePostAuth();
