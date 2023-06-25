const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  //const owner = deployer.address;
  const contractName = "Insurance";
  const networkName = process.env.HARDHAT_NETWORK;
  const parameters = {
    goerli: {
      defaultCurrency: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
      optimisticOracleV3: "0x9923D42eF695B5dd9911D05Ac944d4cAca3c4EAB",
    },
    polygonMumbai: {
      defaultCurrency: "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747",
      optimisticOracleV3: "0x263351499f82C107e540B01F0Ca959843e22464a",
    },
  };

  const defaultCurrency = parameters[networkName].defaultCurrency;
  const optimisticOracleV3 = parameters[networkName].optimisticOracleV3;

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
