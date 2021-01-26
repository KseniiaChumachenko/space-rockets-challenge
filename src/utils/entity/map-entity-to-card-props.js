import {
  ENTITY_NAME_CAPSULES,
  ENTITY_NAME_CORES,
  ENTITY_NAME_DRAGONS,
  ENTITY_NAME_HISTORY,
  ENTITY_NAME_LAND_PADS,
  ENTITY_NAME_LAUNCH_PADS,
  ENTITY_NAME_LAUNCHES,
  ENTITY_NAME_MISSIONS,
  ENTITY_NAME_PAYLOADS,
  ENTITY_NAME_ROCKETS,
  ENTITY_NAME_SHIPS,
} from "../../constants";
import { formatDate } from "../format-date";
import { format as timeAgo } from "timeago.js";

export function mapLaunchPadToCardProps(launchPad) {
  return {
    entityName: ENTITY_NAME_LAUNCH_PADS,
    id: launchPad.site_id,
    media: {},
    badge:
      launchPad.status === "active"
        ? { name: "Active", color: "green" }
        : { name: "Retired", color: "red" },
    info: `${launchPad.attempted_launches} attempted • ${launchPad.successful_launches} succeeded`,
    title: launchPad.name,
    description: { secondary: launchPad.vehicles_launched.join(", ") },
  };
}

export function mapLaunchToCardProps(launch) {
  return {
    entityName: ENTITY_NAME_LAUNCHES,
    id: launch.flight_number.toString(),
    media: {
      src:
        launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
        launch.links.mission_patch_small,
      alt: launch.mission_name,
    },
    absoluteMedia: launch.links.mission_patch_small,
    badge: launch.launch_success
      ? { name: "Successful", color: "green" }
      : { name: "Failed", color: "red" },
    info: `${launch.rocket.rocket_name} • ${launch.launch_site.site_name}`,
    title: launch.mission_name,
    description: {
      primary: formatDate(launch.launch_date_utc),
      secondary: timeAgo(launch.launch_date_utc),
    },
  };
}

export function mapLandPadsToCardProps({
  id,
  status,
  attempted_landings,
  successful_landings,
  full_name,
  location: { name, region },
}) {
  return {
    entityName: ENTITY_NAME_LAND_PADS,
    id,
    media: {},
    badge:
      status === "active"
        ? { name: "Active", color: "green" }
        : { name: "Inactive", color: "red" },
    info: `${attempted_landings} attempted • ${successful_landings} succeeded`,
    title: full_name,
    description: {
      primary: name,
      secondary: region,
    },
  };
}

export function mapRocketsToCardProps({
  rocket_id,
  active,
  stages,
  boosters,
  rocket_name,
  first_flight,
  country,
}) {
  return {
    entityName: ENTITY_NAME_ROCKETS,
    id: rocket_id,
    media: {},
    badge: active
      ? { name: "Active", color: "green" }
      : { name: "Inactive", color: "red" },
    info: `${stages} stages • ${boosters} boosters`,
    title: rocket_name,
    description: {
      primary: formatDate(first_flight),
      secondary: country,
    },
  };
}

export function mapDragonsToCardProps({
  id,
  name,
  type,
  active,
  first_flight,
  crew_capacity,
  orbit_duration_yr,
}) {
  return {
    entityName: ENTITY_NAME_DRAGONS,
    id,
    media: {},
    badge: active
      ? { name: "Active", color: "green" }
      : { name: "Inactive", color: "red" },
    info: `${type} • ${crew_capacity} crews `,
    title: name,
    description: {
      primary: formatDate(first_flight),
      secondary: `(Orbital period is ${orbit_duration_yr} years)`,
    },
  };
}

export function mapShipsToCardProps({
  ship_id,
  ship_name,
  ship_type,
  active,
  roles,
  home_port,
  year_built,
}) {
  return {
    entityName: ENTITY_NAME_SHIPS,
    id: ship_id,
    media: {},
    badge: active
      ? { name: "Active", color: "green" }
      : { name: "Inactive", color: "red" },
    info: `${roles.join(" • ")} • ${ship_type} `,
    title: ship_name,
    description: {
      primary: home_port,
      secondary: year_built,
    },
  };
}

export function mapCapsulesToCardProps({
  capsule_serial,
  status,
  original_launch,
  missions,
  landings,
  type,
  reuse_count,
}) {
  return {
    entityName: ENTITY_NAME_CAPSULES,
    id: capsule_serial,
    media: {},
    badge:
      status === "active"
        ? { name: "Active", color: "green" }
        : { name: "Inactive", color: "red" },
    info: `${landings} landings • ${missions.length} missions`,
    title: type,
    description: {
      primary: formatDate(original_launch),
      secondary: `${reuse_count} times reused`,
    },
  };
}

export function mapCoresToCardProps({
  core_serial,
  status,
  original_launch,
  missions,
  reuse_count,
}) {
  return {
    entityName: ENTITY_NAME_CORES,
    id: core_serial,
    media: {},
    badge: { name: status, color: "gray" },
    info: `${missions.length} mission`,
    title: core_serial,
    description: {
      primary: formatDate(original_launch),
      secondary: `${reuse_count} times reused`,
    },
  };
}

export function mapMissionsToCardProps({
  mission_name,
  mission_id,
  manufacturers,
  payload_ids,
}) {
  return {
    entityName: ENTITY_NAME_MISSIONS,
    id: mission_id,
    media: {},
    badge: { name: manufacturers.join(" • "), color: "gray" },
    info: "",
    title: mission_name,
    description: {
      primary: `Payloads: `,
      secondary: payload_ids.join(", "),
    },
  };
}

export function mapPayloadsToCardProps({
  payload_id,
  reused,
  customers,
  nationality,
  payload_type,
  orbit,
}) {
  return {
    entityName: ENTITY_NAME_PAYLOADS,
    id: payload_id,
    media: {},
    badge: reused
      ? { name: "Reused", color: "green" }
      : { name: "Not reused", color: "red" },
    info: `${payload_type} • ${orbit}`,
    title: payload_id,
    description: {
      primary: customers.join(","),
      secondary: nationality,
    },
  };
}

export function mapHistoryToCardProps({
  id,
  title,
  event_date_utc,
  flight_number,
  details,
}) {
  return {
    entityName: ENTITY_NAME_HISTORY,
    id,
    media: {},
    badge: { name: formatDate(event_date_utc) },
    info: flight_number ? `Flight number: ${flight_number}` : "",
    title,
    description: {
      secondary: details,
    },
  };
}
