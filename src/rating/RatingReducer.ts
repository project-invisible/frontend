import { Rating } from "../types/Rating";

export const ADD_RATING = "ADD_RATING";
export const TOGGLE_MODAL = "OPEN_MODAL";
export const GET_RATINGS_POI = "GET_RATINGS_POI";
export const GET_QUESTIONS = "GET_QUESTIONS";

const initialState = {
  rating: [],
  modalOpen: false,
  ratingsForPoi: [],
  questions: [],
  categories: [],
  subCategories: []
};

/**
 * Reducer
 */
const ratingStore = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RATING:
      return {
        ...state
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: action.toggleModal
      };
    case GET_RATINGS_POI:
      return {
        ...state,
        ratingsForPoi: action.result
      };
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.result.questions,
        categories: action.result.categories,
        subCategories: action.result.subCategories
      }
  }
  return state;
};

/**
 * Actions
 */
export const addRating = (rating: Rating) => async (dispatch, getState) => {
  const body = JSON.stringify(rating);
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/rating`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body
    });
    const result = await response.json();
    dispatch({
      type: ADD_RATING
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const getQuestions = () => async (
  dispatch,
  getState
) => {
  try {
    const response = await fetch(
      `http://localhost:8182/criteria`
    );
    const result = await response.json();
    dispatch({
      type: GET_QUESTIONS,
      result
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const getRatingsForPoi = (poiId: number) => async (
  dispatch,
  getState
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/rating/newest/${poiId}`
    );
    const result = await response.json();
    dispatch({
      type: GET_RATINGS_POI,
      result
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const openModal = (toggleModal: boolean) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: TOGGLE_MODAL,
      toggleModal
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

/**
 * Store
 */
export default ratingStore;
