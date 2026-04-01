import React, { useState } from "react";
import { playDice } from "../services/api.js";

export default function GamePage({ userId }) {
  const [gameResult, setGameResult] = useState(null);
  const [betAmount, setBetAmount] = useState(10);

  const handlePlay = async () => {
    const result = await playDice(userId, betAmount);
    setGameResult(result);
  };

  return (
    <div>
      <h2>Dice Game</h2>
      <input
        type="number"
        value={betAmount}
        onChange={(e) => setBetAmount(Number(e.target.value))}
      />
      <button onClick={handlePlay}>Play Dice</button>
      {gameResult && (
        <div>
          <p>Dice Roll: {gameResult.diceRoll}</p>
          <p>Win Amount: {gameResult.winAmount}</p>
          <p>New Balance: {gameResult.newBalance}</p>
        </div>
      )}
    </div>
  );
}
