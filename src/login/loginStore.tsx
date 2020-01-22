import { createStore } from "redux";

export const LOGIN = "LOGIN";

const initialState = {};

/**
 * Reducer
 */
const loginStore = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return state;
  }
  return state;
};

/**
 * Actions
 */
export const loginUser = (
  email: String,
  password: String
) => async (dispatch, getState) => {
  try {
    const body = JSON.stringify({
      email,
      password
    });
    const response = await fetch(`http://localhost:8182/authenticate`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body
    });
    const jwtToken = "test";
    console.log("Token: ", jwtToken);
    dispatch({
      type: LOGIN,
      jwtToken: jwtToken
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

/**
 * Store
 */
export default loginStore;
