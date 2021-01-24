import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { Star } from "react-feather";

import { Favourites } from "../features/favourites";
import Launches from "./launches";
import Launch from "./launch";
import Home from "./home";
import LaunchPads from "./launch-pads";
import LaunchPad from "./launch-pad";

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches />} />
        <Route path="/launches/:launchId" element={<Launch />} />
        <Route path="/launchpads" element={<LaunchPads />} />
        <Route path="/launchpads/:launchPadId" element={<LaunchPad />} />
      </Routes>
    </div>
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
      justify="space-between"
      wrap="wrap"
      padding="4"
      bg="gray.800"
      color="white"
    >
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="lg"
      >
        ¡SPACE·R0CKETS!
      </Text>

      <Button
        variant={"ghost"}
        onClick={handleOpenFavourites}
        _hover={{ bg: "transparent" }}
      >
        <Box as={Star} size={"1em"} marginRight={1} />
        Favourites
      </Button>
      <Favourites {...disclosure} />
    </Flex>
  );
}
