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
  Link,
} from "@chakra-ui/react";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex alignItems="Center" bg={useColorModeValue("gray.100", "gray.900")}>
      <Box ml="2" mr="10">
        <Heading size="md"> Etherfly </Heading>
      </Box>

      <Box ml="2" mr="2">
        <Heading size="md">
          <Link href="buy">Buy Insurance</Link>
        </Heading>
      </Box>

      <Box ml="2" mr="2">
        <Heading size="md">
          <Link href="file">File claims</Link>
        </Heading>
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
