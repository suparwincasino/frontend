import React from "react";

export default function WalletDisplay({ wallet }) {
  return (
    <div>
      <h2>Wallet Balance: ${wallet.balance}</h2>
    </div>
  );
}
