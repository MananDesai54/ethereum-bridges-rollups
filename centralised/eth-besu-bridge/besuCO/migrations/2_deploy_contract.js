const Balance = artifacts.require("Balance");

module.exports = function (deployer) {
  deployer.deploy(Balance);
};
