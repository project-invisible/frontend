import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import registerStore from './register/registerStore';
import switchLayerStore from './map/SwitchLayerReducer';
import detailsStore from './map/DetailsReducer';
import searchStore from './map/SearchReducer';
import ratingStore from './rating/RatingReducer';
import entryDetailsStore from './entries/EntryDetailsReducer';
import userStore from './user/UserReducer';
import adminStore from './admin/AdminReducer';

const store = createStore(
  combineReducers({
    registerStore,
    switchLayerStore,
    detailsStore,
    searchStore,
    ratingStore,
    entryDetailsStore,
    userStore,
    adminStore
  }),
  applyMiddleware(thunk)
);

window.store = store;

export default store;
