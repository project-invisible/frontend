import { Role } from "../types/User";

export const REGISTER = "REGISTER";
export const REGISTER_ERROR = "REGISTER_ERROR";

const initialState = {
  authenticated: false,
  email: "",
  userGroup: Role,
  token: "",
  error: ""
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
      return state;
    case REGISTER_ERROR:
      state.error = "Error: User already registered!";
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
      "http://localhost:8182/authenticate/register",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body
      }
    );
    const result = await response.json();
    console.log(result);
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

/**
 * Store
 */
export default registerStore;
