import { PointOfInterest } from "./../types/PointOfInterest";

export const SEARCH_POI = "SEARCH_POI";
export const SEARCH_ENTRY = "SEARCH_ENTRY";
export const GET_POIS = "GET_POIS";
export const GET_ENTRIES = "GET_ENTRIES";
export const TOGGLE_SEARCH_LOADING = "TOGGLE_SEARCH_LOADING";

const initialState = {
  searchResults: [],
  searchEntryResults: [],
  allPois: [],
  allEntries: [],
  finishedEntryLoading: false,
  finishedFirstLoading: 0,
  finishedSearchLoading: false
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
        finishedSearchLoading: true
      };
    case SEARCH_ENTRY:
      return {
        ...state,
        searchEntryResults: action.searchResults,
        finishedSearchLoading: true
      };
    case GET_POIS:
      const loadings = state.finishedFirstLoading + 1;
      return {
        ...state,
        allPois: action.pois,
        finishedFirstLoading: loadings
      };
    case GET_ENTRIES:
      return {
        ...state,
        finishedEntryLoading: true,
        allEntries: action.entries
      };
    case TOGGLE_SEARCH_LOADING:
      return {
        ...state,
        finishedSearchLoading: action.toggleLoading
      };
  }
  return state;
};

/**
 * Actions
 */
export const searchPOI = (query: string) => async (dispatch, getState) => {
  try {
    const response = await fetch(
      `http://localhost:8182/poi/search?query=${query}`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" }
      }
    );
    const searchResults: Array<PointOfInterest> = await response.json();
    dispatch({
      type: SEARCH_POI,
      searchResults
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const searchEntries = (query: string) => async (dispatch, getState) => {
  try {
    const response = await fetch(
      `http://localhost:8182/entry/search?query=${query}`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" }
      }
    );
    const searchEntriesResults: Array<PointOfInterest> = await response.json();
    dispatch({
      type: SEARCH_POI,
      searchEntriesResults
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const toggleSearchLoading = (toggleLoading: boolean) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: TOGGLE_SEARCH_LOADING,
      toggleLoading
    });
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
      pois
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const getAllEntries = () => async (dispatch, getState) => {
  try {
    const response = await fetch(`http://localhost:8182/entry`);
    const body = await response.json();
    const entries = body;
    dispatch({
      type: GET_ENTRIES,
      entries
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

/**
 * Store
 */
export default searchStore;
