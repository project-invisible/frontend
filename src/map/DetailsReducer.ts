import { SearchResult } from "../types/SearchResult";

export const SET_DETAILS = "SET_DETAILS";
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
    //   getDetails()
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

// export const closeDetailView = (showDetails: boolean) => async dispatch => {
//   try {
//     dispatch({
//       showDetails: showDetails
//     });
//   } catch (error) {
//     console.log("throwing Error", error);
//     throw error;
//   }
// };

export default detailsStore;
