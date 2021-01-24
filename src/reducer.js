import { combineReducers } from "redux";

import { favouritesReducer } from "./features/favourites/reducer";

const rootReducer = combineReducers({
  favourites: favouritesReducer,
});

export default rootReducer;
