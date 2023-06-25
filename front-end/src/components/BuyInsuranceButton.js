import { useState } from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import { useAccount } from "wagmi";
import { parseUnits } from "viem";
import { insuranceAbi, defaultCurrencyAbi } from "../blockchain/abi";

import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  //useNetwork,
} from "wagmi";

const BuyInsuranceButton = () => {
  const { isConnected } = useAccount();
  //const { chain } = useNetwork();

  let insuranceContractAddress = "0x8276496D593992Aba90e888604c2C2C138fE9Bfe";
  let defaultCurrencyContractAddress =
    "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";

  const { config } = usePrepareContractWrite({
    address: defaultCurrencyContractAddress,
    abi: defaultCurrencyAbi,
    functionName: "approve",
    args: [insuranceContractAddress, parseUnits("100", 6)],
  });

  const contractWrite = useContractWrite(config);

  const waitForTransaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
  });

  const handleSendTransaction = async (w) => {
    try {
      await w.writeAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const [payoutAddress, setPayoutAddress] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [insuranceStatement, setInsuranceStatement] = useState("");

  const [previewed, setPreviewed] = useState(false);
  const [approved, setApproved] = useState(false);

  const contractWriteInsurace = useContractWrite({
    address: insuranceContractAddress,
    abi: insuranceAbi,
    functionName: "issueInsurance",
    args: [parseUnits("100", 6), payoutAddress, insuranceStatement],
  });

  const generateInsuranceStatement = () => {
    let s = `${flightNumber} departed on ${departureDate} arrived with a delay more than 3 hours`;
    setInsuranceStatement(s);
  };

  const handlePayoutAddressChange = (event) => {
    setPayoutAddress(event.target.value);
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
    handleSendTransaction(contractWrite);
  };

  const handleBuyClick = (event) => {
    handleSendTransaction(contractWriteInsurace);
  };

  return (
    <Flex flexDirection="column" gap="10">
      <Heading size="xl"> Buy flight delay insurance </Heading>

      {!isConnected && (
        <Heading size="md"> Connect to your wallet first</Heading>
      )}

      {isConnected && (
        <>
          <FormControl isRequired>
            <FormLabel>Payout address</FormLabel>
            <Input
              placeholder="Payout address"
              defaultValue={payoutAddress}
              onChange={handlePayoutAddressChange}
            />
          </FormControl>

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
          </FormControl>

          <FormControl>
            <FormLabel>Beneficiary address</FormLabel>
            <p>{`${payoutAddress}`}</p>
          </FormControl>

          <Button onClick={handlePreviewClick}>Preview</Button>
          {previewed && <Button onClick={handleApproveClick}>Approve</Button>}
          {approved && (
            <Button
              isDisabled={waitForTransaction.isLoading}
              onClick={handleBuyClick}
            >
              Buy
            </Button>
          )}
        </>
      )}
    </Flex>
  );
};

export default BuyInsuranceButton;
