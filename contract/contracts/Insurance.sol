// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.0;

import "@uma/core/contracts/optimistic-oracle-v3/implementation/ClaimData.sol";
import "@uma/core/contracts/optimistic-oracle-v3/interfaces/OptimisticOracleV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

// This Isurance contract enables for the issuance of a single unlimited time policy per event/payout recipient There is
// no limit to the number of payout requests that can be made of the same policy; however, only the first asserted
// request will settle the insurance payment, whereas OOv3 will settle bonds for all requestors.
contract Insurance {
    using SafeERC20 for IERC20;
    IERC20 public immutable defaultCurrency;
    OptimisticOracleV3Interface public immutable oo;
    uint64 public assertionLiveness = 120;
    bytes32 public immutable defaultIdentifier;
    address public immutable owner;

    struct Policy {
        bytes32 policyId;
        bytes32 assertionId;
        uint256 insuranceAmount;
        address payoutAddress;
        bytes insuredEvent;
        bool settled;
        bool asserted;
    }

    mapping(bytes32 => bytes32) public assertedPolicies;

    mapping(bytes32 => Policy) public policies;

    mapping(address => bytes32[]) addressToPolicyIds;

    event InsuranceIssued(
        bytes32 indexed policyId,
        bytes insuredEvent,
        uint256 insuranceAmount,
        address indexed payoutAddress
    );

    event InsurancePayoutRequested(
        bytes32 indexed policyId,
        bytes32 indexed assertionId
    );

    event InsurancePayoutSettled(
        bytes32 indexed policyId,
        bytes32 indexed assertionId
    );

    constructor(address _defaultCurrency, address _optimisticOracleV3) {
        require(
            _defaultCurrency != address(0),
            "_defaultCurrency cannot be 0x0"
        );
        require(
            _optimisticOracleV3 != address(0),
            "_optimisticOracleV3 cannot be 0x0"
        );
        owner = msg.sender;
        defaultCurrency = IERC20(_defaultCurrency);
        oo = OptimisticOracleV3Interface(_optimisticOracleV3);
        defaultIdentifier = oo.defaultIdentifier();
    }

    function setAssertionLiveness(uint64 _value) public {
        require(owner == msg.sender, "Only owner is allowed.");
        assertionLiveness = _value;
    }

    function getMyPolicies() public view returns (Policy[] memory) {
        bytes32[] memory myPolicyIds = addressToPolicyIds[msg.sender];
        Policy[] memory myPolicies = new Policy[](myPolicyIds.length);
        for (uint i = 0; i < myPolicyIds.length; ++i) {
            myPolicies[i] = policies[myPolicyIds[i]];
        }
        return myPolicies;
    }

    function issueInsurance(
        uint256 insuranceAmount,
        address payoutAddress,
        string calldata insuredEventString
    ) public returns (bytes32 policyId) {
        bytes memory insuredEvent = bytes(insuredEventString);
        policyId = keccak256(abi.encode(insuredEvent, payoutAddress));
        require(
            policies[policyId].payoutAddress == address(0),
            "Policy already exists"
        );
        policies[policyId] = Policy({
            policyId: policyId,
            assertionId: 0,
            insuranceAmount: insuranceAmount,
            payoutAddress: payoutAddress,
            insuredEvent: insuredEvent,
            settled: false,
            asserted: false
        });
        defaultCurrency.safeTransferFrom(
            msg.sender,
            address(this),
            insuranceAmount
        );
        addressToPolicyIds[msg.sender].push(policyId);
        emit InsuranceIssued(
            policyId,
            insuredEvent,
            insuranceAmount,
            payoutAddress
        );
    }

    function requestPayout(
        bytes32 policyId
    ) public returns (bytes32 assertionId) {
        require(
            policies[policyId].payoutAddress != address(0),
            "Policy does not exist"
        );
        uint256 bond = oo.getMinimumBond(address(defaultCurrency));
        defaultCurrency.safeTransferFrom(msg.sender, address(this), bond);
        defaultCurrency.safeApprove(address(oo), bond);
        assertionId = oo.assertTruth(
            abi.encodePacked(
                //"Insurance contract is claiming that insurance event ",
                policies[policyId].insuredEvent
                //" had occurred as of ",
                //ClaimData.toUtf8BytesUint(block.timestamp),
                //"."
            ),
            msg.sender,
            address(this),
            address(0), // No sovereign security.
            assertionLiveness,
            defaultCurrency,
            bond,
            defaultIdentifier,
            bytes32(0) // No domain.
        );
        policies[policyId].asserted = true;
        policies[policyId].assertionId = assertionId;
        assertedPolicies[assertionId] = policyId;
        emit InsurancePayoutRequested(policyId, assertionId);
    }

    function settleAndGetAssertionResult(
        bytes32 policyId
    ) public returns (bool) {
        require(
            policies[policyId].payoutAddress != address(0),
            "Policy does not exist"
        );
        require(policies[policyId].asserted, "Policy has not been asserted");
        return oo.settleAndGetAssertionResult(policies[policyId].assertionId);
    }

    function assertionResolvedCallback(
        bytes32 assertionId,
        bool assertedTruthfully
    ) public {
        require(msg.sender == address(oo));
        // If the assertion was true, then the policy is settled.
        if (assertedTruthfully) {
            _settlePayout(assertionId);
        }
    }

    function assertionDisputedCallback(bytes32 assertionId) public {}

    function _settlePayout(bytes32 assertionId) internal {
        // If already settled, do nothing. We don't revert because this function is called by the
        // OptimisticOracleV3, which may block the assertion resolution.
        bytes32 policyId = assertedPolicies[assertionId];
        Policy storage policy = policies[policyId];
        if (policy.settled) return;
        policy.settled = true;
        defaultCurrency.safeApprove(
            policies[policyId].payoutAddress,
            policies[policyId].insuranceAmount
        );
        defaultCurrency.safeTransfer(
            policies[policyId].payoutAddress,
            policies[policyId].insuranceAmount
        );
        emit InsurancePayoutSettled(policyId, assertionId);
    }
}
