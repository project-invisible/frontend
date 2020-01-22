import { SearchResult } from "../types/SearchResult";
import { Search } from "history";
import { PointOfInterest } from "../types/PointOfInterest";

export const SET_ENTRY_DETAILS = "SET_ENTRY_DETAILS";
export const TOGGLE_ENTRY_DETAILVIEW = "TOGGLE_ENTRY_DETAILVIEW";

const initialState = {
  showEntryDetails: false,
  detailEntry: {}
};
/**
 * Reducer
 */
const entryDetailsStore = (state = initialState, action) => {
  switch (action.type) {
    case SET_ENTRY_DETAILS:
      state.showEntryDetails = action.showDetails;
      state.detailEntry = action.entry;
      return state;
    case TOGGLE_ENTRY_DETAILVIEW:
      state.showEntryDetails = action.showDetails;
      return state;
  }
  return state;
};

/**
 * Actions
 */
export const getEntryDetails = (
  showDetails: boolean,
  id: number
) => async dispatch => {
  try {
    const response = await fetch(`http://localhost:8182/entry/${id}`);
    const body = await response.json();
    const entry = body;
    dispatch({
      type: SET_ENTRY_DETAILS,
      showDetails,
      entry
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const toggleEntryDetailView = (showDetails: boolean) => async dispatch => {
  try {
    dispatch({
      type: TOGGLE_ENTRY_DETAILVIEW,
      showDetails,
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export default entryDetailsStore;
