import { Role } from "../types/User";

export const REGISTER = "REGISTER";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const LOGIN = "LOGIN";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const GET_USER = "GET_USER";

const initialState = {
  authenticated: false,
  email: "",
  userGroup: Role,
  token: "",
  error: "",
  id: null,
  user: null,
};

/**
 * Reducer
 */
const registerStore = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      state.authenticated = true;
      state.email = action.result.email;
      state.userGroup = action.result.group;
      state.token = action.result.token;
      state.error = "";
      state.id = action.result.id;
      return state;
    case LOGIN:
      state.authenticated = true;
      state.email = action.result.email;
      state.userGroup = action.result.group;
      state.token = action.result.token;
      state.error = "";
      state.id = action.result.id;
      return state;
    case REGISTER_ERROR:
      state.error = "Error: User already registered!";
      return state;
    case LOGIN_ERROR:
      state.error = "Error: Wrong username or password!";
      return state;
    case GET_USER:
      state.user = action.result;
      return state;
  }
  return state;
};

/**
 * Actions
 */
export const postRegistration = (
  email: String,
  username: String,
  password: String
) => async (dispatch, getState) => {
  const body: BodyInit = JSON.stringify({
    email,
    password,
    username
  });
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_AUTH_URL}/authenticate/register`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body
      }
    );
    const result = await response.json();
    if (result.exists === true) {
      dispatch({
        type: REGISTER,
        result
      });
    } else {
      dispatch({
        type: REGISTER_ERROR
      });
    }
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const loginUser = (email: String, password: String) => async (
  dispatch,
  getState
) => {
  try {
    const body = JSON.stringify({
      email,
      password
    });
    const response = await fetch(`${process.env.REACT_APP_BACKEND_AUTH_URL}/authenticate`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body
    });
    const result = await response.json();
    if (result.exists === true) {
      dispatch({
        type: LOGIN,
        result
      });
    } else {
      dispatch({
        type: LOGIN_ERROR
      });
    }
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const getUser = (userId: number) => async (dispatch, getState) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}`);
    const result = await response.json();
    dispatch({
      type: GET_USER,
      result
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

/**
 * Store
 */
export default registerStore;
