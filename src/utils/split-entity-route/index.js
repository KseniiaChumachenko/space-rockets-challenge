export function splitEntityRoute(route) {
  const splitted = route.split("/");
  return { entityName: splitted[1], id: splitted[3] };
}
