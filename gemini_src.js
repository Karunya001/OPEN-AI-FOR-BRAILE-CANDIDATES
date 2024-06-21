import axios from 'axios';
import crypto from 'crypto-js';  // Use crypto-js for hashing on the client-side

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const GEMINI_API_SECRET = process.env.REACT_APP_GEMINI_API_SECRET;
const GEMINI_API_URL = process.env.REACT_APP_GEMINI_API_URL;

const geminiAxios = axios.create({
  baseURL: GEMINI_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-GEMINI-APIKEY': GEMINI_API_KEY,
  },
});

function getGeminiHeaders(payload) {
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = crypto.HmacSHA384(payloadBase64, GEMINI_API_SECRET).toString(crypto.enc.Hex);

  return {
    'X-GEMINI-PAYLOAD': payloadBase64,
    'X-GEMINI-SIGNATURE': signature,
  };
}

export async function getAccountBalance() {
  const url = '/balances';
  const payload = {
    request: url,
    nonce: Date.now(),
  };

  try {
    const response = await geminiAxios.post(url, {}, {
      headers: getGeminiHeaders(payload),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching account balance:', error.response ? error.response.data : error.message);
    throw error;
  }
}
