import {
  favouritesReducer,
  FAVOURITES_ACTION_TYPE_DELETED,
  FAVOURITES_ACTION_TYPE_ADDED,
} from "./";

const ENTITY_ONE_ITEM_ONE = { entityName: "launches", id: "108" };
const ENTITY_ONE_ITEM_TWO = { entityName: "launches", id: "109" };
const ENTITY_TWO_ITEM_ONE = { entityName: "launchpads", id: "kwajalein_atoll" };

const STORE_INITIAL_STATE = {};
const STORE_WITH_ENTITY_ONE_ITEM_ONE = { launches: ["108"] };
const STORE_WITH_ENTITY_ONE_ITEM_ONE_TWO = { launches: ["108", "109"] };
const STORE_WITH_ENTITY_ONE_ITEM_ONE_AND_ENTITY_TWO_ITEM_ONE = {
  launches: ["108"],
  launchpads: ["kwajalein_atoll"],
};

describe("Favourites reducer", () => {
  it("Should return the initial state", () => {
    expect(favouritesReducer(STORE_INITIAL_STATE, {})).toEqual({});
  });

  it("Should handle FAVOURITES_ACTION_TYPE_ADDED", () => {
    expect(
      favouritesReducer(
        {},
        { type: FAVOURITES_ACTION_TYPE_ADDED, payload: ENTITY_ONE_ITEM_ONE }
      )
    ).toEqual(STORE_WITH_ENTITY_ONE_ITEM_ONE);

    expect(
      favouritesReducer(STORE_WITH_ENTITY_ONE_ITEM_ONE, {
        type: FAVOURITES_ACTION_TYPE_ADDED,
        payload: ENTITY_ONE_ITEM_TWO,
      })
    ).toEqual(STORE_WITH_ENTITY_ONE_ITEM_ONE_TWO);

    expect(
      favouritesReducer(STORE_WITH_ENTITY_ONE_ITEM_ONE, {
        type: FAVOURITES_ACTION_TYPE_ADDED,
        payload: ENTITY_TWO_ITEM_ONE,
      })
    ).toEqual(STORE_WITH_ENTITY_ONE_ITEM_ONE_AND_ENTITY_TWO_ITEM_ONE);
  });

  it("Should handle FAVOURITES_ACTION_TYPE_DELETED", () => {
    expect(
      favouritesReducer(STORE_WITH_ENTITY_ONE_ITEM_ONE, {
        type: FAVOURITES_ACTION_TYPE_DELETED,
        payload: ENTITY_ONE_ITEM_ONE,
      })
    ).toEqual(STORE_INITIAL_STATE);

    expect(
      favouritesReducer(
        STORE_WITH_ENTITY_ONE_ITEM_ONE_AND_ENTITY_TWO_ITEM_ONE,
        {
          type: FAVOURITES_ACTION_TYPE_DELETED,
          payload: ENTITY_TWO_ITEM_ONE,
        }
      )
    ).toEqual(STORE_WITH_ENTITY_ONE_ITEM_ONE);
  });
});
