import React, { useState } from "react";
import { ethers } from "ethers";

const Wallet = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
        });
    } else {
      setErrorMessage("Install MetaMask");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount.toString());
  };

  const getUserBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        setUserBalance(ethers.formatEther(balance));
      });
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  window.ethereum.on("accountsChanged", accountChangedHandler);
  window.ethereum.on("chainChanged", chainChangedHandler);

  return (
    <div className="wallet-container">
      <div className="wallet-info">
        <h3>{"Connection to MetaMask using window.ethereum methods"}</h3>
        <button onClick={connectWalletHandler}>{connButtonText}</button>
        <div>
          <h3>Address: {defaultAccount}</h3>
          <h3>Balance: {userBalance}</h3>
        </div>
        {errorMessage}
      </div>
    </div>
  );
};

export default Wallet;
