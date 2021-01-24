import { useSelector } from "react-redux";

export function useIsFavourite(entityName, id) {
  const { favourites } = useSelector((state) => state);

  return favourites[entityName]?.includes(id);
}
