const insuranceAbi = [
  {
    inputs: [
      { internalType: "address", name: "_defaultCurrency", type: "address" },
      { internalType: "address", name: "_optimisticOracleV3", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "policyId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "insuredEvent",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "insuranceAmount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "payoutAddress",
        type: "address",
      },
    ],
    name: "InsuranceIssued",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "policyId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "assertionId",
        type: "bytes32",
      },
    ],
    name: "InsurancePayoutRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "policyId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "assertionId",
        type: "bytes32",
      },
    ],
    name: "InsurancePayoutSettled",
    type: "event",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "assertedPolicies",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "assertionId", type: "bytes32" }],
    name: "assertionDisputedCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "assertionLiveness",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "assertionId", type: "bytes32" },
      { internalType: "bool", name: "assertedTruthfully", type: "bool" },
    ],
    name: "assertionResolvedCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultCurrency",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultIdentifier",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyPolicies",
    outputs: [
      {
        components: [
          { internalType: "bytes32", name: "policyId", type: "bytes32" },
          { internalType: "bytes32", name: "assertionId", type: "bytes32" },
          { internalType: "uint256", name: "insuranceAmount", type: "uint256" },
          { internalType: "address", name: "payoutAddress", type: "address" },
          { internalType: "bytes", name: "insuredEvent", type: "bytes" },
          { internalType: "bool", name: "settled", type: "bool" },
          { internalType: "bool", name: "asserted", type: "bool" },
        ],
        internalType: "struct Insurance.Policy[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "insuranceAmount", type: "uint256" },
      { internalType: "address", name: "payoutAddress", type: "address" },
      { internalType: "string", name: "insuredEventString", type: "string" },
    ],
    name: "issueInsurance",
    outputs: [{ internalType: "bytes32", name: "policyId", type: "bytes32" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "oo",
    outputs: [
      {
        internalType: "contract OptimisticOracleV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "policies",
    outputs: [
      { internalType: "bytes32", name: "policyId", type: "bytes32" },
      { internalType: "bytes32", name: "assertionId", type: "bytes32" },
      { internalType: "uint256", name: "insuranceAmount", type: "uint256" },
      { internalType: "address", name: "payoutAddress", type: "address" },
      { internalType: "bytes", name: "insuredEvent", type: "bytes" },
      { internalType: "bool", name: "settled", type: "bool" },
      { internalType: "bool", name: "asserted", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "policyId", type: "bytes32" }],
    name: "requestPayout",
    outputs: [
      { internalType: "bytes32", name: "assertionId", type: "bytes32" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint64", name: "_value", type: "uint64" }],
    name: "setAssertionLiveness",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "policyId", type: "bytes32" }],
    name: "settleAndGetAssertionResult",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const defaultCurrencyAbi = [
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export { insuranceAbi, defaultCurrencyAbi };
