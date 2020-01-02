import { SearchResult } from "../types/SearchResult";

export const SET_DETAILS = "SET_DETAILS";
const initialState = {
  showDetails: false,
  closeDetails:false,
  detailPOI: {}
};
/**
 * Reducer
 */
const detailsStore = (state = initialState, action) => {
  switch (action.type) {
    case SET_DETAILS:
      state.closeDetails = action.closeDetails;
      state.showDetails = action.showDetails;
      state.detailPOI = action.detailPOI;
      return state;
  }
  return state;
};

/**
 * Actions
 */
//poi: SearchResult,
export const getDetails = ( showDetails: boolean) => async dispatch => {
  try {
    // no backend yet
    //   getDetails(id){ const poi = fetch("localhost:8080/id/poi")}
    dispatch({
      type: SET_DETAILS,
      // poi: poi,
      showDetails: showDetails
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const closeDetailView = (closeDetails: boolean) => async dispatch => {
  try {
    dispatch({
      type: SET_DETAILS,
      closeDetails: closeDetails
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export default detailsStore;
