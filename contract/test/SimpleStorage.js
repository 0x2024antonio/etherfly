const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("SimpleStorage", function () {
  async function deployFixture() {
    const [deployer, otherAccount] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy(deployer.address);

    await simpleStorage.waitForDeployment();

    return { simpleStorage, deployer, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { simpleStorage, deployer } = await loadFixture(deployFixture);
      expect(await simpleStorage.owner()).to.equal(deployer.address);
    });

    it("Should set the right x", async function () {
      const { simpleStorage } = await loadFixture(deployFixture);
      expect(await simpleStorage.x()).to.equal("Hello Ethereum!");
    });

    it("Should set the right MINT_FEE", async function () {
      const { simpleStorage } = await loadFixture(deployFixture);
      expect(await simpleStorage.MINT_FEE()).to.equal(
        hre.ethers.parseEther("0.001")
      );
    });
  });

  describe("setMintFee", function () {
    it("should set MintFee correctly by owner", async function () {
      const { simpleStorage, deployer, otherAccount } = await loadFixture(
        deployFixture
      );
      await simpleStorage.setMintFee(hre.ethers.parseEther("0.01"));

      expect(await simpleStorage.MINT_FEE()).to.equal(
        hre.ethers.parseEther("0.01")
      );
    });

    it("should not allow other to set MintFee", async function () {
      const { simpleStorage, deployer, otherAccount } = await loadFixture(
        deployFixture
      );

      await expect(
        simpleStorage
          .connect(otherAccount)
          .setMintFee(hre.ethers.parseEther("0.01"))
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
