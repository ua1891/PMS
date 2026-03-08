require("dotenv").config();
const axios = require("axios");

async function diagnoseUnderscores() {
  const email = "Saynoorpk@gmail.com";
  const pass = "Saynoor123$";
  const bearerCode = "LGEC19865";

  console.log("--- TCS Underscore Variation Diagnosis ---");

  const combos = [
    { url: "https://ociconnect.tcscourier.com/auth/api/auth", data: { client_id: bearerCode, client_secret: pass } },
    { url: "https://ociconnect.tcscourier.com/auth/api/auth", data: { client_id: email, client_secret: pass } },
    { url: "https://ociconnect.tcscourier.com/ecom/api/authentication/token", params: { username: bearerCode, password: pass } },
  ];

  for (const c of combos) {
    console.log(`\nTesting ${c.url} with ${JSON.stringify(c.data || c.params)}...`);
    try {
      let res;
      if (c.data) {
        res = await axios.post(c.url, c.data);
      } else {
        res = await axios.get(c.url, { params: c.params });
      }
      console.log(`✅ Success!`);
      console.log("Data:", res.data);
    } catch (err) {
      console.log(`❌ Failed (${err.response?.status}):`, err.response?.data || err.message);
    }
  }
}

diagnoseUnderscores();
