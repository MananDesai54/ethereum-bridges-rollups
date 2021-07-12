const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic =
  "crane biology wise spider spring loyal sibling fatigue swamp own thumb hill";

module.exports = {
  networks: {
    ethTestnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          "wss://rinkeby.infura.io/ws/v3/27cdacf76669427298e3f6931196f335",
          0,
          1
        ),
      network_id: 4, //rinkeby
      skipDryRun: true,
    },
    bscTestnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://data-seed-prebsc-1-s1.binance.org:8545`
        ),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: false,
    },
  },

  mocha: {},

  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};
