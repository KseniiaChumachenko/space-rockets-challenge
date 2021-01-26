import React from "react";
import { Flex, Spinner, Heading } from "@chakra-ui/react";
import { Link as BrowserLink } from "react-router-dom";
import { motion } from "framer-motion";

import { useSpaceX } from "../utils/use-space-x";
import { ENTITY_NAME_LAUNCHES } from "../constants";
import Error from "./error";

export default function Home() {
  const { data, error } = useSpaceX(`/${ENTITY_NAME_LAUNCHES}/latest`);

  if (error) {
    return <Error />;
  }

  if (!data) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  const {
    links: { mission_patch },
    mission_name,
    flight_number,
  } = data;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  return (
    <Flex
      as={motion.div}
      variants={container}
      initial="hidden"
      animate="show"
      bg={mission_patch ? `url(${mission_patch})` : "white"}
      width={"100%"}
      height={"100%"}
      flexDirection={"column"}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"contain"}
      backgroundPosition={"center"}
      alignItems={"center"}
      justifyContent={"flex-end"}
      p={8}
    >
      <Heading
        color="white"
        display="inline"
        backgroundColor="gray.300"
        fontSize={["lg", "5xl"]}
        borderRadius="lg"
        p={2}
        alignSelf={"flex-end"}
      >
        {mission_name}
      </Heading>
      <Heading
        as={BrowserLink}
        to={`${ENTITY_NAME_LAUNCHES}/${flight_number}`}
        color="white"
        display="inline"
        backgroundColor="gray.300"
        fontSize={"lg"}
        borderRadius="lg"
        alignSelf={"flex-end"}
        p={2}
        mr={5}
        mt={3}
      >
        Find out more about the latest launch →
      </Heading>
    </Flex>
  );
}
