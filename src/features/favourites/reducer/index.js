const LOCAL_STORAGE_VAR_NAME = "space_r0ckets_favourites";

export const FAVOURITES_ACTION_TYPE_ADDED = "favourites/favouritesAdded";
export const FAVOURITES_ACTION_TYPE_DELETED = "favourites/favouritesDeleted";

export function favouritesReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FAVOURITES_ACTION_TYPE_ADDED: {
      const { entityName, id } = payload;
      const items = state[entityName] || [];

      const newState = { ...state, [entityName]: [...items, id] };
      storageSetter(newState);

      return newState;
    }
    case FAVOURITES_ACTION_TYPE_DELETED: {
      const { entityName, id } = payload;
      const { [entityName]: items, ...restState } = state;
      const filteredItems = items?.filter((f) => f !== id);

      const newState =
        filteredItems.length > 0
          ? { ...state, [entityName]: filteredItems }
          : restState;
      storageSetter(newState);

      return newState;
    }
    default:
      return state;
  }
}

const initialState =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_VAR_NAME)) || {};

function storageSetter(state) {
  return localStorage.setItem(LOCAL_STORAGE_VAR_NAME, JSON.stringify(state));
}
