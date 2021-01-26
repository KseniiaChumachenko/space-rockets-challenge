import React, { useState } from "react";
import { Badge, Box, Flex, Image, Text, CloseButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Star } from "react-feather";
import { motion } from "framer-motion";

import { useIsFavourite } from "../utils/use-is-favourite";

export function ItemCard({
  entityName,
  id,
  media: { src = "", alt = "" },
  absoluteMedia,
  badge: { name, color },
  info,
  withFavourite = true,
  title,
  description: { primary, secondary },
  onClose,
}) {
  const [showRemove, setShowRemove] = useState(false);

  const {
    isFavourite,
    handleAddToFavourite,
    handleRemoveFromFavourites,
  } = useIsFavourite(entityName, id);

  const handleMouse = (value) => () => !withFavourite && setShowRemove(value);

  return (
    <>
      {!withFavourite && (
        <CloseButton
          onClick={handleRemoveFromFavourites}
          position={"relative"}
          colorScheme={"white"}
          color={"red.500"}
          bg={"red.100"}
          opacity={"80%"}
          borderRadius={"50%"}
          left={"380px"}
          mb={"-35px"}
          zIndex={1}
          visibility={showRemove ? "visible" : "hidden"}
          _hover={{ opacity: "100%" }}
          onMouseOver={handleMouse(true)}
          onMouseLeave={handleMouse(false)}
        />
      )}
      <Box
        as={Link}
        to={`/${entityName}/${id}`}
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
        position="relative"
        onMouseOver={handleMouse(true)}
        onMouseLeave={handleMouse(false)}
        onClick={onClose}
      >
        <motion.div
          animate={{ rotate: 0 }}
          initial={{ rotate: 90 }}
          transition={{ type: "spring", restDelta: 0.5 }}
        >
          {src && (
            <Image
              src={src}
              alt={`${alt} launch`}
              height={["200px", null, "300px"]}
              width="100%"
              objectFit="cover"
              objectPosition="bottom"
            />
          )}

          {absoluteMedia && (
            <Box height={0}>
              <Image
                position="relative"
                top={-280}
                right={!withFavourite ? -300 : -355}
                src={absoluteMedia}
                height="75px"
                objectFit="contain"
                objectPosition="bottom"
              />
            </Box>
          )}
          <Box p="6">
            <Box d="flex" alignItems="center" justifyContent="space-between">
              <Box d="flex" alignItems="baseline">
                <Badge px="2" variant="solid" colorScheme={color}>
                  {name}
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                >
                  {info}
                </Box>
              </Box>
              {withFavourite && (
                <Box
                  as={Star}
                  width="1.5em"
                  onClick={handleAddToFavourite}
                  color={isFavourite && "orange.300"}
                />
              )}
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {title}
            </Box>
            <Flex>
              {primary && (
                <Text fontSize="sm" mr="2">
                  {primary}
                </Text>
              )}
              <Text color="gray.500" fontSize="sm">
                {secondary}
              </Text>
            </Flex>
          </Box>
        </motion.div>
      </Box>
    </>
  );
}
