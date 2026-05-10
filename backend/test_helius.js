const axios = require("axios");
require("dotenv").config();

const HELIUS_API_KEY = process.env.HELIUS_API_KEY;
const BASE_URL = "https://api.helius.xyz/v0";
const address = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU";

async function test() {
  try {
    const response = await axios.get(
      `${BASE_URL}/addresses/${address}/transactions?api-key=${HELIUS_API_KEY}`
    );
    console.log("Transaction count:", response.data.length);
    if (response.data.length > 0) {
      const tx = response.data[0];
      console.log("Keys:", Object.keys(tx));
      console.log("Sample Timestamp:", tx.timestamp);
      console.log("Sample blockTime:", tx.blockTime);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

test();
