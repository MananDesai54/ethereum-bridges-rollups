#!/usr/bin/node
const Web3 = require("web3");
const { abi, networks } = require("./build/contracts/Rollup.json");
const { privateKeys } = require("./keys");

const web3 = new Web3("http://localhost:7545");
const contract = new web3.eth.Contract(abi, networks[5777].address);

/**
 * Use account randomly so who ever do the rolling up txn have to pay gas fee and we will give him our ERC20 token as a rolling up reward
 * How's the idea ?
 */
const randomAccount = Math.floor(Math.random() * 10);
// const { address: admin } = web3.eth.accounts.wallet.add(privateKeys[0]);

(async function main() {
  const accounts = await web3.eth.getAccounts();
  const defaultAccount = accounts[0];
  const args = process.argv;
  if (args[2] === "mint") {
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
    const { signature } = web3.eth.accounts.sign(message, privateKeys[0]);

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
    const txEncodeData = tx.encodeABI();
    const txData = {
      from: defaultAccount,
      to: contract.options.address,
      data: txEncodeData,
      gas: gasCost,
      gasPrice,
    };

    const receipt = await web3.eth.sendTransaction(txData);
    console.log(`Transaction Hash: ${receipt.transactionHash}`);
    console.log(`
    Processed data:
      - from ${defaultAccount}
      - data ${data}
      - timestamp ${timestamp}
      - nonce ${nonce}
    `);
  } else if (args[2] === "getData") {
    const result = await contract.methods.getRolledUpData(1).call();
    console.log(result);
  } else {
    console.log(`
    Provide valid option
     - mint
     - getData
    `);
  }
})().catch((error) => console.log(error.message));
