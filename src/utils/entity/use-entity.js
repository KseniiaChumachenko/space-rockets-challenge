import { useMemo } from "react";
import { ENTITIES } from "../../constants";

export function useEntity(entityName) {
  const props = useMemo(() => ENTITIES[entityName], [entityName]);
  return props;
}
