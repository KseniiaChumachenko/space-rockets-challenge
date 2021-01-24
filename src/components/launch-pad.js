import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { MapPin, Navigation, Star } from "react-feather";
import {
  Flex,
  Heading,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Text,
  Spinner,
  Stack,
  AspectRatio,
} from "@chakra-ui/react";

import { useIsFavourite } from "../utils/use-is-favourite";
import {
  FAVOURITES_ACTION_TYPE_ADDED,
  FAVOURITES_ACTION_TYPE_DELETED,
} from "../features/favourites/reducer";
import { entityPropsFactory } from "../utils/entity/entity-props-factory";
import { useSpaceX } from "../utils/use-space-x";
import { ENTITY_NAME_LAUNCH_PADS, ENTITY_NAME_LAUNCHES } from "../constants";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import { ItemCard } from "./item-card";

export default function LaunchPad() {
  let { launchPadId } = useParams();
  const { data: launchPad, error } = useSpaceX(`/launchpads/${launchPadId}`);

  const { data: launches } = useSpaceX(launchPad ? "/launches/past" : null, {
    limit: 3,
    order: "desc",
    sort: "launch_date_utc",
    site_id: launchPad?.site_id,
  });

  if (error) return <Error />;
  if (!launchPad) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Launch Pads", to: ".." },
          { label: launchPad.name },
        ]}
      />
      <Header launchPad={launchPad} />
      <Box m={[3, 6]}>
        <LocationAndVehicles launchPad={launchPad} />
        <Text color="gray.700" fontSize={["md", null, "lg"]} my="8">
          {launchPad.details}
        </Text>
        <Map location={launchPad.location} />
        <RecentLaunches launches={launches} />
      </Box>
    </div>
  );
}

const randomColorGenerator = (start = 200, end = 250) =>
  `hsl(${start + end * Math.random()}, 80%, 90%)`;

function Header({ launchPad }) {
  const dispatch = useDispatch();
  const isFavourite = useIsFavourite(
    ENTITY_NAME_LAUNCH_PADS,
    launchPad.site_id
  );

  const [color1, color2] = useMemo(() => {
    return [randomColorGenerator(), randomColorGenerator()];
  }, []);

  const handleFavouritesAction = (type) => (e) => {
    e.preventDefault();
    dispatch({
      type,
      payload: { entityName: ENTITY_NAME_LAUNCH_PADS, id: launchPad.site_id },
    });
  };

  const handleAddToFavourite = handleFavouritesAction(
    isFavourite ? FAVOURITES_ACTION_TYPE_DELETED : FAVOURITES_ACTION_TYPE_ADDED
  );

  return (
    <Flex
      background={`linear-gradient(${color1}, ${color2})`}
      bgPos="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      minHeight="15vh"
      position="relative"
      flexDirection={["column", "row"]}
      p={[2, 6]}
      justifyContent="space-between"
    >
      <Heading
        color="gray.900"
        display="inline"
        mx={[2, 4]}
        my="2"
        fontSize={["md", "3xl"]}
        borderRadius="lg"
      >
        {launchPad.site_name_long}
      </Heading>
      <Flex direction={"column"} justifyContent="space-between">
        <Box
          alignSelf={"flex-end"}
          as={Star}
          width="2em"
          height="2em"
          onClick={handleAddToFavourite}
          color={isFavourite && "orange.300"}
          bg={"gray.200"}
          borderRadius={"2px"}
          p={1}
        />
        <Stack isInline spacing="3">
          <Badge colorScheme="purple" fontSize={["sm", "md"]}>
            {launchPad.successful_launches}/{launchPad.attempted_launches}{" "}
            successful
          </Badge>
          {launchPad.stats === "active" ? (
            <Badge colorScheme="green" fontSize={["sm", "md"]}>
              Active
            </Badge>
          ) : (
            <Badge colorScheme="red" fontSize={["sm", "md"]}>
              Retired
            </Badge>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
}

function LocationAndVehicles({ launchPad }) {
  return (
    <SimpleGrid columns={[1, 1, 2]} borderWidth="1px" p="4" borderRadius="md">
      <Stat>
        <StatLabel display="flex">
          <Box as={MapPin} width="1em" />{" "}
          <Box ml="2" as="span">
            Location
          </Box>
        </StatLabel>
        <StatNumber fontSize="xl">{launchPad.location.name}</StatNumber>
        <StatHelpText>{launchPad.location.region}</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel display="flex">
          <Box as={Navigation} width="1em" />{" "}
          <Box ml="2" as="span">
            Vehicles
          </Box>
        </StatLabel>
        <StatNumber fontSize="xl">
          {launchPad.vehicles_launched.join(", ")}
        </StatNumber>
      </Stat>
    </SimpleGrid>
  );
}

function Map({ location }) {
  return (
    <AspectRatio ratio={16 / 5}>
      <Box
        as="iframe"
        src={`https://maps.google.com/maps?q=${location.latitude}, ${location.longitude}&z=15&output=embed`}
        alt="demo"
      />
    </AspectRatio>
  );
}

function RecentLaunches({ launches }) {
  if (!launches?.length) {
    return null;
  }
  return (
    <Stack my="8" spacing="3">
      <Text fontSize="xl" fontWeight="bold">
        Last launches
      </Text>
      <SimpleGrid minChildWidth="350px" spacing="4">
        {launches.map((launch) => (
          <ItemCard
            key={launch.flight_number}
            entityName={ENTITY_NAME_LAUNCHES}
            {...entityPropsFactory[ENTITY_NAME_LAUNCHES](launch)}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
