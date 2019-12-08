
import { createStore } from 'redux';

export const LOGIN = 'LOGIN'

const initialState = {
  };

  /**
   * Reducer
   */
  const loginStore = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        return state;
    }
    return state;
  }
  
  /**
 * Actions
 */
export const loginUser = (username: String, password: String) => async (dispatch, getState) => {
    try {
        // no backend yet
    //   const response = await fetch(`localhost:3000/api/register`);
       const jwtToken = "test";
        console.log("Token: ", jwtToken);
        return {
            type: LOGIN,
            jwtToken: jwtToken,
        }
    } catch (error) {
        console.log("throwing Error", error);
        throw error;
    }
  };

  /**
   * Store
   */
  export default loginStore;