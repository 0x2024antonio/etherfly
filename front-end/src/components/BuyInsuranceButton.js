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
  const [insuranceStatement, setInsuranceStatement] = useState("");

  const [previewed, setPreviewed] = useState(false);
  const [approved, setApproved] = useState(false);

  const generateInsuranceStatement = () => {
    let s = `${flightNumber} departed on ${departureDate} arrived with a delay more than 3 hours`;
    setInsuranceStatement(s);
  };

  const handleFlightNumberChange = (event) => {
    setFlightNumber(event.target.value);
  };

  const handleDepartureDateChange = (event) => {
    setDepartureDate(event.target.value);
  };

  const handlePreviewClick = (event) => {
    setPreviewed(true);
    generateInsuranceStatement();
  };

  const handleApproveClick = (event) => {
    setApproved(true);
  };

  const handleBuyClick = (event) => {};

  return (
    <Flex flexDirection="column" gap="10">
      <Heading size="xl"> Buy flight delay insurance </Heading>

      <FormControl isRequired>
        <FormLabel>Fligt number</FormLabel>
        <Input
          placeholder="Flight number"
          onChange={handleFlightNumberChange}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Departure date</FormLabel>
        <Input
          placeholder="Departure date"
          onChange={handleDepartureDateChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Insurance statement</FormLabel>
        <p>{`${insuranceStatement}`}</p>
        <p disabled={true} value={insuranceStatement}></p>
      </FormControl>

      <Button onClick={handlePreviewClick}>Preview</Button>
      {previewed && <Button onClick={handleApproveClick}>Approve</Button>}
      {approved && <Button onClick={handleBuyClick}>Buy</Button>}
    </Flex>
  );
};

export default BuyInsuranceButton;
