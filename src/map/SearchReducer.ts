
import { PointOfInterest } from './../types/PointOfInterest';

export const SEARCH_POI = 'SEARCH_POI'
export const GET_POIS = 'GET_POIS'

const initialState = {
    searchResults: [],
    allPois: [],
    finishedFirstLoading: 0,
  };

  /**
   * Reducer
   */
  const searchStore = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_POI:
          return {
            ...state,
            searchResults: action.searchResults,
          }
        case GET_POIS:
          const loadings = state.finishedFirstLoading +1;
          return {
            ...state,
            allPois: action.pois,
            finishedFirstLoading: loadings,
          }
    }
    return state;
  }
  
  /**
 * Actions
 */
export const searchPOI = (query: string) => async (dispatch, getState) => {
    try {
      const response = await fetch(`http://localhost:8182/poi/search?query=${query}`, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
      });
      const searchResults: Array<PointOfInterest> = await response.json();
      dispatch({
        type: SEARCH_POI,
        searchResults,
      })
    } catch (error) {
        console.log("throwing Error", error);
        throw error;
    }
  };

  export const getAllPOIs = () => async (dispatch, getState) => {
    try {
      const response = await fetch(`http://localhost:8182/poi`);
      const body = await response.json();
      const pois = body;
      dispatch({
        type: GET_POIS,
        pois,
      })
    } catch (error) {
        console.log("throwing Error", error);
        throw error;
    }
  };

  /**
   * Store
   */
  export default searchStore;