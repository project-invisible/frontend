import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import registerStore from './register/registerStore.tsx';
import switchLayerStore from './map/SwitchLayerReducer.ts';
import detailsStore from './map/DetailsReducer.ts';

const store = createStore(
  combineReducers({
    registerStore,
    switchLayerStore,
    detailsStore,
  }),
  applyMiddleware(thunk)
);

window.store = store;

export default store;
