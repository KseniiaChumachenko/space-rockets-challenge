import {
  Clock,
  Activity,
  ArrowUp,
  ArrowDown,
  Award,
  Anchor,
  Package,
  Circle,
  Zap,
  Gitlab,
  DivideCircle,
} from "react-feather";
import {
  mapLaunchToCardProps,
  mapLaunchPadToCardProps,
  mapLandPadsToCardProps,
  mapRocketsToCardProps,
  mapDragonsToCardProps,
  mapShipsToCardProps,
  mapCapsulesToCardProps,
  mapCoresToCardProps,
  mapMissionsToCardProps,
  mapPayloadsToCardProps,
  mapHistoryToCardProps,
} from "./utils/entity/map-entity-to-card-props";
import { Launches, LaunchPads } from "./widgets";

export const PAGE_SIZE = 12;

export const ENTITY_NAME_LAUNCHES = "launches";
export const ENTITY_NAME_LAUNCH_PADS = "launchpads";
export const ENTITY_NAME_LAND_PADS = "landpads";
export const ENTITY_NAME_ROCKETS = "rockets";
export const ENTITY_NAME_DRAGONS = "dragons";
export const ENTITY_NAME_SHIPS = "ships";
export const ENTITY_NAME_CAPSULES = "capsules";
export const ENTITY_NAME_CORES = "cores";
export const ENTITY_NAME_MISSIONS = "missions";
export const ENTITY_NAME_PAYLOADS = "payloads";
export const ENTITY_NAME_HISTORY = "history";

const commonParams = {
  options: {
    limit: PAGE_SIZE,
  },
};

export const ENTITIES = {
  [ENTITY_NAME_LAUNCHES]: {
    label: "Launches",
    icon: Activity,
    mapPropsToCard: mapLaunchToCardProps,
    requestParams: {
      path: `/${ENTITY_NAME_LAUNCHES}/past`,
      options: {
        limit: PAGE_SIZE,
        order: "desc",
        sort: "launch_date_utc",
      },
    },
    Widgets: Launches,
  },
  [ENTITY_NAME_LAUNCH_PADS]: {
    label: "Launch Pads",
    icon: ArrowUp,
    mapPropsToCard: mapLaunchPadToCardProps,
    requestParams: {
      path: `/${ENTITY_NAME_LAUNCH_PADS}`,
      ...commonParams,
    },
    Widgets: LaunchPads,
  },
  [ENTITY_NAME_LAND_PADS]: {
    label: "Landing Pads",
    icon: ArrowDown,
    mapPropsToCard: mapLandPadsToCardProps,
    requestParams: {
      path: `/${ENTITY_NAME_LAND_PADS}`,
      ...commonParams,
    },
  },
  [ENTITY_NAME_ROCKETS]: {
    label: "Rockets",
    icon: Zap,
    mapPropsToCard: mapRocketsToCardProps,
    requestParams: {
      path: `/${ENTITY_NAME_ROCKETS}`,
      ...commonParams,
    },
  },
  [ENTITY_NAME_DRAGONS]: {
    label: "Dragons",
    icon: Gitlab,
    mapPropsToCard: mapDragonsToCardProps,
    requestParams: {
      path: `/${ENTITY_NAME_DRAGONS}`,
      ...commonParams,
    },
  },
  [ENTITY_NAME_SHIPS]: {
    label: "Ships",
    icon: Anchor,
    mapPropsToCard: mapShipsToCardProps,
    requestParams: {
      path: `/${ENTITY_NAME_SHIPS}`,
      ...commonParams,
    },
  },
  [ENTITY_NAME_CAPSULES]: {
    label: "Capsules",
    mapPropsToCard: mapCapsulesToCardProps,
    icon: DivideCircle,
    requestParams: {
      path: `/${ENTITY_NAME_CAPSULES}`,
      ...commonParams,
    },
  },
  [ENTITY_NAME_CORES]: {
    label: "Cores",
    mapPropsToCard: mapCoresToCardProps,
    icon: Circle,
    requestParams: {
      path: `/${ENTITY_NAME_CORES}`,
      ...commonParams,
    },
  },
  [ENTITY_NAME_MISSIONS]: {
    label: "Missions",
    mapPropsToCard: mapMissionsToCardProps,
    icon: Award,
    requestParams: {
      path: `/${ENTITY_NAME_MISSIONS}`,
      ...commonParams,
    },
  },
  [ENTITY_NAME_PAYLOADS]: {
    label: "Payloads",
    mapPropsToCard: mapPayloadsToCardProps,
    icon: Package,
    requestParams: {
      path: `/${ENTITY_NAME_PAYLOADS}`,
      ...commonParams,
    },
  },
  [ENTITY_NAME_HISTORY]: {
    label: "History",
    mapPropsToCard: mapHistoryToCardProps,
    icon: Clock,
    requestParams: {
      path: `/${ENTITY_NAME_HISTORY}`,
      ...commonParams,
    },
  },
};
