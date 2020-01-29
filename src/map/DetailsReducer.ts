import { SearchResult } from "../types/SearchResult";
import { Search } from "history";
import { PointOfInterest } from "../types/PointOfInterest";

export const SET_DETAILS = "SET_DETAILS";
export const TOGGLE_DETAILVIEW = "TOGGLE_DETAILVIEW";

const initialState = {
  showDetails: false,
  detailPOI: {}
};
/**
 * Reducer
 */
const detailsStore = (state = initialState, action) => {
  switch (action.type) {
    case SET_DETAILS:
      state.showDetails = action.showDetails;
      state.detailPOI = action.detail;
      return state;
    case TOGGLE_DETAILVIEW:
      state.showDetails = action.showDetails;
      return state;
  }
  return state;
};

/**
 * Actions
 */
//poi: SearchResult,
export const getDetails = (
  showDetails: boolean,
  id: number
) => async dispatch => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/poi/${id}`);
    const body = await response.json();
    const detail = body;
    dispatch({
      type: SET_DETAILS,
      showDetails: showDetails,
      detail
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const closeDetailView = (showDetails: boolean) => async dispatch => {
  try {
    dispatch({
      type: TOGGLE_DETAILVIEW,
      closeDetails: showDetails
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export default detailsStore;
