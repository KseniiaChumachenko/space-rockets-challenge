import React from "react";
import { Star } from "react-feather";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Flex,
} from "@chakra-ui/react";

export function FavouritesEmptyState() {
  return (
    <Flex alignItems="center" justifyContent="center" width="100%">
      <Alert
        status="info"
        variant="subtle"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        p="8"
      >
        <Box as={Star} size={"6em"} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          No favourites yet!
        </AlertTitle>
        <AlertDescription maxWidth="md">
          Star your favourite items to have quick access.
        </AlertDescription>
      </Alert>
    </Flex>
  );
}
