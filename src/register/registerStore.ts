
import { createStore } from 'redux';

export const REGISTER = 'REGISTER'

const initialState = {
  authenticated: false,
  jwt: '',
};

  /**
   * Reducer
   */
  const registerStore = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER:
        state.authenticated = true;
        state.jwt = action.jwt;
        return state;
    }
    return state;
  }
  
  /**
 * Actions
 */
export const postRegistration = (email: String, username: String, password: String) => async (dispatch, getState) => {
    const body: BodyInit = JSON.stringify({
        email,
        password,
        username
    });
    try {
        const response = await fetch('http://localhost:8182/authenticate/register', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body
         });
        console.log(response);
        const jwt = "test";
        return {
            type: REGISTER,
            jwt,
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