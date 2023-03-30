import React, { useState } from "react";
import { ethers } from "ethers";
import { Button } from "antd";

import icon from "../images/metamask-fox-logo.jpeg";

const Wallet = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setWalletConnected(!walletConnected);
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
        <h3>{"Connect to MetaMask using window.ethereum methods"}</h3>
        <img src={icon} />
        {!walletConnected && (
          <Button onClick={connectWalletHandler}>Connect Wallet</Button>
        )}
        <div className="wallet-stats">
          <h3>Address: {defaultAccount}</h3>
          <h3>Balance: {userBalance} ~ ETH</h3>
        </div>
        {errorMessage}
      </div>
    </div>
  );
};

export default Wallet;
