import { RatingReport } from "../types/Reports";

export const GET_REPORTED_USERS = "GET_REPORTED_USERS";
export const GET_REPORTED_RATINGS = "GET_REPORTED_RATINGS";
export const POST_RATING_REPORT = "POST_RATING_REPORT";
export const GET_FEEDBACK = "GET_FEEDBACK";

const initialState = {
  reportedUsers: [],
  reportedRatings: [],
  feedback: []
};
/**
 * Reducer
 */
const adminStore = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPORTED_USERS:
      return {
        ...state,
        reportedUsers: action.body
      };
    case GET_REPORTED_RATINGS:
      return {
        ...state,
        reportedRatings: action.body
      };
    case GET_FEEDBACK:
      return {
        ...state,
        feedback: action.body
      };
    case POST_RATING_REPORT:
      return {
        ...state
      }
  }
  return state;
};

/**
 * Actions
 */
export const getReportedUsers = () => async dispatch => {
  try {
    const response = await fetch(`http://localhost:8182/userReport`);
    const body = await response.json();
    dispatch({
      type: GET_REPORTED_USERS,
      body
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const getReportedRatings = () => async dispatch => {
  try {
    const response = await fetch(`http://localhost:8182/ratingReport`);
    const body = await response.json();
    dispatch({
      type: GET_REPORTED_RATINGS,
      body
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const postRatingReport = (ratingReport: RatingReport) => async dispatch => {
  try {
    const body = JSON.stringify(ratingReport);
    const response = await fetch(
      `http://localhost:8182/poi/rating`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body
      }
    );
    const result = await response.json();
    dispatch({
      type: POST_RATING_REPORT
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const getFeedback = () => async dispatch => {
  try {
    const response = await fetch(`http://localhost:8182/feedback`);
    const body = await response.json();
    dispatch({
      type: GET_FEEDBACK,
      body
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export default adminStore;
