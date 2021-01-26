import React from "react";
import { useParams } from "react-router-dom";
import { SimpleGrid, Box } from "@chakra-ui/react";

import { useSpaceXPaginated } from "../../utils/use-space-x";
import { useEntity } from "../../utils/entity/use-entity";
import Error from "../../components/error";
import { ItemCard } from "../../components/item-card";
import { PAGE_SIZE } from "../../constants";
import LoadMoreButton from "../../components/load-more-button";

export default function Listing() {
  let { entityName } = useParams();
  const {
    requestParams: { path, options },
    mapPropsToCard,
  } = useEntity(entityName);

  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    path,
    options
  );

  return (
    <Box pb={2} width={"100%"}>
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((item, i) => <ItemCard key={i} {...mapPropsToCard(item)} />)}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </Box>
  );
}
