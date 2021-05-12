var Electioneering = artifacts.require("./Electioneering.sol");

module.exports = function(deployer) {
  deployer.deploy(Electioneering);
};