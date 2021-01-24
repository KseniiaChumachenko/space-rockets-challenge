import React from "react";
import { SimpleGrid } from "@chakra-ui/react";

import { entityPropsFactory } from "../utils/entity/entity-props-factory";
import { useSpaceXPaginated } from "../utils/use-space-x";
import { ENTITY_NAME_LAUNCHES } from "../constants";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import { ItemCard } from "./item-card";

const PAGE_SIZE = 12;

export default function Launches() {
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    }
  );
  console.log(data, error);
  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
      />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch) => (
              <ItemCard
                key={launch.flight_number}
                {...entityPropsFactory[ENTITY_NAME_LAUNCHES](launch)}
              />
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}
