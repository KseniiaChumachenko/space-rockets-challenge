import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Flex, Text, useDisclosure, List } from "@chakra-ui/react";
import { Star } from "react-feather";

import { Favourites } from "../features/favourites";
import Listing from "../screens/listing";
import Detail from "../screens/detail";
import Home from "./home";
import Error from "./error";
import { Navigation } from "./navigation";
import { Header } from "./header";

export default function App() {
  return (
    <Flex height={"100vh"}>
      <NavBar />
      <Flex overflow={"auto"} width={"100%"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Header />}>
            <Route path=":entityName" element={<Listing />} />
            <Route path=":entityName/:id" element={<Detail />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Flex>
    </Flex>
  );
}

function NavBar() {
  const disclosure = useDisclosure();

  const handleOpenFavourites = () => {
    const { isOpen, onClose, onOpen } = disclosure;
    return isOpen ? onClose() : onOpen();
  };

  return (
    <Flex
      as="nav"
      align="center"
      flexDirection={"column"}
      wrap="wrap"
      padding="4"
      bg="gray.800"
      color="white"
    >
      <Text
        as={Link}
        to={"/"}
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="xl"
        margin={4}
        _hover={{ cursor: "pointer" }}
      >
        ¡SPACE·R0CKETS!
      </Text>
      <List width={"100%"} mt={4}>
        <Navigation
          customRoutes={[
            {
              label: "Favourites",
              icon: Star,
              onClick: handleOpenFavourites,
            },
          ]}
        />
      </List>

      <Favourites {...disclosure} />
    </Flex>
  );
}
