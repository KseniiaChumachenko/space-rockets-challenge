import { useDispatch, useSelector } from "react-redux";
import {
  FAVOURITES_ACTION_TYPE_ADDED,
  FAVOURITES_ACTION_TYPE_DELETED,
} from "../features/favourites/reducer";

export function useIsFavourite(entityName, id) {
  const dispatch = useDispatch();
  const { favourites } = useSelector((state) => state);

  const isFavourite = favourites[entityName]?.includes(id);

  const handleFavouritesAction = (type) => (e) => {
    e.preventDefault();
    dispatch({
      type,
      payload: { entityName, id },
    });
  };

  const handleAddToFavourite = handleFavouritesAction(
    isFavourite ? FAVOURITES_ACTION_TYPE_DELETED : FAVOURITES_ACTION_TYPE_ADDED
  );
  const handleRemoveFromFavourites = handleFavouritesAction(
    FAVOURITES_ACTION_TYPE_DELETED
  );

  return { isFavourite, handleAddToFavourite, handleRemoveFromFavourites };
}
