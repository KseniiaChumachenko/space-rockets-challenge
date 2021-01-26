import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { splitEntityRoute } from "../utils/split-entity-route";
import { ENTITIES } from "../constants";
import Breadcrumbs from "./breadcrumbs";

export function Header() {
  const { pathname } = useLocation();
  const { entityName, id } = splitEntityRoute(pathname);
  const { label } = ENTITIES[entityName];

  const home = { label: "Home", to: "/" };
  const entity = label && { label: label, to: entityName };
  const item = id && { label: id };

  const items = [home, entity, item].filter((i) => i);
  return (
    <Box width={"100%"}>
      <Breadcrumbs items={items} textTransform={"capitalize"} />
      <Outlet />
    </Box>
  );
}
