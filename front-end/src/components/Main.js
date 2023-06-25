import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import BuyInsuranceButton from "./BuyInsuranceButton";
import MyPolicy from "./MyPolicy";
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
      path: "view",
      element: <MyPolicy />,
    },
  ]);

  return (
    <Flex justify="center" alignItems="center" h="100vh">
      <RouterProvider router={router} />
    </Flex>
  );
};

export default Main;
