import { insuranceAbi } from "../blockchain/abi";

import {
  useContractRead,
  useContractWrite,
  //usePrepareContractWrite,
  //useWaitForTransaction,
  //useNetwork,
} from "wagmi";

const MyPolicyContent = (address) => {
  const insuranceContractAddress = "0x8276496D593992Aba90e888604c2C2C138fE9Bfe";

  /*
  const { data } = useContractRead({
    address: insuranceContractAddress,
    abi: insuranceAbi,
    functionName: "getMyPolicies",
  });
  */

  return <div>{address}</div>;
};

export default MyPolicyContent;
