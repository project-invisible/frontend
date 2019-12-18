import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import registerStore from './register/registerStore.tsx';
import switchLayerStore from './map/SwitchLayerReducer.ts';

const store = createStore(
  combineReducers({
    registerStore,
    switchLayerStore,
  }),
  applyMiddleware(thunk)
);

window.store = store;

export default store;
