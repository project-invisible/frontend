import { SearchResult } from "../types/SearchResult";
import { Search } from "history";
import { PointOfInterest } from "../types/PointOfInterest";
import { Feedback } from './../types/Reports';

export const GET_USER = "GET_USER";
export const SEND_FEEDBACK = "SEND_FEEDBACK";

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
    case SEND_FEEDBACK: 
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
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`);
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

export const sendFeedback = (feedback: Feedback) => async dispatch => {
  try {
    const body = JSON.stringify(feedback);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/feedback`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body
      }
    );
    const result = await response.json();
    dispatch({
      type: SEND_FEEDBACK
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export default userStore;
