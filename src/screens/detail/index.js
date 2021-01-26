import React, { useMemo } from "react";
import { Star } from "react-feather";
import { useParams } from "react-router-dom";
import {
  Flex,
  Spinner,
  Box,
  Image,
  Heading,
  Stack,
  Badge,
} from "@chakra-ui/react";

import { useIsFavourite } from "../../utils/use-is-favourite";
import { useEntity } from "../../utils/entity/use-entity";
import { useSpaceX } from "../../utils/use-space-x";
import Error from "../../components/error";
import { WidgetEmptyState } from "../../components/widget-empty-state";

export default function Detail() {
  let { entityName, id } = useParams();
  const { data, error } = useSpaceX(`/${entityName}/${id}`);

  const { mapPropsToCard, Widgets } = useEntity(entityName);

  if (error) return <Error />;

  if (!data) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }
  return (
    <Box>
      <Header {...mapPropsToCard(data)} />
      {Widgets ? <Widgets {...data} /> : <WidgetEmptyState />}
    </Box>
  );
}

const randomColorGenerator = (start = 200, end = 250) =>
  `hsl(${start + end * Math.random()}, 80%, 90%)`;

function Header({
  entityName,
  id,
  media: { src = "", alt = "" },
  absoluteMedia,
  badge: { name, color },
  title,
}) {
  const {
    isFavourite,
    handleAddToFavourite,
    handleRemoveFromFavourites,
  } = useIsFavourite(entityName, id);

  const [color1, color2] = useMemo(() => {
    return [randomColorGenerator(), randomColorGenerator()];
  }, []);

  return (
    <Flex
      background={src ? `url(${src})` : `linear-gradient(${color1}, ${color2})`}
      bgPos="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      minHeight="30vh"
      position="relative"
      p={[2, 6]}
      justifyContent="space-between"
    >
      {absoluteMedia && (
        <Image
          position="absolute"
          top="5"
          right="5"
          src={absoluteMedia}
          height={["85px", "150px"]}
          objectFit="contain"
          objectPosition="bottom"
        />
      )}
      <Heading
        color="white"
        display="inline"
        backgroundColor="#718096b8"
        fontSize={["lg", "5xl"]}
        px="4"
        py="2"
        borderRadius="lg"
        alignSelf={"flex-end"}
      >
        {title}
      </Heading>
      <Flex flexDirection={"column"} justifyContent={"space-between"}>
        <Box
          alignSelf={"flex-end"}
          as={Star}
          width="2em"
          height="2em"
          onClick={
            isFavourite ? handleRemoveFromFavourites : handleAddToFavourite
          }
          color={isFavourite && "orange.300"}
          bg={"gray.200"}
          borderRadius={"2px"}
          p={1}
          zIndex={1}
        />
        <Stack isInline spacing="3">
          <Badge colorScheme="purple" fontSize={["xs", "md"]}>
            #{id}
          </Badge>
          {id !== name && (
            <Badge colorScheme={color} fontSize={["xs", "md"]}>
              {name}
            </Badge>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
}
