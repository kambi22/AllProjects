
// const MyNFT = artifacts.require("MyNFT");

// module.exports = function(deployer) {
//   deployer.deploy(MyNFT,"Satnam","S");
// };

// const DutchAuction = artifacts.require("DutchAuction");

// module.exports = function(deployer) {
//   deployer.deploy(DutchAuction);
// };
// const EnglishAuction = artifacts.require("EnglishAuction");

// module.exports = function(deployer) {
//   deployer.deploy(EnglishAuction);
// };
const Multisig = artifacts.require("Multisig");

module.exports = function(deployer) {
  deployer.deploy(Multisig);
};


