import { Flex, Heading } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";

const MyPolicy = () => {
  return (
    <Flex flexDirection="column" gap="10">
      <Heading size="xl"> My policy </Heading>

      <Flex flexDirection="column">
        <FormLabel>Policy Id</FormLabel>
        <p>test test test</p>

        <FormLabel>Insurance statement</FormLabel>
        <p>test test test</p>
      </Flex>
    </Flex>
  );
};

export default MyPolicy;
