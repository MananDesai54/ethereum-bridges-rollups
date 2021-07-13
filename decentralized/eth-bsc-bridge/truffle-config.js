const HDWalletProvider = require("@truffle/hdwallet-provider");
const { keys } = require("./key");
const mnemonic = keys.mnemonic;

module.exports = {
  networks: {
    ethTestnet: {
      provider: () =>
        new HDWalletProvider(mnemonic, keys.infuraRinkebyWssURL, 0, 1),
      network_id: 4, //rinkeby
      skipDryRun: true,
    },
    bscTestnet: {
      provider: () => new HDWalletProvider(mnemonic, keys.binanceTestNetURL),
      network_id: 97, // binance testnet
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
