import React from "react";
import "./All.css";

export const ConnectWalletButton = ({ account }) => {
    return (
        <button className="connect-btn">
            {account ? `Connected to ${account.slice(0, 6)}...` : "Connect Wallet"}
        </button>
    )
}