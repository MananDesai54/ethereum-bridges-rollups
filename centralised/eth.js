#!/usr/bin/node
const Web3 = require("web3");
const { ethABI } = require("./abi");

const etherUrl = "http://localhost:7545";
const web3Eth = new Web3(etherUrl);
const functionName = process.argv[2];

const ethContractInstance = new web3Eth.eth.Contract(
  ethABI,
  "0x66d599fF969Fdb80a56B5eB604174B8861728E11"
);

async function main(functionName) {
  if (functionName === "getBalance") {
    const besuTasks = await ethContractInstance.methods.getBalance().call();
    console.log(besuTasks);
  } else if (functionName === "updateBalance") {
    const ethAccounts = await web3Eth.eth.getAccounts();
    console.log(ethAccounts);
    const hash = await ethContractInstance.methods
      .updateBalance(0)
      .send({ from: ethAccounts[0], gas: 100000 });
    console.log("Sent To Ethereum:", hash);
  }
}
main(functionName).catch((error) => console.log(error));

module.exports = {
  web3Eth,
  ethContractInstance,
};
