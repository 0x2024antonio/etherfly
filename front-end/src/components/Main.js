import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import BuyInsuranceButton from "./BuyInsuranceButton";
import FileCliamButton from "./FileClaimButton";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Main = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BuyInsuranceButton />,
    },
    {
      path: "buy",
      element: <BuyInsuranceButton />,
    },
    {
      path: "file",
      element: <FileCliamButton />,
    },
  ]);

  return (
    <Flex justify="center" alignItems="center" h="100vh">
      <RouterProvider router={router} />
    </Flex>
  );
};

export default Main;
