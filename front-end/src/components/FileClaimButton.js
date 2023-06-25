import { insuranceAbi } from "../blockchain/abi";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useContractWrite, isConnected, useAccount } from "wagmi";
import { useState } from "react";

const FileCliamButton = () => {
  let insuranceContractAddress = "0x8276496D593992Aba90e888604c2C2C138fE9Bfe";
  const { isConnected } = useAccount();
  const [policyId, setPolicyId] = useState("");

  const handlePolicyIdChange = (event) => {
    setPolicyId(event.target.value);
  };

  const contractWriteRequestPayout = useContractWrite({
    address: insuranceContractAddress,
    abi: insuranceAbi,
    functionName: "requestPayout",
    args: [policyId],
  });

  const contractWriteSettle = useContractWrite({
    address: insuranceContractAddress,
    abi: insuranceAbi,
    functionName: "settleAndGetAssertionResult",
    args: [policyId],
  });

  const handleSendTransaction = async (w) => {
    try {
      await w.writeAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileClick = () => {
    handleSendTransaction(contractWriteRequestPayout);
  };

  const handleSettleClick = () => {
    handleSendTransaction(contractWriteSettle);
  };

  return (
    <Flex flexDirection="column" gap="10">
      <Heading size="xl"> File insurance claims </Heading>
      {!isConnected && (
        <Heading size="md"> Connect to your wallet first</Heading>
      )}

      {isConnected && (
        <>
          <FormControl isRequired>
            <FormLabel>Policy Id</FormLabel>
            <Input placeholder="Policy Id" onChange={handlePolicyIdChange} />
          </FormControl>

          <Button onClick={handleFileClick}>File</Button>

          <Button onClick={handleSettleClick}>Settle</Button>
        </>
      )}
    </Flex>
  );
};

export default FileCliamButton;
