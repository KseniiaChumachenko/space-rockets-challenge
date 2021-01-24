import { ENTITY_NAME_LAUNCH_PADS, ENTITY_NAME_LAUNCHES } from "../../constants";
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
