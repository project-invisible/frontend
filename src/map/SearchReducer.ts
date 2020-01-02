
import { PointOfInterest } from './../types/PointOfInterest';

export const SEARCH_POI = 'SEARCH_POI'
export const GET_POIS = 'GET_POIS'

const initialState = {
    searchResults: [],
    allPois: [],
  };

  /**
   * Reducer
   */
  const searchStore = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_POI:
          return {
            ...state,
            searchResults: action.searchResults
          }
        case GET_POIS:
          return {
            ...state,
            allPois: action.pois
          }
    }
    return state;
  }
  
  /**
 * Actions
 */
export const searchPOI = (query: string) => async (dispatch, getState) => {
    const body: BodyInit = JSON.stringify({
      query
    });
    try {
      const response = await fetch(`http://localhost:8182/poi/search`, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body,
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