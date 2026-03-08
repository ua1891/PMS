require("dotenv").config();
const axios = require("axios");

async function diagnoseFinal() {
  const token = "LGEC19865";
  const consignmentNo = "421001096857";
  const url = "https://ociconnect.tcscourier.com/tracking/api/Tracking/GetDynamicTrackDetail";

  console.log("--- TCS Final Header Diagnosis ---");

  const variations = [
    { auth: token },
    { auth: `Token ${token}` },
    { auth: `Key ${token}` },
    { auth: `Bearer ${token}`.trim() },
    { auth: `Basic ${Buffer.from("Saynoorpk@gmail.com:Saynoor123$").toString('base64')}` }
  ];

  for (const v of variations) {
    console.log(`\nTesting Authorization: ${v.auth}...`);
    try {
      const response = await axios({
        method: 'get',
        url: url,
        headers: {
          'Authorization': v.auth,
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': 'LGEC19865' // Trying combined
        },
        data: {
          consignee: [consignmentNo]
        }
      });
      console.log(`✅ Success!`);
      console.log("Data:", JSON.stringify(response.data, null, 2));
      return;
    } catch (err) {
      console.log(`❌ Failed (${err.response?.status}):`, err.response?.data?.message || err.message);
    }
  }
}

diagnoseFinal();
