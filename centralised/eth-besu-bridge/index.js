#!/usr/bin/node
const Web3 = require("web3");
const { web3Besu, besuContractInstance } = require("./besu");
const { web3Eth, ethContractInstance } = require("./eth");
const besuAccountPrivateKey =
  "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";
const besuAccount = "0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73";

async function main() {
  // const ethAccounts = await web3Eth.eth.getAccounts();
  // console.log("Eth Accounts \n", ethAccounts);
  // const ethTasks = await ethContractInstance.methods.getTodos().call();
  // console.log(ethTasks);
  // const tx = {
  //   from: besuAccount,
  //   // target address, this could be a smart contract address
  //   to: "0x9a3DBCa554e9f6b9257aAa24010DA8377C57c17e",
  //   // optional if you want to specify the gas limit
  //   gas: 100000,
  //   // this encodes the ABI of the method and the arguments
  //   data: besuContractInstance.methods.addTodo(2, "Testing").encodeABI(),
  // };
  // const signPromise = web3Besu.eth.accounts.signTransaction(
  //   tx,
  //   besuAccountPrivateKey
  // );
  // signPromise
  //   .then((signedTx) => {
  //     // raw transaction string may be available in .raw or
  //     // .rawTransaction depending on which signTransaction
  //     // function was called
  //     const sentTx = web3Besu.eth.sendSignedTransaction(
  //       signedTx.raw || signedTx.rawTransaction
  //     );
  //     sentTx.on("receipt", (receipt) => {
  //       console.log(receipt);
  //     });
  //     sentTx.on("error", (err) => {
  //       console.log(err.message);
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //   });
  // const besuTasks = await besuContractInstance.methods.getTodos().call();
  // besuContractInstance.events
  //   .todoAdded({ fromBlock: 0, step: 0 })
  //   .on("data", async (event) => {
  //     console.log(event);
  //     console.log(besuTasks);
  //   });
  console.log("Use Scripts for better understanding");
}
main().catch((error) => console.log(error.message));
