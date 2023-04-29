import React, { useEffect } from "react";
import Web3 from "web3";
import ABI from "../nftassets/polygonboyzabi";

export default function Wallet() {
  async function getWalletInfo() {
    const etherApiKey = "2AIHB5QUF6BY1RWFFGGTS72XRU9JJUUV2C";
    const polygonApiKey = "IABG1DSN45E65EKJ85NJ4FEPV7YC8NGIN4";
    const walletAddress = "0x53b6916FeF8Fc782fc277FFd4eCDa68326AefC38";
    const uri = `https://api.polygonscan.com/api
    ?module=account
    &action=tokennfttx
    &address=${walletAddress}
    &startblock=0
    &endblock=99999999
    &page=1
    &offset=100
    &sort=asc
    &apikey=${polygonApiKey}`;
    const url = new URL(uri.replaceAll("\n", "").replaceAll(" ", ""));
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  }

  async function getSpecificABI() {
    const walletAddress = "0x53b6916FeF8Fc782fc277FFd4eCDa68326AefC38";
    const contractAddress = "0x9e1D5446848bAD4DeC230a7624699edD5e23c088";
    const polygonboyzabi = ABI;
    const web3 = new Web3();
    const contract = new web3.eth.Contract(polygonboyzabi, contractAddress);
    contract.defaultAccount = walletAddress;
    contract.setProvider(web3.currentProvider);
    console.log(contract);
    const polygonboyzbalance = await contract.methods
      .balanceOf(walletAddress)
      .call();
    console.log(polygonboyzbalance);
  }
  return (
    <div>
      <button onClick={getSpecificABI}>Get Wallet Info</button>
    </div>
  );
}
