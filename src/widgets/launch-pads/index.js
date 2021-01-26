import React from "react";
import { MapPin, Navigation } from "react-feather";
import {
  AspectRatio,
  Box,
  SimpleGrid,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";

import { ENTITY_NAME_LAUNCHES } from "../../constants";
import { ItemCard } from "../../components/item-card";
import { useSpaceX } from "../../utils/use-space-x";
import { useEntity } from "../../utils/entity/use-entity";

export function LaunchPads(launchPad) {
  const { data: launches } = useSpaceX(launchPad ? "/launches/past" : null, {
    limit: 3,
    order: "desc",
    sort: "launch_date_utc",
    site_id: launchPad?.site_id,
  });

  return (
    <Box m={[3, 6]}>
      <LocationAndVehicles launchPad={launchPad} />
      <Text color="gray.700" fontSize={["md", null, "lg"]} my="8">
        {launchPad.details}
      </Text>
      <Map location={launchPad.location} />
      <RecentLaunches launches={launches} />
    </Box>
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
  const { mapPropsToCard } = useEntity(ENTITY_NAME_LAUNCHES);

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
            {...mapPropsToCard(launch)}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
