import { SearchResult } from "../types/SearchResult";
import { Search } from "history";
import { PointOfInterest } from "../types/PointOfInterest";

export const GET_USER = "GET_USER";

const initialState = {
  fetchedUser: {},
};
/**
 * Reducer
 */
const userStore = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      state.fetchedUser = action.user;
      return state;
  }
  return state;
};

/**
 * Actions
 */
//poi: SearchResult,
export const getCurrentUser = (
  id: number
) => async dispatch => {
  try {
    const response = await fetch(`http://localhost:8182/user/${id}`);
    const body = await response.json();
    const user = body;
    dispatch({
      type: GET_USER,
      user
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export default userStore;
