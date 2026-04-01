// frontend/src/services/api.js
import { ConvexReactClient } from "convex/react";
import { VITE_CONVEX_URL, VITE_FILE_STORAGE_URL } from "../config";
import * as Back4App from "./back4app";

// Initialize Convex client
export const convex = new ConvexReactClient(VITE_CONVEX_URL);

/**
 * ===== Convex Wallet / Transaction API =====
 */

/**
 * Fetch user wallet balance
 * @param {string} userId
 */
export async function getUserWallet(userId) {
  return await Back4App.getUserBalance(userId);
}

/**
 * Fetch user transactions
 * @param {string} userId
 */
export async function getUserTransactions(userId) {
  return await Back4App.getUserTransactions(userId);
}

/**
 * Create a deposit/withdrawal transaction
 * @param {string} userId
 * @param {"deposit"|"withdraw"|"bet"|"win"} type
 * @param {number} amount
 */
export async function createTransaction(userId, type, amount) {
  return await Back4App.addTransaction(userId, type, amount);
}

/**
 * Update wallet balance
 * @param {string} userId
 * @param {number} balance
 */
export async function updateWallet(userId, balance) {
  return await Back4App.updateWallet(userId, balance);
}

/**
 * ===== File Storage API =====
 */

/**
 * Upload a file to File Storage
 * @param {File} file
 * @returns {Promise<string>} storageId
 */
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${VITE_FILE_STORAGE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("File upload failed");
  const data = await res.json();
  return data.storageId;
}

/**
 * Get file URL from storageId
 * @param {string} storageId
 */
export function getFileUrl(storageId) {
  return `${VITE_FILE_STORAGE_URL}/get?storageId=${storageId}`;
}

/**
 * ===== Game API =====
 */

/**
 * Place a bet via Convex function
 * @param {string} userId
 * @param {number} amount
 */
export async function placeBet(userId, amount) {
  return await convex.mutation("bet", { userId, amount });
}

/**
 * Spin game or run jackpot
 * @param {string} gameId
 * @param {string} userId
 */
export async function playGame(gameId, userId) {
  return await convex.mutation("playGame", { gameId, userId });
}
