

export const SELECT_LAYER = 'SELECT_LAYER'
export const SET_POI = 'SET_POI'
export const SET_ENTRY = 'SET_ENTRY'

const initialState = {
    poiChecked: true,
    entryChecked: false,
  };

  /**
   * Reducer
   */
  const switchLayerStore = (state = initialState, action) => {
    switch (action.type) {
        case SET_POI:
          return {
            ...state,
            poiChecked: action.checked
          }
        case SET_ENTRY:
          return {
            ...state,
            entryChecked: action.checked
          }
    }
    return state;
  }
  
  /**
 * Actions
 */
export const getSelectedLayerData = (checked: boolean) => async (dispatch, getState) => {
    try {
        // no backend yet
    //   const response = await fetch(`localhost:3000/api/register`);
    dispatch({
      type: SELECT_LAYER,
      checked: checked,
    })
    } catch (error) {
        console.log("throwing Error", error);
        throw error;
    }
  };

  export const setPoi = (checked: boolean) => async (dispatch, getState) => {
    try {
    dispatch({
      type: SET_POI,
      checked: checked,
    })
    } catch (error) {
        console.log("throwing Error", error);
        throw error;
    }
  };

  export const setEntry = (checked: boolean) => async (dispatch, getState) => {
    try {
    dispatch({
      type: SET_ENTRY,
      checked: checked,
    })
    } catch (error) {
        console.log("throwing Error", error);
        throw error;
    }
  };

  /**
   * Store
   */
  export default switchLayerStore;