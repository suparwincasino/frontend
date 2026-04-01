import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const convexUrl = import.meta.env.VITE_CONVEX_URL;

export async function getWallet(userId) {
  const response = await axios.get(`${backendUrl}/api/wallet?userId=${userId}`);
  return response.data;
}

export async function playDice(userId, betAmount) {
  const response = await axios.post(`${backendUrl}/api/play-dice`, { userId, betAmount });
  return response.data;
}
