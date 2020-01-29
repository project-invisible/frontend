import { PointOfInterest } from "./../types/PointOfInterest";
import { CultureEntry } from "./../types/CultureEntry";

export const SEARCH_POI = "SEARCH_POI";
export const SEARCH_ENTRY = "SEARCH_ENTRY";
export const GET_POIS = "GET_POIS";
export const GET_ENTRIES = "GET_ENTRIES";
export const TOGGLE_SEARCH_LOADING = "TOGGLE_SEARCH_LOADING";
export const TOGGLE_ENTRY_SEARCH_LOADING = "TOGGLE_ENTRY_SEARCH_LOADING";
export const TOGGLE_RESET = "TOGGLE_RESET";
export const RESET_SEARCH = "RESET_SEARCH";

const initialState = {
  resetSearch: false,
  searchResults: [],
  searchEntryResults: [],
  allPois: [],
  allEntries: [],
  finishedEntryLoading: false,
  finishedFirstLoading: 0,
  finishedSearchLoading: false,
  finishedEntrySearchLoading: false
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
        searchEntryResults: action.searchEntriesResults,
        finishedEntrySearchLoading: true
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
    case TOGGLE_RESET:
      return {
        ...state,
        resetSearch: action.toggleReset
      };
    case RESET_SEARCH:
      return {
        ...state,
        searchResults: [],
        searchEntryResults: [],
        finishedEntrySearchLoading: false,
        finishedSearchLoading: false,
        resetSearch: true
      };
    case TOGGLE_ENTRY_SEARCH_LOADING: 
      return {
        ...state,
        finishedEntrySearchLoading: action.toggleLoading
      }
  }
  return state;
};

/**
 * Actions
 */
export const searchPOI = (query: string) => async (dispatch, getState) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/poi/search?query=${query}`,
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
      `${process.env.REACT_APP_BACKEND_URL}/entry/search?query=${query}`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" }
      }
    );
    const searchEntriesResults: Array<CultureEntry> = await response.json();
    dispatch({
      type: SEARCH_ENTRY,
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

export const toggleEntrySearchLoading = (toggleLoading: boolean) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: TOGGLE_ENTRY_SEARCH_LOADING,
      toggleLoading
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const toggleResetSearch = (toggleReset: boolean) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: TOGGLE_RESET,
      toggleReset
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const resetSearch = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESET_SEARCH
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const getAllPOIs = () => async (dispatch, getState) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/poi`);
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
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/entry`);
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
