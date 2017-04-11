// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import {
  forwardToMain,
  replayActionRenderer
} from 'electron-redux';
import rootReducer from '../reducers';

const enhancer = applyMiddleware(forwardToMain, promiseMiddleware, thunk);

export default (initialState) => {
  const store = createStore(rootReducer, initialState, enhancer); // eslint-disable-line
  replayActionRenderer(store);
  return store;
};
