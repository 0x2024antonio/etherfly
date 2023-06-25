import { Flex, Heading } from "@chakra-ui/react";
import MyPolicyContent from "./MyPolicyContent";

import { useAccount } from "wagmi";

const MyPolicy = () => {
  const { address, isConnected } = useAccount();
  console.log(address);

  return (
    <Flex flexDirection="column" gap="10">
      <Heading size="xl"> My policy </Heading>

      {!isConnected && (
        <Heading size="md"> Connect to your wallet first</Heading>
      )}

      {isConnected && MyPolicyContent(address)}
    </Flex>
  );
};

export default MyPolicy;
