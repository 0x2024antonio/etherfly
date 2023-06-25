import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex alignItems="Center" bg={useColorModeValue("gray.100", "gray.900")}>
      <Box ml="2">
        <Heading size="md"> Etherfly </Heading>
      </Box>
      <Spacer />
      <ButtonGroup m="2">
        <ConnectButton />
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default NavBar;
