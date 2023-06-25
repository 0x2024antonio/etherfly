import { useState } from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

const BuyInsuranceButton = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const buyInsurance = (event) => {
    let s = `${flightNumber} departed on ${departureDate} arrived with a delay more than 3 hours`;
    console.log(s);
  };

  return (
    <Flex flexDirection="column" gap="10">
      <Heading size="xl"> Buy flight delay insurance </Heading>

      <FormControl isRequired>
        <FormLabel>Fligt number</FormLabel>
        <Input
          placeholder="Flight number"
          onChange={(e) => setFlightNumber(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Departure date</FormLabel>
        <Input
          placeholder="Departure date"
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </FormControl>

      <Button onClick={buyInsurance}>Buy</Button>
    </Flex>
  );
};

export default BuyInsuranceButton;
