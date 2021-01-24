import React from "react";
import { useSelector } from "react-redux";
import { SimpleGrid, Text, Spinner, Flex, Box } from "@chakra-ui/react";

import { entityPropsFactory } from "../../utils/entity/entity-props-factory";
import { useSpaceX } from "../../utils/use-space-x";
import { FavouritesEmptyState } from "../../components/favourites-empty-state";
import { Drawer } from "../../components/drawer";
import { ItemCard } from "../../components/item-card";
import Error from "../../components/error";

export function Favourites(p) {
  const { favourites } = useSelector((state) => state);
  const favouriteEntities = Object.keys(favourites);

  return (
    <Drawer title={"Favourites"} size={"sm"} {...p}>
      {favouriteEntities.length > 0 ? (
        favouriteEntities.map((entityName, i) => (
          <Box key={i} _notFirst={{ mt: 8 }}>
            <Text fontSize={"xl"} textTransform={"capitalize"} mb={2}>
              {entityName} ({favourites[entityName].length})
            </Text>
            <SimpleGrid minChildWidth="350px" spacing="4">
              {favourites[entityName].map((id) => (
                <Favourite key={id} entityName={entityName} id={id} {...p} />
              ))}
            </SimpleGrid>
          </Box>
        ))
      ) : (
        <FavouritesEmptyState />
      )}
    </Drawer>
  );
}

function Favourite({ entityName, id, ...p }) {
  const { data, error } = useSpaceX(`/${entityName}/${id}`);

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

  const cardProps = entityPropsFactory[entityName](data);

  return <ItemCard {...cardProps} {...p} withFavourite={false} />;
}
