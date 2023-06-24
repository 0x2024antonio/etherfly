const hre = require("hardhat");

async function main() {
  const OWNER = "0xcfC55DF43fB52CC8a6107AFb74798054Aa11f5c4";
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  //const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
  //const simpleStorage = await SimpleStorage.deploy(OWNER);

  const simpleStorage = await hre.ethers.deployContract("SimpleStorage", [
    OWNER,
  ]);

  await simpleStorage.waitForDeployment();

  console.log(`SimpleStorage was deployed to ${simpleStorage.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
