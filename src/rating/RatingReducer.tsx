
import { PointOfInterest } from './../types/PointOfInterest';

export const ADD_RATING = 'ADD_RATING'

const initialState = {
    rating: [],
  };

  /**
   * Reducer
   */
  const ratingStore = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RATING:
          return {
            ...state,
          }
    }
    return state;
  }
  
  /**
 * Actions
 */
//   export const getAllPOIs = () => async (dispatch, getState) => {
//     try {
//       const response = await fetch(`http://localhost:8182/poi`);
//       const body = await response.json();
//       const pois = body;
//       dispatch({
//         type: GET_POIS,
//         pois,
//       })
//     } catch (error) {
//         console.log("throwing Error", error);
//         throw error;
//     }
//   };

  /**
   * Store
   */
  export default ratingStore;