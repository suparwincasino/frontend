import { useState, useEffect, useRef } from "react";
import {
  getUserWallet,
  getUserTransactions,
  placeBet,
  playGame,
  uploadFile,
  getFileUrl,
} from "./services/api";

export default function App() {
  const [userId] = useState(() => "user_" + Math.floor(Math.random() * 10000));
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [betAmount, setBetAmount] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const fileInput = useRef(null);

  /** Load wallet and transactions */
  useEffect(() => {
    async function fetchData() {
      const wallet = await getUserWallet(userId);
      setBalance(wallet.balance || 0);

      const txs = await getUserTransactions(userId);
      setTransactions(txs);
    }
    fetchData();
  }, [userId]);

  /** Handle file upload */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      const storageId = await uploadFile(selectedFile);
      const url = getFileUrl(storageId);
      setUploadedFileUrl(url);
      setSelectedFile(null);
      fileInput.current.value = "";
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  /** Handle placing bet */
  const handleBet = async () => {
    if (betAmount <= 0) return;

    try {
      await placeBet(userId, betAmount);
      // Refresh wallet & transactions
      const wallet = await getUserWallet(userId);
      setBalance(wallet.balance || 0);

      const txs = await getUserTransactions(userId);
      setTransactions(txs);
      setBetAmount(0);
    } catch (err) {
      console.error("Bet failed:", err);
    }
  };

  /** Handle playing a game */
  const handlePlayGame = async (gameId) => {
    try {
      const result = await playGame(gameId, userId);
      console.log("Game result:", result);

      // Refresh wallet & transactions
      const wallet = await getUserWallet(userId);
      setBalance(wallet.balance || 0);

      const txs = await getUserTransactions(userId);
      setTransactions(txs);
    } catch (err) {
      console.error("Game failed:", err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🎰 SuperWin Casino</h1>
      <p>
        <strong>User ID:</strong> {userId} | <strong>Balance:</strong> ${balance}
      </p>

      {/* Bet Section */}
      <div style={{ margin: "1rem 0" }}>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          placeholder="Bet amount"
        />
        <button onClick={handleBet}>Place Bet</button>
      </div>

      {/* Game Section */}
      <div style={{ margin: "1rem 0" }}>
        <button onClick={() => handlePlayGame("roulette")}>Play Roulette</button>
        <button onClick={() => handlePlayGame("jackpot")}>Play Jackpot</button>
      </div>

      {/* File Upload Section */}
      <form onSubmit={handleUpload} style={{ margin: "1rem 0" }}>
        <input
          type="file"
          ref={fileInput}
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button type="submit" disabled={!selectedFile}>
          Upload Avatar / Receipt
        </button>
      </form>
      {uploadedFileUrl && (
        <div>
          <p>Uploaded File:</p>
          <img src={uploadedFileUrl} alt="Uploaded" width={150} />
        </div>
      )}

      {/* Transaction History */}
      <div style={{ marginTop: "2rem" }}>
        <h2>Transactions</h2>
        <ul>
          {transactions.map((tx, idx) => (
            <li key={idx}>
              {tx.type} | ${tx
