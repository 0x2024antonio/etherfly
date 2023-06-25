const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  //const owner = deployer.address;
  const contractName = "Insurance";
  const defaultCurrency = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
  const optimisticOracleV3 = "0x9923D42eF695B5dd9911D05Ac944d4cAca3c4EAB";

  console.log(
    `Deploying ${contractName} contract with the account: ${deployer.address}`
  );

  const insurance = await hre.ethers.deployContract(contractName, [
    defaultCurrency,
    optimisticOracleV3,
  ]);

  await insurance.waitForDeployment();

  console.log(`${contractName} was deployed to ${insurance.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
