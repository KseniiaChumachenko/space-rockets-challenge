import { ENTITY_NAME_LAUNCHES, ENTITY_NAME_LAUNCH_PADS } from "../../constants";
import {
  mapLaunchPadToCardProps,
  mapLaunchToCardProps,
} from "./map-entity-to-card-props";

export const entityPropsFactory = {
  [ENTITY_NAME_LAUNCHES]: mapLaunchToCardProps,
  [ENTITY_NAME_LAUNCH_PADS]: mapLaunchPadToCardProps,
};
