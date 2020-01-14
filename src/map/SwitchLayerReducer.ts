
import { createStore } from 'redux';
import { LatLngExpression } from 'leaflet'


export const SELECT_LAYER = 'SELECT_LAYER'

const initialState = {
    mapMarker: [],
  };

  const dummyData: Array<LatLngExpression> = [
      {
        lat: 51.505,
        lng: -0.07,
      },
      {
        lat: 51.505,
        lng: -0.08,
      },
      {
        lat: 51.505,
        lng: -0.04,
      },
      {
        lat: 51.505,
        lng: -0.02,
      },
  ]

  /**
   * Reducer
   */
  const switchLayerStore = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_LAYER:
          if (action.checked)
          state.mapMarker = dummyData;
          else state.mapMarker = [];
        return state;
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

  /**
   * Store
   */
  export default switchLayerStore;