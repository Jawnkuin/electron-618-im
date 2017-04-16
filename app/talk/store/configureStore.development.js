import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger'; // eslint-disable-line import/no-extraneous-dependencies
import {
  forwardToMain,
  replayActionRenderer
} from 'electron-redux';

import rootReducer from '../reducers';
import * as counterActions from '../actions';


const logger = createLogger({
  level: 'info',
  collapsed: true
});


// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://extension.remotedev.io/docs/API/Arguments.html
    ...counterActions
  }) :
  compose;
/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  applyMiddleware(forwardToMain, promiseMiddleware, thunk, logger)
);

export default function configureStore (initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  replayActionRenderer(store);
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').rootReducer) // eslint-disable-line global-require
    );
  }

  return store;
}
