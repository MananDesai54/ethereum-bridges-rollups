const Rollup = artifacts.require("Rollup");

module.exports = function (deployer) {
  deployer.deploy(Rollup);
};
