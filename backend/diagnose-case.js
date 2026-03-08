require("dotenv").config();
const axios = require("axios");

async function diagnoseCaseSensitivity() {
  const email = "Saynoorpk@gmail.com";
  const pass = "Saynoor123$";
  const bearerCode = "LGEC19865";
  const url = "https://ociconnect.tcscourier.com/auth/api/auth";

  console.log("--- TCS Case Sensitivity Diagnosis ---");

  const tests = [
    { name: "PascalCase (ClientID/ClientSecret)", data: { ClientID: bearerCode, ClientSecret: pass } },
    { name: "camelCase (clientId/clientSecret)", data: { clientId: bearerCode, clientSecret: pass } },
    { name: "UPPERCASE (CLIENTID/CLIENTSECRET)", data: { CLIENTID: bearerCode, CLIENTSECRET: pass } },
    { name: "PascalCase with Email", data: { ClientID: email, ClientSecret: pass } }
  ];

  for (const t of tests) {
    console.log(`\nTesting ${t.name} (GET with Body)...`);
    try {
      const res = await axios({
        method: 'GET',
        url: url,
        data: t.data,
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("✅ Success!");
      console.log("Data:", JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.log(`❌ Failed (${err.response?.status}):`, err.response?.data?.errors || err.response?.data || err.message);
    }
  }

  console.log("\n--- Testing POST with PascalCase ---");
  try {
    const res = await axios.post(url, { ClientID: bearerCode, ClientSecret: pass });
    console.log("✅ POST Success!");
    console.log("Data:", JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.log(`❌ POST Failed (${err.response?.status}):`, err.response?.data?.errors || err.response?.data || err.message);
  }
}

diagnoseCaseSensitivity();
