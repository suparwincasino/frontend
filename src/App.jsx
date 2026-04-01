import React, { useState, useEffect } from "react";
import WalletDisplay from "./components/WalletDisplay.jsx";
import { getWallet } from "./services/api.js";
import GamePage from "./pages/GamePage.jsx";

export default function App() {
  const [wallet, setWallet] = useState({ balance: 0 });
  const [userId] = useState("user-" + Math.floor(Math.random() * 10000));

  useEffect(() => {
    async function fetchWallet() {
      const w = await getWallet(userId);
      setWallet(w);
    }
    fetchWallet();
  }, [userId]);

  return (
    <div>
      <h1>SuperWin Casino</h1>
      <WalletDisplay wallet={wallet} />
      <GamePage userId={userId} />
    </div>
  );
}
