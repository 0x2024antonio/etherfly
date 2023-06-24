// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleStorage is Ownable {
    string public x = "Hello Ethereum!";
    uint256 public MINT_FEE = 0.001 ether;

    constructor(address _owner) {
        _transferOwnership(_owner);
    }

    function setX(string memory _x) external payable {
        require(msg.value >= MINT_FEE);
        x = _x;
    }

    function setMintFee(uint256 _fee) external onlyOwner {
        MINT_FEE = _fee;
    }
}
