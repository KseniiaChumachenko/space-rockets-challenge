import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { List, ListIcon, ListItem, Box } from "@chakra-ui/react";
import { ENTITIES } from "../constants";

export function Navigation({ customRoutes }) {
  const navigate = useNavigate();
  const handleEntityClick = (name) => () => navigate(name);
  const entityKeys = Object.keys(ENTITIES);

  return (
    <List width={"100%"}>
      {customRoutes.map((item, i) => (
        <NavigationItem key={i} {...item} />
      ))}
      <Box
        w={"100%"}
        borderBottom={"1px"}
        borderStyle={"solid"}
        borderColor={"gray.700"}
        m={[2, null]}
      />
      {entityKeys.map((entityName, i) => {
        const { label, icon } = ENTITIES[entityName];
        return (
          <NavigationItem
            key={i}
            name={entityName}
            label={label}
            onClick={handleEntityClick(entityName)}
            icon={icon}
          />
        );
      })}
    </List>
  );
}

function NavigationItem({ onClick, name, label, icon, ...p }) {
  let { pathname } = useLocation();
  const entityName = pathname.split("/")[1];
  const isActive = name === entityName;

  const activeGradient = "linear-gradient(to right, #333399, #ff00cc)";

  return (
    <ListItem
      onClick={onClick}
      width={"100%"}
      _hover={{
        background: isActive ? activeGradient : "gray.700",
        cursor: "pointer",
      }}
      fontWeight={isActive && "bold"}
      bg={isActive ? activeGradient : "gray.800"}
      textTransform={"capitalize"}
      borderRadius={6}
      pt={2}
      pb={2}
      pl={4}
      mt={1}
      mb={1}
      {...p}
    >
      {icon && <ListIcon as={icon} />}
      {label}
    </ListItem>
  );
}
