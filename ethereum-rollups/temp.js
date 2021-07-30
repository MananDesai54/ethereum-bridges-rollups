#!/usr/bin/node
const Web3 = require("web3");
const { abi, networks } = require("./build/contracts/Rollup.json");
const { privateKeys } = require("./keys");

const web3 = new Web3("http://localhost:7545");
const contract = new web3.eth.Contract(abi, networks[5777].address);

const randomAccount = Math.floor(Math.random() * 10);
const { address: admin } = web3.eth.accounts.wallet.add(privateKeys[0]);
console.log(privateKeys[0]);
(async function main() {
  const accounts = await web3.eth.getAccounts();
  const defaultAccount = accounts[0];
  const nonce = 1;
  const data = "The Txn History";
  const timestamp = Date.now();
  const message = web3.utils
    .soliditySha3(
      { t: "address", v: defaultAccount },
      { t: "uint256", v: timestamp },
      { t: "string", v: data },
      { t: "uint256", v: nonce }
    )
    .toString("hex");
  const { signature } = web3.eth.accounts.sign(
    message,
    "9a090ab184923f8e1fb2df0d3045f0a84619b2f96c5477187d797417441070f5"
  );
  const tx = contract.methods.mintTxnProof(
    defaultAccount,
    timestamp,
    data,
    nonce,
    signature
  );
  const [gasPrice, gasCost] = await Promise.all([
    web3.eth.getGasPrice(),
    tx.estimateGas({ from: defaultAccount }),
  ]);
  console.log(gasPrice, gasCost);
})().catch((error) => console.log(error.message));
