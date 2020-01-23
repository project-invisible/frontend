import { CultureEntry } from "./../types/CultureEntry";
import { Role, Status } from "../types/User";
export const SET_ENTRY_DETAILS = "SET_ENTRY_DETAILS";
export const TOGGLE_ENTRY_DETAILVIEW = "TOGGLE_ENTRY_DETAILVIEW";
export const TOGGLE_ENTRY_MODAL = "TOGGLE_ENTRY_MODAL";
export const ADD_ENTRY = "ADD_ENTRY";

const initialState = {
  showEntryDetails: false,
  detailEntry: {},
  toggleEntryModal: false,
  entryAdded: false
};
/**
 * Reducer
 */
const entryDetailsStore = (state = initialState, action) => {
  switch (action.type) {
    case SET_ENTRY_DETAILS:
      state.showEntryDetails = action.showDetails;
      state.detailEntry = action.entry;
      return state;
    case TOGGLE_ENTRY_DETAILVIEW:
      state.showEntryDetails = action.showDetails;
      return state;
    case TOGGLE_ENTRY_MODAL:
      state.toggleEntryModal = action.showModal;
      return state;
    case ADD_ENTRY:
      state.entryAdded = true;
      state.toggleEntryModal = false;
      return state;
  }
  return state;
};

/**
 * Actions
 */
export const getEntryDetails = (
  showDetails: boolean,
  id: number
) => async dispatch => {
  try {
    const response = await fetch(`http://localhost:8182/entry/${id}`);
    const body = await response.json();
    const entry = body;
    dispatch({
      type: SET_ENTRY_DETAILS,
      showDetails,
      entry
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const toggleEntryDetailView = (
  showDetails: boolean
) => async dispatch => {
  try {
    dispatch({
      type: TOGGLE_ENTRY_DETAILVIEW,
      showDetails
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const toggleEntryModal = (showModal: boolean) => async dispatch => {
  try {
    dispatch({
      type: TOGGLE_ENTRY_MODAL,
      showModal
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export const addCultureEntry = (
  name: string,
  description: string,
  xCoord: number,
  yCoord: number,
  image: ArrayBuffer,
  userId: number
) => async (dispatch, getState) => {
  const cultureEntry: CultureEntry = {
    id: null,
    creationDate: null,
    name,
    description,
    coords: {
      x: xCoord,
      y: yCoord
    },
    user: {
      id: userId,
      email: "",
      username: "",
      anonymous: false,
      creationDate: null,
      password: "",
      contact: null,
      role: Role.USER,
      status: Status.ACTIVE
    }
  };
  const data = new FormData();
  var blob = new Blob([JSON.stringify(cultureEntry, null, 2)], {type : 'application/json'});
  data.append("cultureEntry", blob);
  data.append("cultureImage", new Blob([image]));
  try {
    const response = await fetch(`http://localhost:8182/entry`, {
      method: "post",
      body: data
    });
    const result = await response.json();
    console.log(result);
    dispatch({
      type: ADD_ENTRY
    });
  } catch (error) {
    console.log("throwing Error", error);
    throw error;
  }
};

export default entryDetailsStore;
