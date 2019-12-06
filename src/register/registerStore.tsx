
import { createStore } from 'redux';

export const REGISTER = 'REGISTER'

const initialState = {
  };

  /**
   * Reducer
   */
  const registerStore = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER:
        return state;
    }
    return state;
  }
  
  /**
 * Actions
 */
export const postRegistration = (username: String, password: String) => async (dispatch, getState) => {
    try {
        // no backend yet
    //   const response = await fetch(`localhost:3000/api/register`);
       const jwtToken = "test";
        console.log("Token: ", jwtToken);
        return {
            type: REGISTER,
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
  export default registerStore;