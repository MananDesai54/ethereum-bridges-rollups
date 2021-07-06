#!/usr/bin/node
const Web3 = require("web3");
const { besuABI } = require("./abi");
const { web3Eth, ethContractInstance } = require("./eth");

const besuUrl = "http://localhost:8545";
const besuWsUrl = "ws://localhost:8546";
const web3Besu = new Web3(besuWsUrl);
web3Besu.transactionConfirmationBlocks = 1;
const besuAccountPrivateKey =
  "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";
const besuAccount = "0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73";

const functionName = process.argv[2];

const besuContractInstance = new web3Besu.eth.Contract(
  besuABI,
  "0xa775Fd3eb96956b2284e96298Bd12624A9C952D2"
);

async function main(functionName) {
  if (functionName === "getBalance") {
    const besuBalance = await besuContractInstance.methods.getBalance().call();
    console.log("Besu Tasks", besuBalance);
  } else if (functionName === "addBalance") {
    const tx = {
      from: besuAccount,
      // target address, this could be a smart contract address
      to: "0xa775Fd3eb96956b2284e96298Bd12624A9C952D2",
      // optional if you want to specify the gas limit
      gas: 100000,
      // this encodes the ABI of the method and the arguments
      data: besuContractInstance.methods
        .addBalance(+process.argv[3])
        .encodeABI(),
    };
    const signPromise = web3Besu.eth.accounts.signTransaction(
      tx,
      besuAccountPrivateKey
    );
    signPromise
      .then((signedTx) => {
        // raw transaction string may be available in .raw or
        // .rawTransaction depending on which signTransaction
        // function was called
        const sentTx = web3Besu.eth.sendSignedTransaction(
          signedTx.raw || signedTx.rawTransaction
        );
        sentTx.on("receipt", (receipt) => {
          console.log(receipt);
        });
        sentTx.on("error", (err) => {
          console.log(err.message);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}
main(functionName).catch((error) => console.log(error.message));

besuContractInstance.events
  .balanceChanged({ fromBlock: 0, step: 0 })
  .on("data", async (_event) => {
    try {
      const besuBalance = await besuContractInstance.methods
        .getBalance()
        .call();
      console.log(besuBalance);
      if (besuBalance % 5 === 0) {
        const ethAccounts = await web3Eth.eth.getAccounts();
        const hash = await ethContractInstance.methods
          .updateBalance(besuBalance)
          .send({ from: ethAccounts[0], gas: 100000 });
        console.log("Sent To Ethereum:", hash);
      }
    } catch (error) {
      console.log(error.message);
    }
  });

module.exports = {
  web3Besu,
  besuContractInstance,
};
