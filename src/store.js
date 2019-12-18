import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import registerStore from './register/registerStore.ts';

const store = createStore(
  combineReducers({
    registerStore
  }),
  applyMiddleware(thunk)
);

window.store = store;

export default store;
