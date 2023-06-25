import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import BuyInsuranceButton from "./BuyInsuranceButton";
import MyPolicy from "./MyPolicy";

const Main = () => {
  return (
    <Flex justify="center" alignItems="center" h="100vh">
      <BuyInsuranceButton />
    </Flex>
  );
};

export default Main;
