
import { PointOfInterest } from './../types/PointOfInterest';

export const SEARCH_POI = 'SEARCH_POI'
export const GET_POIS = 'GET_POIS'
export const TOGGLE_SEARCH_LOADING = 'TOGGLE_SEARCH_LOADING'
export const RESET_SEARCH = 'RESET_SEARCH'
export const TOGGLE_RESET = 'TOGGLE_RESET'

const initialState = {
    searchResults: [],
    allPois: [],
    finishedFirstLoading: 0,
    finishedSearchLoading: false,
    resetSearch: false,
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
            finishedSearchLoading: true,
          }
        case GET_POIS:
          const loadings = state.finishedFirstLoading +1;
          return {
            ...state,
            allPois: action.pois,
            finishedFirstLoading: loadings,
          }
        case RESET_SEARCH:
          return {
            ...state,
            searchResults: [],
            finishedSearchLoading: false,
            resetSearch: true,
          }
        case TOGGLE_SEARCH_LOADING:
          return {
            ...state,
            finishedSearchLoading: action.toggleLoading,
          }
        case TOGGLE_RESET: 
          return {
            ...state,
            resetSearch: action.toggleReset,
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

  export const toggleSearchLoading = (toggleLoading: boolean ) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TOGGLE_SEARCH_LOADING,
        toggleLoading,
      })
    } catch (error) {
        console.log("throwing Error", error);
        throw error;
    }
  };

  export const toggleResetSearch = (toggleReset: boolean ) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TOGGLE_RESET,
        toggleReset,
      })
    } catch (error) {
        console.log("throwing Error", error);
        throw error;
    }
  };

  export const resetSearch = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: RESET_SEARCH,
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