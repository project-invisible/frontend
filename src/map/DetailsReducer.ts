import { SearchResult } from "../types/SearchResult";
import { Search } from "history";

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
export const getDetails = ( showDetails: boolean, id:number) => async dispatch => {
  try {
    const response = await fetch(`http://localhost:8181/poi/{id}`,{
      method:'get',
      headers:{'Content-Type':'application/json'},
    });
    const detail:number = await response.json();
    dispatch({
      type: SET_DETAILS,
      poiID:id,
      showDetails: showDetails,
      detail
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
