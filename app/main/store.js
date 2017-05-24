import {
  forwardToRenderer
} from 'electron-window-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { wrapActions } from './actions';

// 保证单例的mainStore
const store = createStore(rootReducer, applyMiddleware(
  forwardToRenderer
));

// bind dispatch with actionCreators
wrapActions(store);

export default store;
